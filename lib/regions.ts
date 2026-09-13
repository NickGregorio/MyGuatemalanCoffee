/**
 * Guatemala's eight coffee regions, as designated by Anacafé (the national
 * coffee association). These are real, published designations — not marketing
 * groupings invented for this site.
 *
 * Structure and numbers live here; every reader-facing string lives in
 * copy.ts, keyed by RegionId. Same split as the sibling projects.
 *
 * ⚠️ VERIFY BEFORE LAUNCH — the altitude bands below are the commonly
 * published figures and they are good enough to design a layout against. They
 * are NOT good enough to publish unchecked. Re-read them off anacafe.org and
 * correct any that have drifted. A café buyer who knows coffee will check
 * these, and a wrong number here costs more credibility than the whole page
 * earns.
 */

export type RegionId =
  | "acatenango"
  | "antigua"
  | "atitlan"
  | "coban"
  | "fraijanes"
  | "huehuetenango"
  | "oriente"
  | "sanmarcos";

export type Region = {
  id: RegionId;
  /** Metres above sea level, the published band for the region. */
  altMin: number;
  altMax: number;
  /** Volcanic soil, or the highland/limestone and clay-mineral regions. */
  soil: "volcanic" | "highland";
};

/* Ordered by the top of the altitude band, highest first — so the section
   reads as a ranking and the SHB line (1,350 m) falls in a meaningful place
   rather than an alphabetical one. */
export const REGIONS: Region[] = [
  { id: "huehuetenango", altMin: 1500, altMax: 2000, soil: "highland" },
  { id: "acatenango", altMin: 1300, altMax: 2000, soil: "volcanic" },
  { id: "sanmarcos", altMin: 1300, altMax: 1800, soil: "volcanic" },
  { id: "fraijanes", altMin: 1400, altMax: 1800, soil: "volcanic" },
  { id: "antigua", altMin: 1500, altMax: 1700, soil: "volcanic" },
  { id: "atitlan", altMin: 1500, altMax: 1700, soil: "volcanic" },
  { id: "oriente", altMin: 1300, altMax: 1700, soil: "highland" },
  { id: "coban", altMin: 1300, altMax: 1500, soil: "highland" },
];

/**
 * Guatemala's top grade. SHB = Strictly Hard Bean, meaning grown at or above
 * this elevation. It is an altitude classification, not a taste score — which
 * is precisely why it is checkable and worth putting on the page.
 */
export const SHB_METRES = 1350;

export const REGION_COUNT = REGIONS.length;
