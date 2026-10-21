import test from 'node:test';
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { once } from 'node:events';
import { setTimeout as delay } from 'node:timers/promises';

test('PostgreSQL-backed account, shared world, economy, and admin flows', { skip: !process.env.TEST_DATABASE_URL }, async t => {
  const port = 43100 + Math.floor(Math.random() * 1000);
  const adminEmail = process.env.TEST_ADMIN_EMAIL || `test-admin-${Date.now()}@example.test`;
  const adminPassword = process.env.TEST_ADMIN_PASSWORD || `Integration-${cryptoRandom()}-Password`;
  const child = spawn(process.execPath, ['server.js'], { env: { ...process.env, DATABASE_URL: process.env.TEST_DATABASE_URL, ADMIN_EMAIL: adminEmail, ADMIN_PASSWORD: adminPassword, ADMIN_NAME: `TestAdmin${Date.now()}`, PORT: String(port) }, stdio: 'ignore' });
  t.after(() => child.kill());
  const base = `http://127.0.0.1:${port}`;
  let ready = false;
  for (let i = 0; i < 60; i++) {
    if (child.exitCode !== null) throw new Error(`Test server exited with ${child.exitCode}`);
    try { const health = await fetch(`${base}/api/health`); if (health.ok) { ready = true; break; } } catch {}
    await delay(500);
  }
  assert.ok(ready, 'PostgreSQL test server should become healthy');

  async function call(path, { method = 'GET', body, cookie } = {}) {
    const response = await fetch(`${base}${path}`, { method, headers: { ...(body ? { 'content-type': 'application/json', origin: base } : {}), ...(cookie ? { cookie } : {}) }, body: body ? JSON.stringify(body) : undefined });
    const payload = await response.json();
    return { response, payload, cookie: response.headers.get('set-cookie')?.split(';')[0] || cookie };
  }
  async function register(suffix) {
    const result = await call('/api/register', { method: 'POST', body: { email: `miner-${suffix}-${Date.now()}@example.test`, name: `Banyasz${suffix}${Date.now()}`, password: `Mine-${suffix}-secure-password` } });
    assert.equal(result.response.status, 201, JSON.stringify(result.payload));
    return result.cookie;
  }

  let playerOne = await register('one');
  const playerTwo = await register('two');
  let one = await call('/api/dashboard', { cookie: playerOne });
  let two = await call('/api/dashboard', { cookie: playerTwo });
  const emailOne=one.payload.profile.email;
  assert.equal(one.payload.rocks.length, 30);
  assert.equal(one.payload.tools.length, 30);
  assert.equal(one.payload.rocks[0].currentHealth, two.payload.rocks[0].currentHealth, 'accounts see the same rock HP');

  const before = two.payload.rocks[0].currentHealth;
  await delay(400);
  const hit = await call('/api/mine', { method: 'POST', body: { rock: 'coal' }, cookie: playerOne });
  assert.equal(hit.response.status, 200);
  assert.ok(hit.payload.damage > 0);
  const fast = await call('/api/mine', { method: 'POST', body: { rock: 'coal' }, cookie: playerOne });
  assert.equal(fast.response.status, 429, 'rapid repeated mining is throttled');
  await delay(400);
  two = await call('/api/dashboard', { cookie: playerTwo });
  assert.notEqual(two.payload.rocks[0].currentHealth, before, 'a hit updates shared world state');
  let broke = hit.payload.broke;
  for(let i=0;i<30&&!broke;i++){await delay(400);const nextHit=await call('/api/mine',{method:'POST',body:{rock:'coal'},cookie:playerOne});assert.equal(nextHit.response.status,200);broke=nextHit.payload.broke;}
  assert.ok(broke,'the rock eventually breaks');
  one=await call('/api/dashboard',{cookie:playerOne});
  assert.ok(one.payload.inventory.find(x=>x.oreType==='coal').quantity>0,'broken rock awards ore to the miner');
  const sale=await call('/api/sell',{method:'POST',body:{ore:'coal',quantity:1},cookie:playerOne});
  assert.equal(sale.response.status,200);
  one=await call('/api/dashboard',{cookie:playerOne});
  assert.ok(one.payload.transactions.some(x=>x.type==='ore_sale'));

  const request = await call('/api/requests', { method: 'POST', body: { kind: 'deposit', amount: 500, details: 'Tesztkérés' }, cookie: playerOne });
  assert.equal(request.response.status, 201);
  assert.match(request.payload.message, /Virtuális/);

  const adminLogin = await call('/api/login', { method: 'POST', body: { email: adminEmail, password: adminPassword } });
  assert.equal(adminLogin.response.status, 200, 'initial admin can sign in');
  const overview = await call('/api/admin/overview', { cookie: adminLogin.cookie });
  assert.equal(overview.response.status, 200);
  assert.ok(overview.payload.players.some(x=>x.email===emailOne));
  const filtered=await call('/api/admin/overview?search='+encodeURIComponent(emailOne),{cookie:adminLogin.cookie});
  assert.equal(filtered.payload.players.length,1,'admin can find a player by email');
  const denied = await call('/api/admin/overview', { cookie: playerOne });
  assert.equal(denied.response.status, 403, 'regular players cannot access admin endpoints');
  const balanceBefore=Number(one.payload.profile.balanceHuf);
  const adjustment=await call(`/api/admin/players/${one.payload.profile.id}/balance`,{method:'POST',body:{amount:125,reason:'Integrációs ellenőrzés'},cookie:adminLogin.cookie});
  assert.equal(adjustment.response.status,200);
  one=await call('/api/dashboard',{cookie:playerOne});
  assert.equal(Number(one.payload.profile.balanceHuf),balanceBefore+125);
  const badPrice=await call('/api/admin/prices',{method:'POST',body:{ore:'coal',price:101},cookie:adminLogin.cookie});
  assert.equal(badPrice.response.status,400,'admin prices are validated to the requested range');
  const reviewTarget=overview.payload.requests.find(x=>x.id===request.payload.id);
  assert.ok(reviewTarget,'admin can see submitted financial requests');
  const reviewed=await call(`/api/admin/requests/${request.payload.id}`,{method:'POST',body:{status:'approved',note:'Kérelem áttekintve; banki utalás nem történik.'},cookie:adminLogin.cookie});
  assert.equal(reviewed.response.status,200);
  const duplicateReview=await call(`/api/admin/requests/${request.payload.id}`,{method:'POST',body:{status:'approved',note:'Ismétlés'},cookie:adminLogin.cookie});
  assert.equal(duplicateReview.response.status,409,'a request cannot be reviewed twice');
  const changedPassword=await call('/api/password',{method:'POST',body:{oldPassword:'Mine-one-secure-password',newPassword:'Mine-one-new-secure-password'},cookie:playerOne});
  assert.equal(changedPassword.response.status,200);
  playerOne=changedPassword.cookie;
  const otherSession=await call('/api/dashboard',{cookie:playerTwo});
  assert.equal(otherSession.response.status,200,'a separate player session remains active');
  const oldPasswordLogin=await call('/api/login',{method:'POST',body:{email:emailOne,password:'Mine-one-secure-password'}});
  assert.equal(oldPasswordLogin.response.status,401);
  const newPasswordLogin=await call('/api/login',{method:'POST',body:{email:emailOne,password:'Mine-one-new-secure-password'}});
  assert.equal(newPasswordLogin.response.status,200);
  await call('/api/admin/maintenance', { method: 'POST', body: { enabled: true }, cookie: adminLogin.cookie });
  const blocked = await call('/api/dashboard', { cookie: playerOne });
  assert.equal(blocked.response.status, 503, 'maintenance blocks authenticated gameplay APIs');
  assert.equal((await call('/api/leaderboard')).response.status,503);
  const adminStillWorks = await call('/api/admin/overview', { cookie: adminLogin.cookie });
  assert.equal(adminStillWorks.response.status, 200);
  const maintenancePage=await fetch(`${base}/`);
  assert.equal(maintenancePage.status,503);
  assert.match(await maintenancePage.text(),/A Croptott Bányász Birodalom karbantartás alatt áll/);
  await call('/api/admin/maintenance', { method: 'POST', body: { enabled: false }, cookie: adminLogin.cookie });
});

function cryptoRandom() { return Math.random().toString(36).slice(2); }
