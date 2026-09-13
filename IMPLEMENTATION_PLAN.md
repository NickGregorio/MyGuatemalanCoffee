# MyGuatemalanCoffee.com — Implementation Plan

Target folder: `D:\Coding_Lessons\MyGuatemalanCoffee` (currently empty)

---

## Context

You are selling **roasted** Guatemalan coffee wholesale to US cafés, roasted in Guatemala
and shipped north. There is no website yet. The job of this site is narrow and single-purpose:
take a café owner or head-of-coffee who has never heard of you, make the case that a
Guatemalan line is worth adding to their bar, and capture enough lead information that you
can follow up with a real quote.

This is **not** a "we are a coffee company" brochure. It is a wholesale pitch page with one
CTA, aimed at a buyer who almost certainly already has a roaster. The wedge is **additive**,
not replacement: *add one origin to your bar*, not *fire your current supplier*.

The single most useful fact you gave me is your product line, because it maps onto Guatemala's
real structure better than a generic origin pitch ever could:

| Product | Role on a café bar |
|---|---|
| **8-Region Guatemalan Blend** | House / espresso / volume coffee |
| **Pueblo Nuevo Viñas, Santa Rosa** | Rotating single-origin, filter & guest slot |
| **Santa Rosalía de Mármol, Zacapa** | Rotating single-origin, filter & guest slot |

That is a *complete bar program from one supplier* — a blend to pour all day and two single
origins to rotate. That is the whole argument, and the site is built around it.

---

## Decisions already made — don't relitigate

| Decision | Choice |
|---|---|
| Brand name | **MyGuatemalanCoffee.com** (domain-as-brand) |
| Product | Roasted wholesale |
| Roast location | Guatemala, shipped to US |
| Audience | Both, **indies first** (1–3 shops lead, multi-location secondary path) |
| Stack | Next.js 16 App Router + Tailwind v4 (matches Therafix / Chroma Group) |
| Lead destination | Resend → your inbox |
| Language | **English only.** US buyers. No i18n — a deliberate simplification vs. the two sibling sites |
| Scope | **One page** + form, like both siblings. No blog, no shop, no accounts |
| Deploy | Vercel via Git, behind the same two-part noindex guard until you say launch |

---

## The credibility ledger: what's verifiable vs. what's a TODO

The copy rule from your Chroma Group build applies verbatim here: **no fabricated proof.**
No invented farm names, no made-up cupping scores, no "trusted by 200 cafés."

### Safe to state — general, published, verifiable origin facts

- Guatemala has **eight officially designated coffee regions** (Anacafé): Acatenango Valley,
  Antigua Coffee, Traditional Atitlán, Rainforest Cobán, Fraijanes Plateau, Highland
  Huehuetenango, New Oriente, Volcanic San Marcos.
- Guatemala grades coffee **by altitude**. **SHB (Strictly Hard Bean) = grown at 1,350 m
  (~4,500 ft) and above** — the top grade. Below that: Hard Bean, Semi Hard Bean, and down.
- Altitude is not marketing. Cooler air at elevation slows cherry maturation; the bean develops
  more density and more sugar, which is where the acidity and complexity in a high-grown cup
  come from. This is the mechanism, and it is worth explaining in one plain sentence.
- Guatemala is predominantly shade-grown, washed-process, with Bourbon / Caturra / Catuaí /
  Typica varietals; harvest runs roughly **December–April**.

> **Build-time check:** re-verify the per-region altitude bands against anacafe.org before they
> ship as numbers on the page. I have them as approximately Antigua 1,500–1,700 m, Huehuetenango
> 1,500–2,000 m, Acatenango 1,300–2,000 m, Atitlán 1,500–1,700 m, Cobán 1,300–1,500 m, Fraijanes
> 1,400–1,800 m, New Oriente 1,300–1,700 m, San Marcos 1,300–1,800 m — good enough to design the
> layout, not good enough to publish unchecked.

