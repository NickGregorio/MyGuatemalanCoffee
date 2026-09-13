import type { MetadataRoute } from "next";

/**
 * PRE-LAUNCH GUARD — remove together with the `robots` block in app/layout.tsx.
 *
 * See the long comment there for why this exists. Both must come off in the
 * same commit; removing one and leaving the other still hides the site.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", disallow: "/" },
  };
}
