# Croptott Bányász Birodalom

Magyar nyelvű, PostgreSQL-es webes bányászjáték. A statikus felületet és az API-t ugyanaz a Node.js webszolgáltatás adja ki; a GitHub Pages kiadás nem használható, mert nem tudja futtatni az API-t.

## Helyi indítás

Szükséges: Node.js 20+ és PostgreSQL.

1. `npm ci`
2. Állítsd be a `DATABASE_URL` környezeti változót (PostgreSQL connection string).
3. Opcionális első adminfiókhoz indulás előtt állítsd be az `ADMIN_EMAIL`, `ADMIN_PASSWORD` és `ADMIN_NAME` változókat. Az admin automatikusan csak akkor jön létre, ha az email még nem létezik. Az adminjelszó legalább 10 karakteres legyen, és a változók ne kerüljenek verziókezelésbe.
4. `npm start`
5. Nyisd meg a `http://localhost:3000` címet.

A táblákat és az alap beállításokat az alkalmazás induláskor hozza létre. Memóriás vagy fájlalapú adattároló nincs; adatbázis nélkül az alkalmazás biztonságosan leáll.

## Játékmenet és admin

A 30 kőzet HP-ja közös PostgreSQL-világállapotban van. A játékos készlete, csákányai, gépei, tranzakciói és profilja külön rekordokban tárolódik. A bányagépek időalapon termelnek, legfeljebb 8 óra távollétre halmozva; a termelést a következő bejelentkezett API-hívás írja jóvá. A csákányok legfeljebb 10, a gépek legfeljebb 20 szintig fejleszthetők. A beépített admin kezeli a játékoskeresést, tiltást, egyenlegkorrekciót, ércárakat, kérelmeket és karbantartási módot.

Kezdeti adminfiók az `ADMIN_EMAIL` és `ADMIN_PASSWORD` változóval jön létre, ha az email még nincs regisztrálva. Ezt a változót csak az első induláskor használd, és utána töröld vagy cseréld meg a jelszót a Profil oldalon. Az alkalmazás nem végez banki tranzakciót.

## Ellenőrzés

- `npm run check` ellenőrzi a Node.js szerver, böngészőkliens és service worker szintaxisát.
- `npm test` PostgreSQL integrációs próbát indít, ha meg van adva a `TEST_DATABASE_URL`. Kizárólag eldobható tesztadatbázist használj: az induló séma migrációkat és próba-fiókokat hoz létre. Opcionálisan `TEST_ADMIN_EMAIL` és `TEST_ADMIN_PASSWORD` adható meg adminfolyamok ellenőrzéséhez.
- `npm ci` telepíti a zárolt függőségeket.

## Render telepítés

A repó `render.yaml` Blueprintként használható: Renderben válaszd a **New → Blueprint** menüpontot, csatlakoztasd ezt a GitHub-repót, majd ellenőrizd és hozd létre a szolgáltatásokat. A Blueprint egy webszolgáltatást és PostgreSQL-adatbázist kér. Az `ADMIN_EMAIL` és `ADMIN_PASSWORD` titkos értékeit a Render Dashboardon add meg; ezután az első indulás létrehozza az adminfiókot. A szolgáltatás saját HTTPS `onrender.com` címet kap a sikeres telepítés után.

Ingyenes Render-csomag korlátozásai: az inaktív webszolgáltatás 15 perc után leállhat, ezért az első látogatónál körülbelül egyperces indulás előfordulhat. Az ingyenes Render PostgreSQL adatbázis 30 nap után lejár, és ingyenes példányokra adatmentés sem jár; ezért ez csak kipróbálásra alkalmas. Tartós játékhoz fizetős adatbázis és folyamatosan futó webszolgáltatás szükséges. Lásd a [Render ingyenes csomagjának leírását](https://render.com/docs/free).

## Környezeti változók

- `DATABASE_URL` – kötelező PostgreSQL connection string.
- `PORT` – port, amelyen a szolgáltatás figyel (Render automatikusan beállítja).
- `ADMIN_EMAIL`, `ADMIN_PASSWORD` – opcionális, csak egyszeri kezdeti admin létrehozásához. Ha az email létezik, ez nem írja felül a fiókot.
- `ADMIN_NAME` – opcionális admin megjelenített neve.
- `PGSSL=true` – csak akkor állítsd be, ha a PostgreSQL szolgáltató TLS-t kíván a kapcsolatban.
- `SMTP_HOST`, `SMTP_USER`, `SMTP_PASSWORD`, `SMTP_FROM` – opcionális SMTP-beállítások a jelszó-visszaállító emailhez; a küldés STARTTLS-t követel, kivéve ha `SMTP_SECURE=true` van implicit TLS-hez.
- `SMTP_PORT` – alapérték 587. Render ingyenes webszolgáltatáson a 25, 465 és 587 kimenő port tiltott; ott csak olyan email-szolgáltatóval működik, amely támogatja például a 2525-ös SMTP-portot. Az ingyenes hoszt nem garantál folyamatos működést.
- `PUBLIC_URL` – nyilvános HTTPS alapcím a reset-linkhez; Renderen alapértelmezésként a platform `RENDER_EXTERNAL_URL` változóját használja.

A pénztárca virtuális játékelem. A befizetési/kifizetési menüpont csak kérelmeket naplóz, banki műveletet nem hajt végre. Jelszó-visszaállítás SMTP nélkül kikapcsolt; ilyenkor a felület ezt közli, és az email-címhez tartozó fiók létezését nem fedi fel.