### TODO_CONFIRM — everything specific to you

These render as visible placeholders in dev and **block launch**. Tracked in one table in
`HANDOFF.md` and marked inline in `lib/copy.ts` with a `TODO_CONFIRM` constant so they're greppable.

**Product / lot**
- Exact producer or finca name for each specialty lot, and whether "Santa Rosalía de Mármol"
  is the farm, the community, or the mill
- Anacafé region attribution for each lot — Zacapa reads as **New Oriente**; Pueblo Nuevo Viñas
  sits in Santa Rosa near the **Fraijanes Plateau** edge. Both need confirming, not assuming
- **Actual altitude in metres for each lot** (you asked to connect altitudes — this is the number
  that does it), plus whether each clears the 1,350 m SHB line
- Varietal, process, harvest window, and any cupping score per lot
- Roast level per product, and whether each is offered espresso- and filter-profiled

**Commercial**
- MOQ, price per lb at each volume break, bag sizes (12 oz retail? 5 lb wholesale?)
- Lead time from order → arrival, and the honest **transit window** in days
- Freight: who pays, and at what order value does it become free
- Whether a **sample box is free**, and who covers its shipping — see the CTA risk below
- Reorder cadence and how an account actually places an order (email? portal? you call them?)

**Trust & compliance** — a serious buyer will ask, and these are worth resolving before launch
- FDA Food Facility Registration and Prior Notice for imported food
- FSVP (Foreign Supplier Verification Program) — who is the importer of record
- US label compliance: net weight, country of origin, importer name/address
- Certifications: organic, Rainforest Alliance, Fair Trade, or none (saying "none" is fine —
  inventing one is not)
- Business entity, US point of contact, insurance

---

## Positioning and copy strategy

**One-line positioning:**
> A complete Guatemalan bar program — one blend, two single origins — from the people who
> roast it at origin.

**The three arguments, in order:**

1. **Variety without a second supplier.** Eight regions in the blend, two rotating single
   origins on the side. A café expands its menu meaningfully by adding one account, not three.
2. **Altitude is the quality mechanism, and it's checkable.** Guatemala grades by elevation.
   You publish the metres. Nothing here asks anyone to take your word for it.
3. **Roasted at origin.** The people cupping the green are the people setting the roast curve.

**Copy rules — enforced in `lib/copy.ts`'s header, same as Chroma Group:**
1. No fabricated proof. No testimonials, no client logos, no invented numbers.
2. **No implied incompetence.** Never suggest the reader's current menu is boring, limited, or
   badly chosen. They chose it. The pitch is addition, not correction.
3. **No fear framing.** No "your competitors are already…", no scarcity theatre.
4. No filler. Cut "premium," "exceptional," "passion," "journey," "handcrafted," "the perfect cup."
   Every adjective must be replaceable by a number or deleted.
5. Headlines make a claim, not a category. "Eight regions in one bag" beats "Our Coffee."
6. Specificity beats intensity. "1,500 m, washed Bourbon, roast date on the bag" beats "the finest."
7. Active voice. Short sentences. Second person — "your bar," "your baristas."

**On freshness — handle this honestly.** Roasting at origin and shipping to the US is the one
place this pitch is structurally weaker than a domestic roaster, and a café buyer will spot a
dodge instantly. Do not claim "roasted yesterday." The credible framing is:

- Roast date printed on every bag, no exceptions
- Roasted to order against a delivery date, not roasted to sit in a warehouse
- The transit window stated as a **published number of days**, not hidden
- One-way degassing valve bags *(TODO_CONFIRM)*
- The trade named out loud: a few days in transit, in exchange for a roast set by the people
  who cup the green

Being the only page in the category that states its transit time plainly is itself the trust play.

---

## Page architecture

One page, one CTA repeated, section IDs for anchor links.

