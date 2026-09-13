/**
 * Every reader-facing string on the site.
 *
 * RULES FOR EDITING THIS FILE — these are not style preferences, they are the
 * reasons the page is credible. Breaking one costs more than the sentence is
 * worth.
 *
 *  1. NO FABRICATED PROOF. No testimonials, no café logos, no cupping scores,
 *     no "trusted by 200 shops", no invented farm names. If it is not
 *     confirmed, it is a PENDING marker — see below.
 *
 *  2. NO IMPLIED INCOMPETENCE. Never suggest the reader's current menu is
 *     boring, limited or badly chosen. They chose it, usually carefully. This
 *     is an ADDITION pitch, not a correction: one more origin on the bar, not
 *     a rescue from the supplier they already have.
 *
 *  3. NO FEAR FRAMING. No "your competitors already", no scarcity, no urgency
 *     the business cannot actually back.
 *
 *  4. NO FILLER. Banned outright: premium, exceptional, passion, journey,
 *     handcrafted, artisanal, the perfect cup, elevate, unlock, nestled.
 *     If an adjective cannot be swapped for a number, cut it.
 *
 *  5. HEADLINES MAKE A CLAIM, not a category. "Eight regions, one bag" beats
 *     "Our Coffee".
 *
 *  6. SPECIFICITY BEATS INTENSITY. "1,350 m, washed, roast date on the bag"
 *     beats "the finest Guatemalan coffee available anywhere".
 *
 *  7. SECOND PERSON. "your bar", "your baristas", "what you pour".
 *
 * ---------------------------------------------------------------------------
 * PENDING MARKERS
 *
 * `pending("...")` renders as a loud inline badge, on purpose. Anything the
 * business has not confirmed shows up as an obvious hole rather than a
 * plausible-looking guess — because a plausible-looking guess is how a wrong
 * MOQ or a wrong altitude reaches a buyer. Every one is listed in HANDOFF.md
 * as a launch blocker.
 *
 * Grep for `pending(` to find them all.
 * ---------------------------------------------------------------------------
 *
 * OPEN DECISION — THE SAMPLE BOX. The CTA says "samples and pricing" rather
 * than "free sample box" deliberately. Samples shipped from Guatemala carry
 * real freight and customs cost, and an open web form invites tyre-kickers.
 * Until the business decides whether samples are free, paid, or free above a
 * volume threshold, the copy must not promise free. Changing it later is a
 * one-line edit here.
 */

import { REGIONS, SHB_METRES } from "./regions";

export const PENDING_PREFIX = "TODO_CONFIRM";

/** Marks an unconfirmed fact. Renders as a visible badge via <Pending>. */
export function pending(what: string): string {
  return `${PENDING_PREFIX}: ${what}`;
}

/**
 * Spell out small numbers in prose.
 *
 * These counts are DERIVED (see below), so they arrive as digits — and "5 of
 * the eight regions" next to "eight regions" in the same sentence reads like a
 * templating leak, which is exactly what it is. Anything above ten stays as a
 * numeral, as does every measurement: altitudes and volumes are data and
 * belong in figures.
 */
const WORDS = [
  "zero", "one", "two", "three", "four", "five",
  "six", "seven", "eight", "nine", "ten",
] as const;

function spell(n: number): string {
  return WORDS[n] ?? String(n);
}

/** Sentence-case form, for a count that opens a sentence. */
function Spell(n: number): string {
  const w = spell(n);
  return w.charAt(0).toUpperCase() + w.slice(1);
}

/* Derived, never hardcoded: edit regions.ts and every sentence quoting a count
   moves with it. A prose number that drifts out of sync with the table beneath
   it is exactly the kind of error a buyer notices and we would not. */
const VOLCANIC_COUNT = REGIONS.filter((r) => r.soil === "volcanic").length;
const HIGHLAND_COUNT = REGIONS.length - VOLCANIC_COUNT;

/** Regions whose whole published band clears the SHB line, vs those spanning it. */
const FULLY_SHB_COUNT = REGIONS.filter((r) => r.altMin >= SHB_METRES).length;
const STRADDLE_SHB_COUNT = REGIONS.length - FULLY_SHB_COUNT;

