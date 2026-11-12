# Generator de site-uri pentru restaurante

## FORNO — Classic

Responsive implementation of the supplied desktop reference, with an adapted mobile layout. The JSON config owns branding, hero and about copy, colors, contact details, category icons, products, prices, and local image paths. The supported layout identifier is `classic`.

- Preview: run `corepack.cmd pnpm dev`, then open http://localhost:3000/forno.
- Category buttons select a category. Search matches names, ingredients, and category names across the entire menu, ignoring Romanian diacritics. Clearing search restores the selected category.
- Phone and WhatsApp links appear only when `phone` and `whatsapp` are configured as international numbers (for example, `+40…`). No fictional phone number has been supplied.
- The address and hours are fictional sample content from the reference; replace them before real use.
- The existing `hero.webp` is reused for the hero and Margherita. All other products use explicitly marked local SVG placeholders (`placeholder-*.svg`), which need replacing with actual dish photography via the product `image` field in JSON. The reference screenshot is never used as a page background.
- Only one desktop reference was available. Exact mobile-reference comparison and browser visual QA remain unverified.
- No favorites, cart, ordering, login, or payment features are included.

Required configuration additions: `hero` (`eyebrow`, `title`, `emphasis`, `description`, `imageAlt`), `about` (`title`, `description`), and `menuDescription`. Category `icon` accepts `pizza`, `pasta`, `salad`, `dessert`, or `drink`.

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