| # | Section | Angle | Draft headline |
|---|---|---|---|
| 1 | **Hero** | Positioning + primary CTA + the three products named immediately | *Eight regions. One blend. Two single origins.* / sub: A complete Guatemalan program for your bar — roasted at origin, with the altitude printed on the bag. |
| 2 | **The case for Guatemala** | The altitude→density→sugar mechanism, in plain language. Three short proof blocks: eight regions, SHB grading, volcanic and highland soils | *Guatemala grades its coffee by how high it grew.* |
| 3 | **The eight regions** | Visual centrepiece. Eight cards/rows: region name, altitude band, cup character. Carries the blend's argument | *What goes into the blend.* |
| 4 | **The line** | Three product cards — the blend + two specialties. Region, altitude, process, varietal, cup notes, role on the bar | *Three coffees. One account.* |
| 5 | **The two lots** | Deeper on Pueblo Nuevo Viñas and Santa Rosalía de Mármol — the traceability section, where the real altitude numbers land | *Two lots most US menus never reach.* |
| 6 | **Roasted at origin** | The freshness section. Honest transit handling per above | *Roasted where it grew. Dated on every bag.* |
| 7 | **How it works** | 4 steps: request samples → cup & dial in → set your order → recurring delivery. Kills the "this will be complicated" objection | *Four steps to a Guatemalan line on your bar.* |
| 8 | **Built for cafés** | The commercial block: MOQ, bag sizes, cadence, dial-in support, recipe card per lot, margin math. Secondary multi-location path lives here | *What an account actually looks like.* |
| 9 | **FAQ** | Objection handling: already have a roaster / consistency / minimums / freight & customs / decaf / retail bags / exclusivity | — |
| 10 | **CTA + form** | The lead form. The page's only destination | *Get the three coffees on your cupping table.* |
| 11 | **Footer** | Contact, region list, legal, sourced from `lib/site.ts` | — |

**Primary CTA:** *Request your sample box* — concrete, low-commitment, and it's what café buyers
expect before any wholesale commitment.

> ⚠️ **CTA risk to settle before build.** Free samples shipped from Guatemala carry real freight
> and customs cost, and an open web form invites tire-kickers. Decide one of: (a) free samples,
> qualified by the form's volume question; (b) "request pricing + samples," softening the promise;
> (c) samples free above a stated volume, paid below. The form is built to support any of the three
> — it's a copy change, not a rebuild — but it must be answered before launch.

---

## Logo — three options