export const copy = {
  meta: {
    title: "MyGuatemalanCoffee.com — Guatemalan coffee, wholesale to US cafés",
    titleTemplate: "%s · MyGuatemalanCoffee.com",
    description:
      "A complete Guatemalan bar program for US cafés: an eight-region blend and two single-origin lots, roasted at origin with the growing altitude and roast date on every bag.",
    keywords: [
      "Guatemalan coffee wholesale",
      "wholesale coffee for cafes",
      "single origin Guatemala",
      "specialty coffee supplier US",
      "SHB Guatemalan coffee",
      "cafe coffee supplier",
    ],
  },

  nav: {
    regions: "The regions",
    line: "The coffees",
    origin: "Roasted at origin",
    how: "How it works",
    faq: "FAQ",
    cta: "Request samples",
    skipToContent: "Skip to content",
  },

  hero: {
    label: "Wholesale · Roasted in Guatemala",
    headline: "Eight regions. One blend. Two single origins.",
    lede: "A complete Guatemalan program for your bar. An everyday blend drawn from all eight of Guatemala's designated coffee regions, plus two single-origin lots to rotate through the filter and guest slot. Roasted at origin, with the growing altitude and the roast date printed on every bag.",
    cta: "Request samples & pricing",
    ctaSecondary: "See what's in the blend",
    stats: [
      { value: "8", label: "designated regions in the blend" },
      {
        value: `${SHB_METRES.toLocaleString("en-US")} m`,
        label: "where Guatemala's top grade starts",
      },
      { value: "3", label: "coffees, one account" },
    ],
  },

  origin: {
    label: "Why Guatemala",
    heading: "Guatemala grades its coffee by how high it grew.",
    body: "Most origins grade on defect count and screen size. Guatemala adds elevation, and its top grade — Strictly Hard Bean — starts at 1,350 metres. That matters because of what altitude does to a coffee cherry. Cooler air slows the cherry down, the seed takes longer to mature, and it develops more density and more sugar. Density and sugar are where a cup gets its acidity, its sweetness and its range.",
    kicker: "It is the one quality claim on this page you can check without tasting anything.",
    points: [
      {
        title: "Eight designated regions",
        body: "Anacafé, Guatemala's national coffee association, recognises eight distinct growing regions. Each has its own altitude band, soil and rainfall — and each tastes like it.",
      },
      {
        title: "Graded by elevation",
        body: "SHB is an altitude classification, not a taste score. It is a fact about where a coffee grew: it either clears 1,350 metres or it does not.",
      },
      {
        title: "Volcanic and highland soils",
        body: `${Spell(VOLCANIC_COUNT)} of the eight regions sit on volcanic soil. The other ${spell(HIGHLAND_COUNT)} are highland — the limestone and clay-mineral ground that gives the north and east their heavier body.`,
      },
    ],
  },

  regions: {
    label: "What goes into the blend",
    heading: "Eight regions, one bag.",
    lede: `The blend draws from all eight. Listed by altitude, highest first. ${Spell(FULLY_SHB_COUNT)} of the eight sit entirely above 1,350 metres — Guatemala's SHB line — and the other ${spell(STRADDLE_SHB_COUNT)} straddle it, with their higher slopes clearing it.`,
    columns: { region: "Region", altitude: "Altitude", character: "In the cup" },
    soil: { volcanic: "Volcanic", highland: "Highland" },
    shbFull: "Entirely SHB",
    shbPartial: "Straddles the SHB line",
    footnote:
      "Altitude bands are the published figures for each designated region, not lot-specific measurements.",
    items: {
      huehuetenango: {
        name: "Highland Huehuetenango",
        character:
          "Bright, wine-like acidity with stone fruit. The highest and driest of the eight.",
      },
      acatenango: {
        name: "Acatenango Valley",
        character: "Clean and balanced, cocoa-leaning, with a firm acidity behind it.",
      },
      sanmarcos: {
        name: "Volcanic San Marcos",
        character: "Floral and sweet. The wettest region, and the first to flower each year.",
      },
      fraijanes: {
        name: "Fraijanes Plateau",
        character: "Pronounced acidity and clear sweetness, grown on volcanic pumice.",
      },
      antigua: {
        name: "Antigua Coffee",
        character: "Full body, cocoa, a quiet spice. The most recognised name in Guatemalan coffee.",
      },
      atitlan: {
        name: "Traditional Atitlán",
        character: "Citrus acidity and a floral lift, from lake-facing volcanic slopes.",
      },
      oriente: {
        name: "New Oriente",
        character: "Rounded and full-bodied, chocolate-leaning. Clay-mineral ground, not volcanic.",
      },
      coban: {
        name: "Rainforest Cobán",
        character: "Even and gentle, with a soft fruit note. Cloud, constant rain and limestone.",
      },
    },
  },

  line: {
    label: "The coffees",
    heading: "Three coffees. One account.",
    lede: "One blend to pour all day, two single origins to rotate. Your menu gets somewhere to go without a second supplier to manage.",
    /** Shown in the blend's Department row, which has no single answer. */
    allRegions: "All eight",
    specLabels: {
      role: "On your bar",
      region: "Anacafé region",
      department: "Department",
      altitude: "Altitude",
      process: "Process",
      varietal: "Varietal",
      roast: "Roast",
    },
    items: {
      "ocho-blend": {
        name: "Eight-Region Blend",
        sub: "All eight designated regions",
        role: "House & espresso",
        body: "Every one of Guatemala's eight coffee regions in a single coffee. Built to hold together as espresso and to stay recognisable through milk — the one you pour when somebody just wants a good cup, all day, without thinking about it.",
        process: pending("process split across the blend components"),
        varietal: pending("varietal mix"),
        roast: pending("roast level, and whether espresso- and filter-profiled versions both exist"),
      },
      "pueblo-nuevo-vinas": {
        name: "Pueblo Nuevo Viñas",
        sub: "Santa Rosa",
        role: "Filter & guest slot",
        body: "A single-origin lot from the department of Santa Rosa, on the southern volcanic chain running down toward the Pacific. A rotating coffee for the filter bar and the guest slot, where a menu earns its variety.",
        process: pending("washed, natural or honey"),
        varietal: pending("varietal"),
        roast: pending("roast level"),
      },
      "santa-rosalia": {
        name: "Santa Rosalía de Mármol",
        sub: "Zacapa",
        role: "Filter & guest slot",
        body: "A single-origin lot from Zacapa, in the dry eastern highlands — clay-mineral ground rather than volcanic, which is where the east gets its heavier body. The second of the two rotating origins.",
        process: pending("washed, natural or honey"),
        varietal: pending("varietal"),
        roast: pending("roast level"),
      },
    },
  },

  lots: {
    label: "Traceability",
    heading: "Two lots most US menus never reach.",
    lede: "Antigua and Huehuetenango are on plenty of American bar menus, and deservedly. Santa Rosa and Zacapa are not — the buying routes simply run elsewhere. These are the two we put our name on, and the two we can tell you the most about.",
    shbUnknown: "SHB status pending altitude",
    altitudePending: pending("lot altitude in metres"),
    regionPending: pending(
      "which of the eight Anacafé regions this lot is designated as — inferring it from the department is a guess, and the wrong region is the error a knowledgeable buyer catches",
    ),
    altitudeNote:
      "Lot altitude is the number that makes this concrete, so it is not going on the page until it is confirmed.",
    producerLabel: "Producer",
    /* Keyed per lot: a shared string here previously rendered Santa Rosalía's
       naming question on the Pueblo Nuevo Viñas card too, which is precisely
       the kind of detail a buyer reading closely would notice. */
    producerPending: {
      "pueblo-nuevo-vinas": pending("producer or finca name for this lot"),
      "santa-rosalia": pending(
        "producer or finca name — and whether 'Santa Rosalía de Mármol' is the farm, the community or the mill",
      ),
    } as Record<string, string>,
  },

  roasting: {
    label: "Freshness, stated plainly",
    heading: "Roasted where it grew. Dated on every bag.",
    body: "Here is the honest version, because you are going to ask it anyway. We roast in Guatemala and ship north, so your coffee spends a few days in transit that a coffee roasted across town would not.",
    body2:
      "What you get in exchange: the roast is set by the people who cup the green, at the source, against the lot in front of them. Nothing is roasted to sit in a warehouse — we roast against your delivery date. And every bag carries the day it was roasted, so you are never guessing how old a coffee is.",
    items: [
      {
        title: "Roast date on every bag",
        body: "The actual date, not a 'best by' standing in for one.",
      },
      {
        title: "Roasted to order",
        body: "Against your delivery date, not into a warehouse to wait for an order.",
      },
      {
        title: "Published transit window",
        body: pending(
          "real door-to-door transit time in days — publish it so a buyer can plan around it",
        ),
      },
      {
        title: "Degassing valve bags",
        body: pending("bag construction, and whether every size carries a one-way valve"),
      },
    ],
  },

  how: {
    label: "Getting started",
    heading: "Four steps to a Guatemalan line on your bar.",
    steps: [
      {
        title: "Tell us what you pour",
        body: "The form takes about two minutes: your volume, where you are, and which of the three you want to taste.",
      },
      {
        title: "Cup the samples",
        body: "We send the coffees you picked. Cup them on your own equipment, with your own water, next to what you already serve. That is the only comparison that means anything.",
      },
      {
        title: "Dial in",
        body: "Each lot ships with a recipe card — dose, yield, time, temperature — as a starting point rather than an instruction. Your grinder and your bar will move it.",
      },
      {
        title: "Set your cadence",
        body: "Pick your bag size and how often you want it. Reorder by email, and we roast against the delivery date.",
      },
    ],
  },

  cafes: {
    label: "What an account looks like",
    heading: "The commercial detail, up front.",
    lede: "No quote-form gymnastics to find out the basics. Where a number is still pending it says so, rather than sending you to a sales call to discover it.",
    rows: [
      { term: "Minimum order", detail: pending("MOQ, in lb or in bags") },
      { term: "Bag sizes", detail: pending("wholesale and retail bag sizes offered") },
      { term: "Lead time", detail: pending("order to arrival, in days") },
      { term: "Freight", detail: pending("who pays, and any free-freight threshold") },
      { term: "Pricing", detail: pending("price per lb, and the volume breaks") },
      { term: "Reordering", detail: "By email, to a person who knows your account." },
      {
        term: "Dial-in support",
        detail: "A recipe card with every lot, and someone to talk to when a coffee moves on you.",
      },
      {
        term: "Certifications",
        detail: pending(
          "organic / Rainforest Alliance / Fair Trade, or none — 'none' is a fine answer, an invented one is not",
        ),
      },
    ],
    multiTitle: "Running more than a few locations?",
    multiBody:
      "Consistency across bars and a contract price are a different conversation from a first sample box. Tell us in the form and we will start there instead.",
  },

  faq: {
    label: "Straight answers",
    heading: "What cafés ask us first.",
    items: [
      {
        q: "We already work with a roaster.",
        a: "Most cafés we speak to do, and this is not a pitch to replace them. One blend and two rotating origins sit alongside what you already pour and give your menu somewhere to go — a guest slot, a seasonal filter, a second espresso option. What happens after you have tasted it is entirely your call.",
      },
      {
        q: "How consistent is it, lot to lot?",
        a: "The blend is built to a profile, so it holds across the year. The single origins are seasonal by nature — they change as the harvest changes, and we tell you what moved rather than pretending nothing did. Guatemala's harvest runs roughly December through April.",
      },
      {
        q: "What is the minimum order?",
        a: pending("MOQ — answer this plainly here, it is the second thing every buyer asks"),
      },
      {
        q: "Who handles customs and freight?",
        a: pending(
          "importer of record, FDA food facility registration, Prior Notice and FSVP — a wholesale buyer will ask who carries this, and the answer wants to be 'we do, it arrives as a delivery'",
        ),
      },
      {
        q: "Do you offer decaf?",
        a: pending("decaf availability, and the decaffeination method if so"),
      },
      {
        q: "Can we sell retail bags on our shelf?",
        a: pending(
          "retail bag availability, whether they can carry the café’s own label, and the wholesale/retail split",
        ),
      },
      {
        q: "Is there territory exclusivity?",
        a: pending("whether a café can be the only account pouring these in its area"),
      },
    ],
  },

  form: {
    label: "Samples",
    heading: "Get the three coffees on your cupping table.",
    body: "Tell us what you pour and we will come back with samples and pricing. There is no account to open, and nothing automatic after this — a person reads it and replies.",
    optional: "optional",
    submit: "Request samples & pricing",
    submitMulti: "Start a multi-location conversation",
    submitting: "Sending...",
    fields: {
      name: "Your name",
      cafe: "Café or business name",
      email: "Work email",
      phone: "Phone",
      city: "City and state",
      locations: "How many locations",
      volume: "Coffee you go through a month",
      products: "Which would you like to try",
      message: "Anything else",
    },
    placeholders: {
      city: "Portland, OR",
      message: "What you pour now, what you are looking for, when you want it.",
    },
    help: {
      city: "We ask because it sets your freight, not to build a mailing list.",
      products: "Pick as many as you want.",
    },
    locations: {
      "1": "1 location",
      "2-3": "2-3 locations",
      "4-10": "4-10 locations",
      "10+": "More than 10",
    },
    volume: {
      "under-20": "Under 20 lb",
      "20-50": "20-50 lb",
      "50-150": "50-150 lb",
      "150-plus": "150 lb or more",
      unsure: "Not sure yet",
    },
    errors: {
      summary: "Something above needs fixing before this can send.",
      network:
        "That did not send. Your answers are still here — try again, or use the email link below.",
      required: "This one is required.",
      nameShort: "Please give us a name we can reply to.",
      emailInvalid: "That email address does not look right.",
      cityShort: "City and state, so we can work out freight.",
      productsEmpty: "Pick at least one coffee to try.",
      tooLong: "That is longer than the form accepts.",
    },
    successTitle: "That is with us.",
    successBody:
      "We will come back to you with samples and pricing. If you would rather talk it through, just reply to that email — it reaches a person.",
    successReset: "Send another",
    fallbackTitle: "We could not send that from here.",
    fallbackBody:
      "Nothing is lost — your answers are in the email below, ready to go. Open it, hit send, and we will pick it up from there.",
    fallbackCta: "Open prefilled email",
    fallbackSubject: "Wholesale enquiry",
  },

  footer: {
    tagline: "Roasted in Guatemala. Shipped to US cafés.",
    regionsTitle: "The eight regions",
    contactTitle: "Get in touch",
    rights: "All rights reserved.",
    builtNote:
      "Prices, minimums and transit times are confirmed in writing before any order.",
  },
} as const;

export type Copy = typeof copy;
