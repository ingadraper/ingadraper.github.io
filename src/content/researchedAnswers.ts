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
            'A plain-English explanation of North Carolina’s due diligence fee, when buyers get credit for it, when they can lose it, and why the deadline matters.',
        answer:
            'In North Carolina, the due diligence fee is an optional amount negotiated with the seller. It pays for your right to cancel during an agreed period. The fee is usually credited back if you close and lost if you cancel. A failed loan or an appraisal that comes in low does not automatically protect the money.',
        category: 'Buying',
        datePublished: '2026-09-02',
        dateModified: '2026-09-03',
        needsVerification: false,
        sections: [
            {
                heading: 'What you are paying for',
                body: 'The standard NC REALTORS/NC Bar contract says the fee pays for your right to cancel for any reason during the agreed due diligence period. State law does not require this fee or earnest money, which is a separate deposit usually held in a trust account. The seller can ask for either payment, and your signed contract controls what happens to the money.',
            },
            {
                heading: 'When you get credit for the fee and when you lose it',
                body: 'If you close, the fee is credited toward the purchase. If you cancel, you generally lose it. The North Carolina Real Estate Commission warns that a loan denial, low appraisal, or bad inspection does not automatically create a refund. The signed contract controls, and there are limited exceptions, such as certain seller breaches.',
            },
            {
                heading: 'Why the deadline matters',
                body: 'The standard contract does not give you an automatic right to cancel because the loan fails or the appraisal comes in low. You need enough time to inspect the home, negotiate repairs, finish the loan and appraisal work, arrange insurance, and check ownership records. An added contract form can change those rights, so read the documents you sign.',
                bullets: [
                    'Schedule the general inspection and any specialist visits as soon as the contract is signed.',
                    'Ask the lender how long the loan and appraisal work will take before you agree to a deadline.',
                    'Get insurance questions answered before your right to cancel expires.',
                    'Track the exact date and time in the contract. Do not rely on a general calendar reminder.',
                ],
            },
        ],
        faqs: [
            {
                question: 'Is the due diligence fee the same as earnest money?',
                answer: 'No. They are two separate payments with different rules. The due diligence fee usually goes directly to the seller. Earnest money is a separate deposit usually held in a trust account. Read the contract before assuming that either payment will come back if you cancel.',
            },
            {
                question: 'Does a failed loan approval automatically refund the fee?',
                answer: 'No. The North Carolina Real Estate Commission says a loan denial does not, by itself, make the due diligence fee refundable. Talk with your lender and agent about the timing and the amount of money at risk before making the offer.',
            },
            {
                question: 'Is there a standard due diligence fee?',
                answer: 'No. The amount and the length of the due diligence period are negotiated with each offer. The condition of the home, how quickly you can complete inspections and loan work, other offers, and how much money you are willing to risk all matter.',
            },
            {
                question: 'Is a due diligence fee required by North Carolina law?',
                answer: 'No. The North Carolina Real Estate Commission says state law does not require either payment. A seller can still ask for one or both as part of the deal. Once everyone signs, the contract sets the rules.',
            },
        ],
        related: ['first-time-home-buyer-charlotte', 'verify-zoning-before-buying-charlotte-area'],
    },
    {
        slug: 'verify-school-assignment-charlotte-lake-norman',
        question: 'How do I verify the school assignment for a Charlotte-area address?',
        title: 'How to Verify a School Assignment in Charlotte and Lake Norman',
        metaDescription:
            'Use the official school-district tool for the full street address and the correct school year instead of relying on a property listing or ZIP code.',
        answer:
            'First find the school district for the full street address, then use that district’s official lookup tool for the year the student will attend. Lake Norman spans four counties and several districts, each with its own system. A property listing, ZIP code, mailing city, or current school assignment is not a guarantee for a future year.',
        category: 'Relocation',
        datePublished: '2026-09-02',
        dateModified: '2026-09-03',
        needsVerification: false,
        sections: [
            {
                heading: 'Start with the school district, not the property listing',
                body: 'Lake Norman spans Catawba, Iredell, Lincoln, and Mecklenburg counties. The county or mailing city may not tell you the school district. Confirm the district for the street address, then use that district’s official enrollment or school-finder tool. Each local district has its own website and process.',
            },
            {
                heading: 'Verify the exact address and year',
                body: 'CMS labels its published maps by school year and warns that boundaries are subject to change. Verify the street address for the year the student will attend, then confirm any reassignment, magnet, transportation, or enrollment question directly with the district.',
                bullets: [
                    'Use the complete street address, not the subdivision or ZIP code.',
                    'Check the school year that matches the planned move date.',
                    'Ask the district about approved or proposed boundary changes.',
                    'Treat magnet, choice, and reassignment programs separately from the school normally assigned to the address.',
                ],
            },
            {
                heading: 'Decide what matters to your family',
                body: 'An agent can help you find the official district tools, but should not rank schools or push you toward or away from a community. Review programs, transportation, district information, and independent state data, then decide what fits your family.',
            },
            {
                heading: 'Check the year after the move, too',
                body: 'Iredell-Statesville says possible 2027–28 boundary changes connected with Weather’s Creek High and Parkertown Elementary may affect several current areas, including Lake Norman High. CMS also changes boundaries through a public process. Check both the current assignment and any announced changes for the year you need.',
            },
        ],
        faqs: [
            {
                question: 'Can I rely on the school shown in a property listing?',
                answer: 'No. Listing data can be stale or incorrect. Confirm the assignment for the exact address and relevant school year with the governing district.',
            },
            {
                question: 'Does a Cornelius or Mooresville mailing address identify the school district?',
                answer: 'Not reliably. Mailing addresses, town boundaries, and school-district boundaries do not always match. Use the district’s official tool for the full street address.',
            },
        ],
        related: ['relocating-to-charlotte', 'charlotte-area-neighborhood-comparison'],
    },
    {
        slug: 'lake-norman-waterfront-property-checks',
        question: 'What should I verify before buying Lake Norman waterfront property?',
        title: 'Lake Norman Waterfront Property: Dock, Shoreline, Flood, and Lot Checks',
        metaDescription:
            'Before buying a Lake Norman waterfront home, check the dock and shoreline records, flood information, septic or sewer service, well records, and deed or homeowners association (HOA) restrictions.',
        answer:
            'For the exact property, check Duke Energy’s dock and shoreline approvals, local building and land-use rules, FEMA flood information, septic or sewer capacity, well records, and deed or homeowners association (HOA) restrictions. A nearby dock does not prove that you can build, replace, or enlarge one, and an old septic permit may not support more bedrooms.',
        category: 'Buying',
        datePublished: '2026-09-02',
        dateModified: '2026-09-03',
        needsVerification: false,
        sections: [
            {
                heading: 'Owning the lot does not mean you can change the shoreline',
                body: 'Duke Energy manages shoreline activities across the Catawba-Wateree lake system. Docks, shoreline walls, digging, and other work may need Duke’s written approval. Ask the seller for every approval, drawing, transfer record, and letter connected with the dock or shoreline.',
            },
            {
                heading: 'The city or county may have more rules for the lot',
                body: 'Local rules still apply to the land above Duke Energy’s project boundary. In Cornelius, for example, the required natural area between a home and the lake can differ by neighborhood or lot. Ask local staff about where you can build, how much of the lot can be covered, water-quality rules, septic or sewer service, and flood requirements.',
                bullets: [
                    'Compare the property survey and recorded lot map with what is actually built.',
                    'Make sure the dock and shoreline records match the structures that are there now.',
                    'Check FEMA flood information and ask about prior water intrusion and insurance claims.',
                    'Read the deed and HOA rules for private restrictions in addition to government rules.',
                ],
            },
            {
                heading: 'A neighboring dock is not an approval',
                body: 'Duke reviews shoreline conditions and each proposed project. The answer can differ from one cove or lot to the next. If changing the dock or shoreline matters to you, ask Duke about the exact plan and get a written answer before you buy.',
            },
            {
                heading: 'The county keeps the septic and well records',
                body: 'Lake Norman touches Catawba, Iredell, Lincoln, and Mecklenburg counties. Each county keeps its own septic and private-well records. Make sure the permit matches the address, home, number of bedrooms, and any additions. An old permit does not tell you the current condition, so use the right inspection or water test too.',
            },
        ],
        faqs: [
            {
                question: 'Does an existing dock prove it was permitted?',
                answer: 'No. Ask for the approval and related records, then confirm them with Duke Energy. The fact that a dock is there does not prove it has current approval or that Duke will approve changes later.',
            },
            {
                question: 'Does waterfront property always require flood insurance?',
                answer: 'No. The answer depends on the exact lot and home. Check the current FEMA map, ask the lender what it requires, review any elevation information, and get an insurance quote for that specific house.',
            },
            {
                question: 'Can I assume I can replace a dock with a larger one?',
                answer: 'No. Replacing or enlarging a dock may require a new approval. Ask about the size and location you want before you buy the property.',
            },
            {
                question: 'Does an old septic permit prove the system supports my plans?',
                answer: 'No. Make sure the permit matches the current home, number of bedrooms, additions, and address. Ask the county for its records, then have the system evaluated before you assume it can support an addition, more bedrooms, or a rental.',
            },
        ],
        related: ['buying-investment-property-lake-norman', 'verify-zoning-before-buying-charlotte-area'],
    },
    {
        slug: 'verify-zoning-before-buying-charlotte-area',
        question: 'How do I verify zoning before buying in the Charlotte area?',
        title: 'How to Verify Zoning Before Buying a Charlotte-Area Property',
        metaDescription:
            'How to ask the right city or county whether a Charlotte-area property can legally be used, rented, expanded, or changed the way you plan.',
        answer:
            'Ask the city, town, or county responsible for the exact address whether your plan is allowed. Describe what you want to do, then ask about extra rules, prior approvals, building distances, permits, and open violations. A mailing address, the seller’s statement, or what a neighbor is doing is not an official answer.',
        category: 'Local guide',
        datePublished: '2026-09-02',
        dateModified: '2026-09-03',
        needsVerification: false,
        sections: [
            {
                heading: 'First find the right city, town, or county office',
                body: 'The city in a mailing address may not be the government that makes the land-use rules. Some properties are outside town limits, and some towns control planning just beyond their limits. Start with the county property record and the official government map, then contact the office responsible for that address.',
            },
            {
                heading: 'Tell the planning office exactly what you want to do',
                body: 'A zoning label by itself is not enough. Give the planning staff the full address or property identification number and describe your plan in ordinary words. Mention how long you want to rent it, whether you will run a business there, add a separate structure, expand the building, change parking, add a sign, or work near the shoreline.',
                bullets: [
                    'The property identification number and the government responsible for the address.',
                    'The zoning label and any extra layer of rules that applies to the area.',
                    'Whether your exact plan is allowed, allowed only with approval, or not allowed.',
                    'Any permits, inspections, parking rules, and required distance from property lines.',
                    'Open violations, special approvals already tied to the property, and deed or homeowners association (HOA) restrictions.',
                ],
            },
            {
                heading: 'Get the answer in writing when your plan depends on it',
                body: 'Huntersville offers a zoning verification letter that explains the rules and approval history for a property. Other local governments have their own letters or permit processes. If the purchase only works because of a planned use, keep the written government answer with your closing records.',
            },
        ],
        faqs: [
            {
                question: 'Is a current use proof that the same use is permitted?',
                answer: 'No. The use may be grandfathered under an older rule, allowed by a special approval, or happening without the required permission. Ask the responsible city, town, or county about that address and the exact use you have in mind.',
            },
            {
                question: 'Does zoning override an HOA restriction?',
                answer: 'No. Local government rules and private deed or HOA restrictions are separate. The city or county can allow a use while the recorded private rules still prohibit it.',
            },
            {
                question: 'Can my agent give me a final zoning opinion?',
                answer: 'An agent can help you find the records and prepare questions. The city, town, or county planning office should confirm the government rules. Ask a North Carolina attorney to explain private restrictions or legal questions when needed.',
            },
        ],
        related: ['short-term-rental-rules-charlotte-area', 'lake-norman-waterfront-property-checks'],
    },
];