Hand-authored SVG React components, matching how both sibling sites do logos (Chroma's mark is
redrawn SVG, Therafix's wordmark is set in type). No raster logos. Each must read at **24 px**
favicon size and work one-colour for a coffee sack stencil or an invoice.

The name is long, so each mark ships with its own **wordmark lockup** solution.

### Option A — "Ocho" *(recommended)*
Eight tapered strokes radiating from a centre point — reads simultaneously as a coffee blossom,
a compass rose, and a sun. The centre is a negative-space bean crease. Directly encodes the
flagship product; the count *means* something, which is rare in a logo.

- **Lockup:** mark left, two-line wordmark right — `MYGUATEMALAN` / `COFFEE .COM` with `.COM` in
  muted at the baseline.
- **Why:** the only one of the three where the mark and the positioning are the same idea.
- **Animation:** the eight strokes can stagger in on load — one CSS keyframe, no library, same
  technique as Chroma's misregistered ink plates.

### Option B — "Cota" (contour)
Concentric topographic contour lines forming a volcanic cone in silhouette; the summit contour
breaks open to form a bean crease. Encodes altitude — the exact thing your quality argument rests on.

- **Lockup:** mark above, wordmark centred below in wide letterspaced caps.
- **Why:** technical, spec-sheet credibility. Looks like a document, not an ad. Strong with buyers
  who care about numbers.
- **Risk:** busier at 24 px; needs a simplified 3-line variant for the favicon.

### Option C — "Sello" (export seal)
A circular seal: outer ring carrying `GUATEMALA · SHB · ALTURA` in microtype, inner field holding a
simple bean-and-cherry glyph. Echoes jute-sack stencils and export stamps.

- **Lockup:** seal left, `MyGuatemalanCoffee` set inline with weight contrast — light `My`, bold
  `Guatemalan`, light `Coffee`, `.com` muted.
- **Why:** most heritage/importer feel, best of the three printed on a bag.
- **Risk:** the most conventional coffee-brand move; microtype disappears below ~40 px, so the
  favicon needs a ring-only variant.

---

## Colour palettes — three options

**The governing constraint.** I measured `#50C878` (WCAG 2.1 relative luminance, computed this
session, not estimated):

| Pairing | Ratio | Verdict |
|---|---|---|
| `#50C878` on near-black `#0C1311` | **8.84:1** | AAA — excellent |
| `#50C878` on espresso `#2B1D16` | **7.65:1** | AAA — excellent |
| `#50C878` on cream `#FAF6EF` | **1.97:1** | **FAIL** — unusable for text |

**`#50C878` is a dark-background colour.** On light grounds it is a *fill only* — never body copy,
never labels, never links — exactly the rule your Chroma Group build already carries for magenta.
This constraint is what separates the three palettes below, and it goes in the header of
`app/globals.css` as the first thing anyone reads, with the measured numbers inline.

### Palette 1 — "Altura" (dark) — **recommended**

The only palette where your brand colour is usable at full strength as given. Dark also reads
premium-specialty in coffee, and makes the green feel like a highland canopy rather than mint.

```
--color-ink        #0C1311   near-black, green-shifted
--color-surface    #131C19
--color-surface-2  #1B2622
--color-line       #2A3833
--color-emerald    #50C878   ← your colour, 8.84:1 on ink. Text AND fill. No restrictions.
--color-amber      #E8A87C   9.24:1 — warm secondary, roast/cherry notes
--color-paper      #FFFFFF   18.80:1
--color-muted      #A8B3AE   8.71:1 — body copy
```
Buttons: ink text on emerald fill = 8.84:1. Every pairing clears AAA. Type: **Fraunces** (display)
+ **Archivo** (body).

### Palette 2 — "Antigua" (warm light)

Editorial, food-magazine. Costs you the brand colour as a text colour — requires a two-tone
emerald discipline that is easy to get wrong under time pressure.

```
--color-ground       #FAF6EF   warm cream
--color-paper        #FFFFFF
--color-ink          #1A1F1C   15.51:1 on ground
--color-espresso     #3E2A20   12.52:1 — headings
--color-emerald-ink  #0E7A45   5.01:1 — the ONLY emerald allowed on text
--color-emerald      #50C878   1.97:1 — FILLS ONLY. Never text.
--color-muted        #5A6560   5.63:1
--color-line         #E2DBD0
```
White on `#0E7A45` buttons = 5.40:1. Type: **Instrument Serif** + **Archivo** (proven in Therafix).

### Palette 3 — "Huehue" (espresso split)

Deep espresso as the dominant surface with cream sections for long-form reading. Warm like coffee
*and* keeps the brand green at full strength — the middle path.

```
--color-espresso  #2B1D16   dominant surface
--color-paper     #F5F1EA   cream, for reading sections
--color-ink       #2B1D16   14.46:1 on paper
--color-emerald   #50C878   7.65:1 on espresso — free use on dark sections
--color-emerald-ink #0E7A45 4.80:1 on paper — emerald text on cream sections only
--color-muted-dk  #C4B5A8   on espresso
--color-muted-lt  #6B5A4E   5.83:1 on paper
```
Espresso text on emerald fill = 7.65:1. Type: **Fraunces** + **Inter**.

> All ratios above were computed this session. They get re-verified against the *rendered* page
> before launch — and note the Chroma trap: **any opacity modifier on a text colour changes its
> ratio and must be re-measured.** A `text-emerald/70` is not an emerald.

---

## Tech stack and file layout

Clone the sibling template exactly. Versions matched to Therafix and Chroma Group:

- **Next.js 16.3.4** App Router (Turbopack), **React 19.2.8**, **TypeScript 5** (`strict`)
- **Tailwind v4** via `@tailwindcss/postcss` — **no `tailwind.config.ts`**; tokens live in an
  `@theme` block at the top of `app/globals.css`
- **zod ^4.6.2** — one schema shared client and server
- **resend** — the only dependency the siblings don't have
- Path alias `@/*`. Files **kebab-case**, components **PascalCase named exports** (never default,
  except `app/page.tsx` / `app/layout.tsx`)
- `next/font/google`, self-hosted at build
- **No `next/image`, no framer-motion, no shadcn/ui** — matching both siblings. Animation is CSS
  keyframes only, plus a `prefers-reduced-motion` block
- Mobile-first at a **390 px** canvas

```
D:\Coding_Lessons\MyGuatemalanCoffee\
├── app/
│   ├── layout.tsx          fonts, metadata, JSON-LD, PRE-LAUNCH noindex guard #1
│   ├── page.tsx            section composition only
│   ├── globals.css         @theme tokens + CONTRAST RULE header + keyframes
│   ├── robots.ts           PRE-LAUNCH noindex guard #2
│   ├── icon.svg
│   └── api/lead/route.ts   validate → Resend → respond
├── components/
│   ├── ui.tsx              cx, Section, SectionLabel, SectionHeading, Lede, ButtonLink
│   ├── logo.tsx            the chosen SVG mark + wordmark lockup
│   ├── site-header.tsx
│   ├── hero.tsx
│   ├── origin-case.tsx     §2
│   ├── regions.tsx         §3 — the eight-region grid
│   ├── product-line.tsx    §4
│   ├── lots.tsx            §5
│   ├── roasted-at-origin.tsx §6
│   ├── how-it-works.tsx    §7
│   ├── for-cafes.tsx       §8
│   ├── faq.tsx             §9
│   ├── lead-form.tsx       §10
│   └── footer.tsx
├── lib/
│   ├── site.ts             single source of truth: contact, URLs, social
│   ├── regions.ts          the 8 regions — ids + altitude bands, strings in copy.ts
│   ├── products.ts         the 3 products — ids + PRODUCT_IDS tuple for z.enum()
│   ├── copy.ts             ALL reader-facing strings + the copy rules header
│   └── lead.ts             zod schema, shared client/server
└── HANDOFF.md              written LAST, after the final commit
```

**Patterns to reuse directly from the siblings — read these files before writing the equivalents:**

- `D:\Coding_Lessons\Chroma_Group\lib\contact.ts` — the frozen `as const` + URL-builder pattern,
  including the doc comment stating the prohibition ("nothing else may hardcode an email address").
  `lib/site.ts` copies this shape.
- `D:\Coding_Lessons\Chroma_Group\lib\services.ts` — the **structure-here / strings-in-copy.ts**
  split, and the `SERVICE_IDS` tuple cast that feeds `z.enum()` so the form's options and the schema
  cannot drift. `lib/products.ts` and `lib/regions.ts` copy this exactly.
- `D:\Coding_Lessons\Chroma_Group\components\quote-form.tsx` — the most reusable file in either repo.
  Hand-rolled `useState` + zod (no react-hook-form), `noValidate`, `useId()`-prefixed field ids,
  per-field `aria-invalid` + `aria-describedby`, an error-summary div with `tabIndex={-1}` and
  conditional `role="alert"` that focus jumps to on failure, and a local `Field` sub-component with
  shared class constants.
- `D:\Coding_Lessons\Chroma_Group\app\layout.tsx` — the env-driven `siteUrl` resolution
  (`NEXT_PUBLIC_SITE_URL` → `VERCEL_PROJECT_PRODUCTION_URL` → localhost) and the JSON-LD block.
- `D:\Coding_Lessons\Chroma_Group\components\ui.tsx` — `Section` with a `tone` prop, `ButtonLink`
  with `variant` + `external`, and the `gap-px` on a line-coloured background trick for hairline grids.

**Deliberate deviations from the siblings — each is a decision, not an oversight:**
1. **No i18n.** Single locale. Drop `lib/i18n.tsx`, `useSyncExternalStore`, the locale store, and
   the hydration guard entirely. `lib/copy.ts` exports a flat object, not `Record<Locale, Copy>`.
   Most sections become server components as a result — only `lead-form.tsx` and `faq.tsx` need
   `"use client"`.
2. **Plain error strings** in `lib/lead.ts`, not message keys. The keys existed to be localised.
3. **`/api/lead` actually sends.** In both siblings the route validates, logs, and drops the lead
   on the floor behind a `TODO — CRM wiring` comment. Here it completes.

---

## The lead form and Resend pipeline

**Fields** (branches on location count, per "both, indies first"):

| Field | Type | Req | Notes |
|---|---|---|---|
| Name | text | ✓ | |
| Café / business name | text | ✓ | |
| Work email | email | ✓ | |
| Phone | tel | | |
| City + State | text | ✓ | Drives freight — genuinely needed, not a data grab |
| Locations | select | ✓ | `1` / `2–3` / `4–10` / `10+` — the indie↔chain branch |
| Monthly coffee volume | select | ✓ | `<20 lb` / `20–50` / `50–150` / `150+` / `not sure`. Qualifies the sample box |
| Interested in | checkbox group | ✓ | The three products by id, from `PRODUCT_IDS` |
| Message | textarea | | |
| `website` | **honeypot** | | Hidden, `aria-hidden`, `tabIndex={-1}`. Non-empty → silent 200, no send |

Selecting `10+` locations swaps the submit-button and success copy to the contract/multi-location
path. No separate form.

**Flow:**
1. Client: `leadSchema.safeParse()`. On failure, `collectErrors()` → focus jumps to the error summary.
2. `POST /api/lead`.
3. Server: **re-validate with the same schema** (never trust the client). `400 invalid_json` /
   `422` with `flatten().fieldErrors` / `200 {ok:true}`.
4. Honeypot check → silent success, no email.
5. Rate limit → in-memory `Map` keyed by IP, ~5/hour.
6. `resend.emails.send()` — plain-text body, subject carries café name + location count so it's
   scannable from a phone, and **`replyTo` set to the lead's email so you can just hit reply**.
7. `console.log` non-identifying fields only (`locations=`, `volume=`, `products=`), matching the
   sibling privacy discipline.

**Env:** `RESEND_API_KEY`, `LEAD_TO_EMAIL`, `LEAD_FROM_EMAIL`, `NEXT_PUBLIC_SITE_URL`.
In `.env.local` (gitignored via `.env*`) and in Vercel project settings.

> ⚠️ **Three Resend traps to plan around.**
> 1. The `from:` address must be on a **domain verified in Resend**. Until MyGuatemalanCoffee.com's
>    DNS is verified you can only use `onboarding@resend.dev`, **which delivers solely to the Resend
>    account owner's own address.** Domain verification is therefore a launch blocker, not a polish item.
> 2. **A failed send must not silently eat a lead.** If `resend.emails.send()` throws, log the full
>    payload server-side and return a distinct error so the UI can show a fallback `mailto:` link
>    prefilled with the visitor's own answers. This is the same load-bearing fallback as Chroma's
>    prefilled WhatsApp link — build it in from the start, don't retrofit it.
> 3. An open unauthenticated POST that now *sends email* is a different risk class from the siblings',
>    where nothing was sent. The honeypot + rate limit are the floor, not the ceiling. If it gets
>    abused, Turnstile or hCaptcha is the next step.

---

## Build phases

1. **Scaffold** — `create-next-app` to match sibling versions exactly; strip the boilerplate README
   content; `.gitignore`; `git init`; first commit.
2. **Design system** — `app/globals.css` with the chosen `@theme` tokens and the CONTRAST RULE
   header carrying the measured numbers; fonts in `layout.tsx`; `components/ui.tsx` primitives.
3. **Logo** — build **all three** marks as SVG components so you can see them rendered side by side
   at hero, header, and 24 px favicon size before choosing. Keep the two you don't pick in the repo
   until you decide; delete them at launch.
4. **Data + copy** — `lib/site.ts`, `lib/regions.ts`, `lib/products.ts`, `lib/copy.ts` with the copy
   rules header and every unknown marked `TODO_CONFIRM`.
5. **Sections** — build §1–§9 in page order. Verify at 390 px as each lands, not at the end.
6. **Form + API** — `lib/lead.ts`, `lead-form.tsx`, `api/lead/route.ts`, honeypot, rate limit,
   Resend, mailto fallback.
7. **SEO + guards** — metadata, OG, JSON-LD (`Organization` / `Product`), `robots.ts`, and **both
   halves of the noindex guard with cross-referencing `PRE-LAUNCH GUARD` comments**.
8. **Audit** — contrast sweep of every rendered pair, keyboard tab order, reduced motion, 390 px.
9. **Deploy** — Vercel, env vars, preview URL.
10. **`HANDOFF.md` — written last**, after the final commit, using the siblings' section structure
    (*What this is* → *Verified live at handoff* → *Where things live* → *Decisions — don't
    relitigate* → *Traps* → *What was verified and what wasn't* → *Where to start next*), with the
    full `TODO_CONFIRM` ledger as a launch checklist.

---

## Verification

- `npm run build` clean, `npm run lint` clean, `npx tsc --noEmit` clean.
- `npm run dev`, then walk the page at **390 px** and at desktop width via the Chrome MCP tools:
  no horizontal scroll, no crushed headline, every section reachable.
- **Contrast:** enumerate every rendered text/background pair and compute ratios against the
  *composited* colour, re-measuring anything carrying an opacity modifier. Chroma's audit found a
  `text-magenta/70` that had quietly composited to 2.72:1 — assume the same class of bug here.
- **Keyboard:** tab the whole page. Every interactive element reachable, visible `:focus-visible`,
  and on a failed submit focus must land on the error summary.
- **Form, end to end:** submit valid → 200 → **email actually arrives in `LEAD_TO_EMAIL`** with a
  working reply-to. Submit invalid → per-field errors, focus moves, nothing sent. Fill the honeypot
  → silent 200, nothing sent. Submit 6× → rate limited. Unset `RESEND_API_KEY` → mailto fallback
  renders and is prefilled.
- **Guards:** confirm `/robots.txt` disallows and that the rendered `<head>` carries
  `noindex, nofollow`. **Both, or the guard is not on.**
- `prefers-reduced-motion` honoured (note the sibling trap: verified by patching `matchMedia`, never
  by toggling the OS setting — same limitation will apply here unless you test it for real).

---

## Open risks

1. **The sample-box economics are unresolved** and they sit under the page's only CTA. Decide before
   launch — see §10.
2. **Resend domain verification blocks real delivery.** Start the DNS records early; it is not a
   five-minute task if the domain's DNS is somewhere awkward.
3. **Transit time is the pitch's soft spot.** The plan handles it by stating the number plainly.
   If the real number turns out to be bad, §6 needs rethinking, not rewording.
4. **Region attribution for both specialty lots is unconfirmed.** Publishing the wrong Anacafé region
   for a lot is the exact kind of error a knowledgeable buyer catches, and it costs more credibility
   than having no region at all.
5. **Vercel Hobby is non-commercial.** A live commercial site needs Pro — same flag as both siblings.
6. **No automated tests, and nothing runs on real mobile hardware.** Consistent with the siblings;
   worth knowing it's a gap rather than discovering it later.
