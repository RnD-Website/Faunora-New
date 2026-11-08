# Faunora — animal & pet nutrition website

A lead-generation site for **Faunora**, using farmminerals.com as the layout reference.
Visitors request samples through a pop-up form, not a shop.

**Stack:** Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · Zod

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Where things live

| What | File |
| --- | --- |
| All text, products, blog posts, trial data | `src/content/site.ts` |
| Colors, fonts, buttons (design tokens) | `src/app/globals.css` |
| Home page sections | `src/app/page.tsx` |
| Request-sample form (modal) | `src/components/request-modal.tsx` |
| Form handler (API) | `src/app/api/request/route.ts` |
| Images (Unsplash, free licence) | `public/images/` |

## Design system

- **Colors** (matched to farmminerals.com): main green `#404F1D`, heading olive `#636F3D`, olive `#596A33`, sage `#7C914C`, beige `#F4EDE6`, deep green `#1F2509`.
- **Type** (modeled on onliftoff.com): Liftoff uses *Recife Display*, a paid font, for headlines.
  This site uses **Fraunces** (soft axis) as a free stand-in. Body text and headings use **Inter** with tight tracking.

## Before launch

- [ ] Replace every placeholder statistic and trial figure in `src/content/site.ts` with real, cited data
- [ ] Connect lead delivery: set `LEAD_WEBHOOK_URL` (Zapier, Make, a CRM or email service).
      Until then, submissions are only logged on the server.
- [ ] Real contact email, phone and social links
- [ ] Privacy Policy and Terms text
- [ ] Certifications on `/science#safety`
- [ ] Product photography to replace the stock images
