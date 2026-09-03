import type { AnswerPage } from './answers';

/**
 * Narrow, high-intent answers built from primary-source research checked on
 * September 2, 2026. The corresponding bibliography is in sources.ts.
 */
export const researchedAnswerPages: AnswerPage[] = [
    {
        slug: 'north-carolina-due-diligence-fee',
        question: 'How does the due diligence fee work in North Carolina?',
        title: 'North Carolina Due Diligence Fee: What Buyers Need to Know',
        metaDescription:
            'The North Carolina Real Estate Commission explains what the due diligence fee buys, when it is credited, and the limited situations in which it may be refunded.',
        answer:
            'In North Carolina, the due diligence fee pays the seller for the buyer’s negotiated right to terminate during the due diligence period. It is generally nonrefundable, including after a low appraisal or loan denial. If the purchase closes, the fee is credited to the buyer at closing.',
        category: 'Buying',
        datePublished: '2026-09-02',
        dateModified: '2026-09-02',
        needsVerification: false,
        sections: [
            {
                heading: 'What the fee actually buys',
                body: 'The North Carolina Real Estate Commission describes the fee as payment for the buyer’s right to terminate the contract for any reason or no reason during the negotiated due diligence period. The amount and length of that period are negotiable; there is no universal amount that is “normal” for every transaction.',
            },
            {
                heading: 'When the money comes back—and when it does not',
                body: 'The fee is credited to the buyer at closing. If the buyer terminates, it is generally nonrefundable. NCREC specifically warns that loan denial, a low appraisal, and dissatisfaction after inspections do not automatically create a refund right. Seller breach and certain express contract provisions can change the result, so the signed contract controls.',
            },
            {
                heading: 'Why the deadline matters',
                body: 'Inspections, specialist evaluations, repair negotiations, financing work, insurance review, and title questions all compete for the same negotiated period. A useful offer strategy budgets both the fee and enough calendar time to complete the investigations that matter for that property.',
                bullets: [
                    'Schedule general and specialist inspections immediately after contract formation.',
                    'Confirm lender and appraisal timing before proposing the deadline.',
                    'Get insurance questions answered while termination is still available.',
                    'Track the exact date and time in the signed contract rather than relying on a calendar reminder alone.',
                ],
            },
        ],
        faqs: [
            {
                question: 'Is the due diligence fee the same as earnest money?',
                answer: 'No. They are separate negotiated payments with different handling and refund rules under the North Carolina standard contract. Review the specific signed contract before assuming either payment will be returned.',
            },
            {
                question: 'Does a failed loan approval automatically refund the fee?',
                answer: 'No. NCREC states that loan denial does not itself make the due diligence fee refundable. Financing timing and risk should be discussed before the offer is submitted.',
            },
            {
                question: 'Is there a standard due diligence fee?',
                answer: 'No. The amount and the due diligence period are negotiated for each offer. Price, competition, property condition, investigation needs, and the buyer’s risk tolerance all matter.',
            },
        ],
        related: ['first-time-home-buyer-charlotte', 'verify-zoning-before-buying-charlotte-area'],
    },
    {
        slug: 'verify-school-assignment-charlotte-lake-norman',
        question: 'How do I verify the school assignment for a Charlotte-area address?',
        title: 'How to Verify a School Assignment in Charlotte and Lake Norman',
        metaDescription:
            'Use the current CMS boundary maps or Iredell-Statesville enrollment resources to verify school assignment for the exact property address rather than relying on a listing.',
        answer:
            'Verify schools with the district for the exact property address and school year. Charlotte-Mecklenburg Schools publishes current student-boundary maps, while Iredell-Statesville Schools verifies domicile during enrollment. A listing, neighborhood name, or nearby school is not authoritative, and assignments or boundaries can change.',
        category: 'Relocation',
        datePublished: '2026-09-02',
        dateModified: '2026-09-02',
        needsVerification: false,
        sections: [
            {
                heading: 'Start with the district, not the listing',
                body: 'Charlotte-area addresses can fall into different school systems, and a postal city does not necessarily identify the governing district. For Mecklenburg County, use Charlotte-Mecklenburg Schools’ current boundary resources. For an Iredell-Statesville address, use the district’s enrollment and domicile-verification process.',
            },
            {
                heading: 'Verify the exact address and year',
                body: 'CMS labels its published maps by school year and warns that boundaries are subject to change. Verify the street address for the year the student will attend, then confirm any reassignment, magnet, transportation, or enrollment question directly with the district.',
                bullets: [
                    'Use the complete street address, not the subdivision or ZIP code.',
                    'Check the school year that matches the planned move date.',
                    'Ask the district about approved or proposed boundary changes.',
                    'Treat choice, magnet, and reassignment programs separately from the base assignment.',
                ],
            },
            {
                heading: 'Keep the real-estate conversation objective',
                body: 'An agent can help identify the district tools and document the buyer’s stated criteria, but should not rank schools or steer a client toward or away from a community. Families can review district programs and independent state data, then decide which factors fit their needs.',
            },
        ],
        faqs: [
            {
                question: 'Can I rely on the school shown in a property listing?',
                answer: 'No. Listing data can be stale or incorrect. Confirm the assignment for the exact address and relevant school year with the governing district.',
            },
            {
                question: 'Does a Cornelius or Mooresville mailing address identify the school district?',
                answer: 'Not reliably. Postal addresses and municipal limits do not always match school-system boundaries. The district’s address-based process is the authoritative check.',
            },
        ],
        related: ['relocating-to-charlotte', 'charlotte-area-neighborhood-comparison'],
    },
    {
        slug: 'lake-norman-waterfront-property-checks',
        question: 'What should I verify before buying Lake Norman waterfront property?',
        title: 'Lake Norman Waterfront Property: Dock, Shoreline, Flood, and Lot Checks',
        metaDescription:
            'Before buying Lake Norman waterfront property, verify Duke Energy shoreline authorization, municipal setbacks and buffers, FEMA flood information, and private covenants for the exact parcel.',
        answer:
            'Before buying Lake Norman waterfront property, verify four separate records for the exact parcel: Duke Energy shoreline authorization, municipal zoning and watershed restrictions, FEMA flood information, and private covenants. Existing water access or a neighboring dock does not prove that a new dock, replacement, expansion, or shoreline project will be approved.',
        category: 'Buying',
        datePublished: '2026-09-02',
        dateModified: '2026-09-02',
        needsVerification: false,
        sections: [
            {
                heading: 'Lake use and land ownership are different questions',
                body: 'Duke Energy manages shoreline activities across the Catawba-Wateree reservoir system. Its permitting page lists private recreation facilities, shoreline stabilization, excavation, and other activities that require review. Ask for every permit, drawing, transfer record, and correspondence tied to the existing dock or shoreline work.',
            },
            {
                heading: 'The lot can have additional local limits',
                body: 'Town and county rules still apply above the project boundary. Cornelius, for example, states that lakefront buffers can differ by neighborhood and even by lot, and directs owners to the recorded plat and planning staff. Confirm zoning, setbacks, watershed limits, impervious-area limits, septic or sewer status, and any floodplain requirements for the parcel.',
                bullets: [
                    'Compare the survey and recorded plat with the improvements on the ground.',
                    'Verify that dock and shoreline records match the current structures.',
                    'Check FEMA flood information and ask about prior water intrusion and insurance claims.',
                    'Read HOA covenants for private restrictions beyond government rules.',
                ],
            },
            {
                heading: 'A neighboring dock is not an approval',
                body: 'Duke’s Shoreline Management Plan uses shoreline classifications and project-specific review. Conditions can differ from one cove or parcel to the next. Make the intended use part of due diligence and obtain written answers from the relevant authority before relying on a future improvement.',
            },
        ],
        faqs: [
            {
                question: 'Does an existing dock prove it was permitted?',
                answer: 'No. Request the authorization and related records, then verify them with Duke Energy. Physical presence alone does not establish current authorization or approval for later work.',
            },
            {
                question: 'Does waterfront property always require flood insurance?',
                answer: 'No single answer applies to every parcel. Review the current FEMA map, lender requirements, elevation information, and an insurance quote for the exact structure before deciding.',
            },
            {
                question: 'Can I assume I can replace a dock with a larger one?',
                answer: 'No. Replacement or expansion can require project-specific approval under current shoreline rules. Verify the proposed dimensions and location before purchase.',
            },
        ],
        related: ['buying-investment-property-lake-norman', 'verify-zoning-before-buying-charlotte-area'],
    },
    {
        slug: 'verify-zoning-before-buying-charlotte-area',
        question: 'How do I verify zoning before buying in the Charlotte area?',
        title: 'How to Verify Zoning Before Buying a Charlotte-Area Property',
        metaDescription:
            'Verify the parcel, jurisdiction, zoning district, permitted use, overlays, conditions, and private restrictions before relying on a planned use for Charlotte-area property.',
        answer:
            'Verify zoning at the parcel level with the government that has jurisdiction. Identify the parcel and zoning district, then confirm the proposed use, overlays, conditional approvals, setbacks, permits, and enforcement history in writing. A mailing address, current use, nearby property, or seller representation is not a zoning determination.',
        category: 'Local guide',
        datePublished: '2026-09-02',
        dateModified: '2026-09-02',
        needsVerification: false,
        sections: [
            {
                heading: 'First identify the authority',
                body: 'A Charlotte-area mailing address may sit in a town, city, county, or extraterritorial planning jurisdiction. Start with the parcel record and government map. Huntersville describes zoning as the legal instrument that regulates land use, building dimensions, height, and setbacks; Davidson uses legally equivalent planning areas rather than conventional zoning-district terminology.',
            },
            {
                heading: 'Ask about the proposed use—not just the color on a map',
                body: 'A zoning label is only the beginning. Give planning staff the exact parcel and a plain description of the intended use, including rental duration, home occupation, accessory structure, expansion, parking, signage, or shoreline work. Ask whether overlays, conditions, prior approvals, violations, or a permit process apply.',
                bullets: [
                    'Parcel identification number and governing jurisdiction',
                    'Current zoning or planning-area designation and overlays',
                    'Whether the exact proposed use is permitted, conditional, or prohibited',
                    'Required permits, inspections, setbacks, parking, and site standards',
                    'Open violations, conditional rezoning plans, and recorded private covenants',
                ],
            },
            {
                heading: 'Get a written record when the use matters',
                body: 'Huntersville offers a zoning verification letter that describes the district, applicable standards, conditional rezoning requirements, and compliance for a parcel. Other jurisdictions have their own verification or permit processes. When the investment depends on a use, preserve the written government response with the transaction file.',
            },
        ],
        faqs: [
            {
                question: 'Is a current use proof that the same use is permitted?',
                answer: 'No. A use can be legally nonconforming, conditionally approved, improperly established, or subject to facts not visible from the property. Ask the governing authority about the exact parcel and use.',
            },
            {
                question: 'Does zoning override an HOA restriction?',
                answer: 'No. Government approval and private covenants are separate layers. A use can satisfy zoning and still be prohibited by recorded restrictions.',
            },
            {
                question: 'Can my agent give me a final zoning opinion?',
                answer: 'An agent can help locate records and frame questions, but the governing planning department—and legal counsel when needed—should confirm a use on which the purchase depends.',
            },
        ],
        related: ['short-term-rental-rules-charlotte-area', 'lake-norman-waterfront-property-checks'],
    },
];
