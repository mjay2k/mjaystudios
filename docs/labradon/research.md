# Labradon website research and implementation

Reviewed October 2, 2026. Preview destination: https://mjaystudios.com/labradon.

## Verified company information

- Name: LabraDon Properties LLC.
- Founder: Seth French; United States Marine Corps veteran. Company named for Labrador Donnie.
- Location and focus: Hampton Roads, Virginia; long-term rentals, turnovers, renovations, cleaning, maintenance and property-owner/manager support.
- Phone: (757) 276-1715, verified on company pages.
- Email: support@labradonproperties.com, visible in company promotional assets and the Claude draft.
- Services: cleaning, make-ready repairs, paint, flooring, drywall, light carpentry, fixture/door updates, debris removal, exterior/property care, seasonal work, vendor coordination.
- Gallery: a documented five-day apartment turnover and a Chesapeake home turnover for Keyrenter Property Management of Hampton Roads. Five days is a project example, never a general promise.
- Linked capabilities PDF visually reviewed in Adobe: turnkey property services, renovations, unit turnovers, facility support; one point of contact; insurance; OSHA-trained workforce; local coverage and strategic partnerships. Browser download did not complete, so the source link is preserved. Exact EPA RRP and OSHA 30 claims in the Claude draft are not verified and were omitted.

## Source inventory

Original company pages:

- https://labradonllc.com/
- https://labradonllc.com/about/
- https://labradonllc.com/resources/
- https://labradonllc.com/unit-turnover-services/
- https://labradonllc.com/special-condition-cleanup/
- https://labradonllc.com/project-gallery/
- https://labradonllc.com/contact/
- Capabilities: https://acrobat.adobe.com/id/urn:aaid:sc:US:cc6899be-affa-4654-802c-7be9d83c86f0
- Draft: https://claude.ai/artifact/57UkKcTFwUGCXQKutmypr3

39 public source assets downloaded into public/labradon/assets with provenance recorded in asset-manifest.json. Rendered content and image inventories from all eight primary source pages are saved in source-content.json. Original logo and real project photos used. Generated flyers and the AI interior named ChatGPT-Image-Jan-20-2026 were archived but excluded from the displayed project/hero imagery. Generated promotional badge and collage also excluded. Optimized WebP versions are in public/labradon/images; originals remain available.

Gallery mapping, matching published sequence:

- Apartment kitchen: IMG_8600 / IMG_9584 and IMG_8594 / IMG_9581.
- Apartment living: Better-Entrance-After-2 / IMG_9568.
- Apartment bedroom: IMG_8611 / IMG_9572.
- Chesapeake bedrooms: IMG_7778 / IMG_9808; IMG_7780 / IMG_9796; IMG_7781 / IMG_9812.
- Chesapeake living: IMG_7734 / IMG_9813; IMG_9814 is an additional finished view.
- Chesapeake bath: IMG_7768 / IMG_9807.
- IMG_9297: founder/team working photo.
- 721F1D2D: supplied turnover-page marketing photography, used as direction 01's lifestyle hero with descriptive alt text. It is not labeled as a documented LabraDon project.
- IMG_9813: documented Chesapeake project image, used as direction 02's hero.

## Competitor findings

Jerry Harris: https://jerryharrisremodeling.com/

Homepage leads with extensive customer review content, company history (since 1985), license/BBB claims, a five-year workmanship warranty, service categories and project stories. Strength: substantial evidence and history. Opportunity for Labradon: faster comprehension for rental managers, an earlier display of the relevant work, less content before the visitor understands the offering. No competitor assets or testimonials reused.

VB Homes: https://www.vbhomesliving.com/

Luxury custom-home and remodeling positioning; image-led presentation, history since 1988, testimonials and gallery. Contact form asks for inquiry type, address, email and message; includes a resume upload field. Strength: premium imagery and established history. Opportunity for Labradon: service relevance, clearer separation of visitor intent, shorter staged intake. No claim that Labradon has a comparable luxury portfolio.

The competitors are design references and adjacent operators, not exact rental-turnover equivalents. Their proven credentials cannot be duplicated through design. Conversion superiority requires actual post-launch evidence.

## Industry research and implications

Harvard JCHS, Improving America's Housing 2025:
https://www.jchs.harvard.edu/press-releases/remodeling-soars-new-heights-industry-struggles-address-labor-shortages-and-urgent

The study identifies older housing, fragmented service delivery and trade-labor constraints. Implication (our inference): practical property care and coordination are credible messages. National research is not a local demand estimate and does not justify new unverified service promises.

NAR/NARI, 2025 Remodeling Impact Report:
https://www.nar.realtor/press-releases/top-remodeling-projects-for-homeowner-satisfaction-and-cost-recovery-revealed-in-nar-report
Report: https://www.nar.realtor/sites/default/files/2025-04/2025-remodeling-impact-report_04-09-2025.pdf

Painting is among agents' recommended pre-sale improvements. Implication (our inference): a pre-listing preparation path fits Labradon's published services. No universal ROI percentages or home-value promises are advertised.

## Concepts and recommendation

1. The Property Standard (/labradon): editorial serif, deep black hero, real color photography, personal founder story, audience routing. Recommended main brand foundation.
2. The Operating Partner (/labradon/partner): direct sans-serif typography, split architectural layout, services grid, transparent vacancy illustration, manager-focused CTA. Recommended campaign direction for recurring manager acquisition.

Shared: real work journal, before/after toggle, project photo modal, service detail disclosure, FAQ, mobile call/CTA, three-step qualified inquiry preview. Inquiry never posts, stores or emails information; completion explicitly says no information submitted/saved. No fake success or artificial reviews. Phone/email links are functional.

## Launch roadmap

- Confirm credentials, insurance and intended priority customers.
- Approved project descriptions, reviews and photo rights; better landscape photography.
- Approved inquiry inbox/CRM, spam protection, delivery/error handling and privacy policy.
- Dedicated substantial service/search pages, accurate local business metadata, and conversion analytics after client approval.
- Measure qualified inquiry rate, walkthrough rate, close rate, average project value and recurring accounts; compare acquisition cohorts or run a controlled experiment before claiming superior conversion.

Preview routes are noindex to avoid duplicating the client's production search presence. The current preview is published on the existing MJay Studios Vercel project; no Sites hosting is used.

## Validation

- Scoped ESLint and TypeScript checks passed.
- Next.js production build passed, including all four new preview routes.
- Browser checks: before/after state, project gallery, all three inquiry steps, honest completion, preselected manager inquiry, service accordion and mobile menu.
- Vacancy calculator: default $1,800 / 30 × 5 days × 12 turns = $3,600; minimum $500 / 30 × 1 × 1 rounds to $17.
- Responsive checks at 390px and 320px, no horizontal overflow; desktop checked at the browser's normal 1280px viewport.
- Sticky header was corrected by isolating the preview from the portfolio shell's overflow behavior.
- Production deployment uses the repository's already configured GitHub → Vercel connection.
