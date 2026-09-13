import type { RegionId } from "./regions";

/**
 * The three coffees. Together they are a complete bar program from one
 * supplier: a blend to pour all day, and two single origins to rotate through
 * the filter and guest slot.
 *
 * Structure here; strings in copy.ts. PRODUCT_IDS feeds z.enum() in lead.ts so
 * the form's checkboxes and the validation schema cannot drift apart.
 */

export type ProductId = "ocho-blend" | "pueblo-nuevo-vinas" | "santa-rosalia";

export type Product = {
  id: ProductId;
  kind: "blend" | "single-origin";
  /**
   * Anacafé region this lot belongs to.
   *
   * ⚠️ TODO_CONFIRM for both single origins. Pueblo Nuevo Viñas sits in the
   * department of Santa Rosa, near the edge of the Fraijanes Plateau
   * designation; Zacapa reads as New Oriente. Both are inferences from the
   * department, NOT confirmed designations. Publishing the wrong Anacafé
   * region is exactly the error a knowledgeable buyer catches.
   */
  region: RegionId | null;
  /** Department, which we do know. Safe to publish. */
  department: string | null;
  /**
   * Lot altitude in metres. TODO_CONFIRM — this is the single number that
   * makes the altitude argument concrete for these two lots, and until it is
   * real the page shows a visible placeholder instead of a guess.
   */
  altM: number | null;
};

export const PRODUCTS: Product[] = [
  {
    id: "ocho-blend",
    kind: "blend",
    region: null,
    department: null,
    altM: null,
  },
  {
    id: "pueblo-nuevo-vinas",
    kind: "single-origin",
    region: null,
    department: "Santa Rosa",
    altM: null,
  },
  {
    id: "santa-rosalia",
    kind: "single-origin",
    region: null,
    department: "Zacapa",
    altM: null,
  },
];

export const PRODUCT_IDS = PRODUCTS.map((p) => p.id) as [ProductId, ...ProductId[]];

export const SINGLE_ORIGINS = PRODUCTS.filter((p) => p.kind === "single-origin");
