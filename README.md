# Generator de site-uri pentru restaurante

Proiect Next.js cu App Router, TypeScript și Tailwind CSS. Fiecare restaurant va avea propria configurație JSON și va fi generat ca pagină statică.

## Dezvoltare locală pe Windows

Cu Node.js 24 și Corepack disponibile, rulează în PowerShell:

```powershell
corepack.cmd pnpm install --frozen-lockfile
corepack.cmd pnpm dev
```

Deschide [localhost:3000](http://localhost:3000). Corepack folosește versiunea pnpm fixată în `package.json`.

## Verificări și build

```powershell
corepack.cmd pnpm lint
corepack.cmd pnpm typecheck
corepack.cmd pnpm test
corepack.cmd pnpm build
```

Build-ul generează fișierele statice în `out/`, directorul de publicat pe un serviciu de găzduire statică.

## Configurația restaurantelor

Exemplul FORNO se află în `data/restaurants/forno.json`. Pentru un restaurant nou, adaugă în același director un fișier JSON numit după slug-ul lui. Schema Zod din `src/lib/restaurants/schema.mts` validează fiecare fișier. Pune imaginile în `public/restaurants/<slug>/` și folosește căi de forma `/restaurants/<slug>/logo.svg` în JSON.
