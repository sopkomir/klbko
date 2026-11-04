# Klbko

Od témy k hotovej pomôcke za päť minút. Next.js aplikácia pre učiteľov so ŠVP 2023 a ŠVP 2015.

## Nasadenie na Vercel
1. Importujte repozitár do Vercelu.
2. V Settings → Environment Variables pridajte `GEMINI_API_KEY`, prípadne `XAI_API_KEY`.
3. V záložke Storage vytvorte Blob a pripojte ho k projektu. Tým sa zapnú krátke odkazy a QR kódy pre žiakov.
4. Spustite Redeploy.

## Databáza ŠVP
`data/svp.json` vzniká zo súboru `svp-dokumenty.tar.gz` skriptami `scripts/parse_svp.py` a `scripts/build_db.py`.
Znenie štandardov sa neprepisuje a pri každom zázname je zdroj a strana. AI vyberá štandardy iba podľa id.

## Lokálne
`npm install`, skopírujte `.env.example` do `.env.local`, spustite `npm run dev`.
