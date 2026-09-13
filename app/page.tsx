import { SiteHeader } from "@/components/site-header";
import { Hero } from "@/components/hero";
import { OriginCase } from "@/components/origin-case";
import { Regions } from "@/components/regions";
import { ProductLine } from "@/components/product-line";
import { Lots } from "@/components/lots";
import { RoastedAtOrigin } from "@/components/roasted-at-origin";
import { HowItWorks } from "@/components/how-it-works";
import { ForCafes } from "@/components/for-cafes";
import { Faq } from "@/components/faq";
import { LeadForm } from "@/components/lead-form";
import { Footer } from "@/components/footer";

/* Composition only. Every section owns its own copy and layout; this file is
   the running order and nothing else, so the shape of the argument is legible
   at a glance:

     hook -> why the origin -> proof -> the products -> the lots ->
     the honest weak point -> how easy it is -> the commercials ->
     objections -> ask.
*/
export default function Page() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <OriginCase />
        <Regions />
        <ProductLine />
        <Lots />
        <RoastedAtOrigin />
        <HowItWorks />
        <ForCafes />
        <Faq />
        <LeadForm />
      </main>
      <Footer />
    </>
  );
}
