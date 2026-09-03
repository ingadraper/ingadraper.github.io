/**
 * Answer pages.
 *
 * Each entry becomes one indexed URL that answers ONE question a real client asks.
 * The `answer` field is the extractable block: 40-60 words, self-contained, and
 * true when read with no surrounding context. That is what an answer engine lifts.
 *
 * VERIFICATION CONTRACT
 * ---------------------
 * `needsVerification: true` means this page asserts something jurisdiction-specific
 * (ordinance, HOA rule, tax treatment, permit process) that MUST be confirmed against
 * the primary source by a licensed person before publication. Placeholder text is
 * written to be true-but-general so nothing false ships if it is published early,
 * but these pages are NOT publication-ready until verified and dated. Production
 * builds exclude them unless INCLUDE_UNVERIFIED_ANSWERS=true is explicitly set for
 * a local review build.
 */

import { researchedAnswerPages } from './researchedAnswers';

export interface AnswerSection {
    heading: string;
    body: string;
    bullets?: string[];
}

export interface AnswerPage {
    slug: string;
    question: string;
    title: string;
    metaDescription: string;
    /** The 40-60 word extractable direct answer. Leads the page. */
    answer: string;
    category: 'Buying' | 'Selling' | 'Relocation' | 'Rental questions' | 'Local guide';
    datePublished: string;
    dateModified: string;
    needsVerification: boolean;
    verificationNote?: string;
    sections: AnswerSection[];
    faqs: { question: string; answer: string }[];
    related: string[];
}

const baseAnswerPages: AnswerPage[] = [
    {
        slug: 'short-term-rental-rules-charlotte-area',
        question: 'Can I run a short-term rental in the Charlotte area?',
        title: 'Short-Term Rental Rules in the Charlotte Area: What to Check First',
        metaDescription:
            'Short-term rental rules can change from one address to the next. Learn which local, homeowners association (HOA), deed, and insurance rules to check before you buy.',
        answer:
            'The answer depends on the exact address. Check the city or county rules, read the deed and homeowners association (HOA) restrictions, and ask an insurance agent whether the policy covers short-term guests. One can say no even if the others say yes, so get the answers in writing before you depend on rental income.',
        category: 'Rental questions',
        datePublished: '2026-09-02',
        dateModified: '2026-09-03',
        needsVerification: true,
        verificationNote:
            'Cornelius, Davidson, and unincorporated Iredell County have primary-source findings below. Charlotte, Huntersville, and Mooresville still require written parcel-level confirmation before publication because their public materials do not provide a single definitive STR answer.',
        sections: [
            {
                heading: 'Three different sets of rules can affect the answer',
                body: 'A city can allow short-term rentals while an HOA or insurance policy does not. You have to check all three.',
                bullets: [
                    'City or county rules: whether short stays are allowed at that address and whether you need a permit, registration, or inspection.',
                    'Deed and HOA restrictions: private neighborhood rules may limit rentals even when the government allows them.',
                    'Insurance: a regular homeowner policy may not cover paying guests, or it may require different coverage.',
                ],
            },
            {
                heading: 'The local rules are not the same everywhere',
                body: 'The current public records show why the exact address matters. Before buying, confirm which rule applies to that property:',
                bullets: [
                    'Cornelius: Land Development Code §5.3.44 requires a Transient Occupancy Permit for each residence, limits operation to one individual tenancy within a seven-consecutive-day period, and requires a local contact available 24 hours a day.',
                    'Davidson: its Planning Ordinance defines residential uses as long-term habitation and expressly excludes leasing or rental of less than one month. Ask Planning how a proposed short-term use is classified and whether it is available in that planning area.',
                    'Unincorporated Iredell County: the county says its 2023 STR zoning regulations have been under a court order that stopped enforcement pending final adjudication. Confirm the current enforcement status directly before relying on the regulation or the pause.',
                    'Charlotte, Huntersville, and Mooresville: the public websites do not give one simple answer. Ask the planning office for a written answer about the address and how you plan to rent it.',
                ],
            },
            {
                heading: 'The HOA or deed rules can still stop the plan',
                body: 'A home can meet the local government rules and still have private limits on renting. Read the full declaration, which is the recorded set of neighborhood rules, plus every amendment. Do not rely on a seller’s summary. If rental income is important to the purchase, ask a North Carolina attorney to explain the documents.',
            },
            {
                heading: 'What to get before you make an offer',
                body: 'Get the important answers in writing while you can still decide not to buy.',
                bullets: [
                    'The full recorded neighborhood restrictions and all changes to them, not just an HOA summary.',
                    'Written confirmation from the city or county that your planned rental use is allowed at that address.',
                    'An insurance quote from a company that knows you plan to host short-term guests.',
                    'Any existing rental permit or registration attached to the property.',
                    'HOA meeting minutes from the last year, where pending rule changes usually surface first.',
                ],
            },
            {
                heading: 'Allowed does not always mean profitable',
                body: 'Short-term rentals come with costs that are easy to miss: furniture and replacements, cleaning between guests, booking-platform fees, higher insurance, utilities, and slow months with fewer bookings. A home can be legal to rent and still be a poor investment.',
            },
        ],
        faqs: [
            {
                question: 'Does an HOA rule override city zoning for short-term rentals?',
                answer: 'Neither one replaces the other. The city or county controls local land-use rules, while recorded deed or HOA restrictions can add private limits. Check both. Ask a North Carolina attorney to explain what the recorded documents mean for the specific home.',
            },
            {
                question: 'Will my homeowner insurance cover a short-term rental?',
                answer: 'Do not assume it will. Coverage and exclusions vary by carrier and policy. Describe the intended rental use in writing, request a written quote or endorsement, and compare that answer with any platform-provided protection before relying on coverage.',
            },
            {
                question: 'Can a short-term rental be prohibited after I buy?',
                answer: 'Yes, rules can change. Ask the city or county and the HOA how rule changes affect homes that are already being rented. If the purchase only works with rental income, plan for the possibility that the rules may become stricter.',
            },
        ],
        related: ['sell-hold-or-rent-charlotte-property', 'buying-investment-property-lake-norman'],
    },
    {
        slug: 'relocating-to-charlotte',
        question: 'What should I know before relocating to Charlotte?',
        title: 'Relocating to Charlotte: How to Choose an Area Before You Visit',
        metaDescription:
            'How to choose where to live when moving to the Charlotte area, including real-world commute times, school assignment, and how to shop from a distance.',
        answer:
            'Start with the trips you will make every week, then check the school assignment for any address you are considering. A home that looks close on a map can still mean a difficult commute around Charlotte or Lake Norman. Never rely on a listing, ZIP code, or town name to identify the assigned school.',
        category: 'Relocation',
        datePublished: '2026-09-02',
        dateModified: '2026-09-03',
        needsVerification: false,
        sections: [
            {
                heading: 'A short distance can still be a long drive',
                body: 'Lake Norman, the interstates, and a limited number of practical routes shape local traffic. Test the whole drive on the days and at the times you expect to travel. Include the local streets at each end, plus school or airport trips that matter to you.',
            },
            {
                heading: 'Check the school for the exact address',
                body: 'Do not rely on the town name, ZIP code, or property listing. Use the school district’s official tool for the full street address and the school year when the student will attend. Ask the district directly about boundary changes, reassignment, or enrollment questions.',
            },
            {
                heading: 'Find out who is responsible for each address',
                body: 'The city printed in the mailing address may not tell you which local government, school district, water system, or homeowners association (HOA) applies. Identify each one before you compare homes.',
                bullets: [
                    'Confirm which city, town, or county makes the local land-use rules for the address.',
                    'Verify the school district and current assigned school for the exact address.',
                    'Check public water, sewer, well, and septic status rather than assuming from nearby homes.',
                    'Read the recorded property map and deed or HOA restrictions for rules that apply to the lot.',
                ],
            },
            {
                heading: 'Plan an out-of-state move in stages',
                body: 'Use online research to narrow the search to two or three areas, but do not make the final choice from listings alone. During a focused visit, drive the regular routes, see neighborhoods at different times of day, and tour homes at several prices so you can see what your budget actually buys.',
            },
        ],
        faqs: [
            {
                question: 'How far in advance should I start a relocation search?',
                answer: 'Start early enough to talk with a lender, compare areas, test the drives you will make regularly, and visit in person before you feel rushed to make an offer. The right lead time depends on your move date, loan, and how many suitable homes are available.',
            },
            {
                question: 'Does the mailing address determine the assigned school?',
                answer: 'No. The assigned school is tied to the exact property and may not match the mailing city or town name. Always confirm it with the school district’s lookup tool for the full street address.',
            },
        ],
        related: ['first-time-home-buyer-charlotte', 'charlotte-area-neighborhood-comparison'],
    },
    {
        slug: 'first-time-home-buyer-charlotte',
        question: 'What does a first-time buyer need to know in Charlotte?',
        title: 'First-Time Home Buyer Guide for the Charlotte Area',
        metaDescription:
            'A plain-English guide to North Carolina due diligence fees, earnest money, offer deadlines, and the full monthly cost of a home.',
        answer:
            'Before you make an offer, understand the due diligence fee. This is money paid directly to the seller for the right to cancel during an agreed period. It usually comes back to you as a credit if you close, but you generally lose it if you cancel. Treat it as money at risk.',
        category: 'Buying',
        datePublished: '2026-09-02',
        dateModified: '2026-09-03',
        needsVerification: false,
        sections: [
            {
                heading: 'North Carolina uses two different upfront payments',
                body: 'The due diligence fee pays the seller for giving you an agreed amount of time to investigate the home and cancel. Earnest money is a separate deposit that is usually held in a trust account. It may be returned if you cancel properly and on time. Your signed contract controls what happens to both payments.',
            },
            {
                heading: 'A stronger offer can also put more of your money at risk',
                body: 'A seller may prefer a higher due diligence fee or a shorter inspection period because those terms give the buyer less room to walk away. A lower fee and more time protect you better. The goal is not simply to win. It is to make an offer you can live with if the inspection or loan brings bad news.',
            },
            {
                heading: 'Budget the full monthly cost',
                body: 'The loan payment is only part of what the home will cost each month. Add the expenses that change from one property to another.',
                bullets: [
                    'Principal and interest.',
                    'Property taxes, which vary by county and city or town.',
                    'Homeowner insurance, which varies with age, roof, and construction.',
                    'Homeowners association (HOA) dues, plus any special assessments the community has approved or is considering.',
                    'Mortgage insurance, depending on down payment and loan type.',
                    'Money set aside for repairs and replacements, even though no bill arrives every month.',
                ],
            },
            {
                heading: 'Use the due diligence period to get answers',
                body: 'Schedule the general home inspection quickly. Depending on the home, you may also need a specialist, a property survey if the boundaries are unclear, permit records for earlier work, and a full review of the HOA documents. Finish any repair discussion before your cancellation deadline passes.',
            },
        ],
        faqs: [
            {
                question: 'Is the due diligence fee refundable?',
                answer: 'Generally, no. You pay it to the seller for the right to investigate the home and cancel during an agreed period. If you close, it is usually credited toward the purchase. If you cancel, you normally lose it even when you have a valid reason for walking away.',
            },
            {
                question: 'How much should a first-time buyer save beyond the down payment?',
                answer: 'Plan for closing costs, the due diligence fee, earnest money, inspections, moving expenses, and money for early repairs or maintenance. These costs are separate from the down payment.',
            },
            {
                question: 'When should I sign a buyer agency agreement?',
                answer: 'North Carolina requires a written, signed agreement no later than the time you or your agent makes an offer. Before signing, ask what the agent will do, how long the agreement lasts, whether you can work with anyone else, how the agent is paid, and how either side can end the agreement.',
            },
        ],
        related: ['relocating-to-charlotte', 'charlotte-area-neighborhood-comparison'],
    },
    {
        slug: 'sell-hold-or-rent-charlotte-property',
        question: 'Should I sell, hold, or rent out my Charlotte property?',
        title: 'Sell, Hold, or Rent: How to Decide on a Charlotte-Area Property',
        metaDescription:
            'Questions to ask before selling a Charlotte-area home or keeping it as a rental, including costs, landlord duties, and tax timing.',
        answer:
            'Before comparing rent with your mortgage, ask a CPA how the timing could affect your taxes. Some sellers can exclude up to $250,000 of gain, or $500,000 on many joint returns, after meeting IRS ownership and residency rules. Renting the home can also create depreciation that is taxable when you sell.',
        category: 'Selling',
        datePublished: '2026-09-02',
        dateModified: '2026-09-03',
        needsVerification: true,
        verificationNote:
            'Capital gains exclusion mechanics are federal tax matters. This page must be reviewed for accuracy and must direct readers to a CPA. Real estate licensees should not give tax advice.',
        sections: [
            {
                heading: 'Check the tax timing before you run the rental numbers',
                body: 'The IRS has rules about how long you owned the home, how long it was your main home, and when you sell it. Renting can also change how part of the gain is taxed. Ask a CPA to apply those rules to your dates and tax history before you decide.',
            },
            {
                heading: 'Rent minus mortgage is not the real profit',
                body: 'Some rental costs arrive only a few times a year, but they still count. Include them before deciding that the home will make money.',
                bullets: [
                    'Vacancy between tenants, including turnover time.',
                    'Property management, if you will not self-manage from where you are moving.',
                    'Repairs and money set aside for a roof, HVAC system, appliances, and other eventual replacements.',
                    'Landlord insurance, which differs from your current homeowner policy.',
                    'Tax changes, including depreciation while it is rented and how that may affect the taxes due when you sell.',
                ],
            },
            {
                heading: 'A landlord has legal responsibilities',
                body: 'North Carolina landlords must keep covered homes safe and livable and maintain certain systems. State law also controls how security deposits are held, what can be deducted, how much can be collected, and when the tenant must receive an accounting. A property manager or North Carolina attorney can explain the current rules for your lease.',
            },
            {
                heading: 'Reasons keeping the home may work',
                body: 'Keeping it may make sense if you have a low fixed interest rate, may return to the area, own a home with a hard-to-replace location or lot, and can afford several months without a tenant or a large repair.',
            },
            {
                heading: 'Reasons selling may work better',
                body: 'Selling may make more sense if you need the money for your next home, are close to an important tax deadline, do not want to pay for major repairs, or would rather not manage a rental from far away.',
            },
        ],
        faqs: [
            {
                question: 'Does renting my house affect the capital gains exclusion?',
                answer: 'It can. IRS guidance generally requires two years of ownership and two years of use as a main home during the five years before sale, and depreciation from rental use generally cannot be excluded. Partial exclusions and other exceptions are fact-specific, so confirm the timing with a CPA.',
            },
            {
                question: 'Is property management worth the cost?',
                answer: 'It depends on how far away you live, how much time you have, and whether you want tenant and repair calls. Compare written proposals that explain who finds tenants, handles renewals and repairs, checks the home, and deals with vacancy. Do not compare only the management fee.',
            },
        ],
        related: ['short-term-rental-rules-charlotte-area', 'buying-investment-property-lake-norman'],
    },
    {
        slug: 'buying-investment-property-lake-norman',
        question: 'What should I check before buying an investment property near Lake Norman?',
        title: 'Buying Investment Property Near Lake Norman: A Due Diligence Checklist',
        metaDescription:
            'What to check before buying a rental near Lake Norman, including homeowners association (HOA) and deed restrictions, slow seasons, insurance, docks, and shoreline rules.',
        answer:
            'Before estimating rental income, confirm whether the government responsible for the exact address permits the rental use, whether recorded covenants or homeowners association (HOA) rules prohibit or limit it, and whether an insurer will cover it. Near Lake Norman, also check Duke Energy shoreline records, FEMA flood information, utility or septic service, and recorded rights for any claimed water access.',
        category: 'Rental questions',
        datePublished: '2026-09-02',
        dateModified: '2026-09-03',
        needsVerification: false,
        verificationNote:
            'Any claim about specific subdivisions, lake access rules, dock permitting, or municipal boundaries must be verified against current recorded covenants and the relevant authority before publication.',
        sections: [
            {
                heading: 'Check the things that could rule out the home first',
                body: 'Start with the rules that could make the rental plan unavailable. There is no reason to estimate income before confirming the land-use rules for the exact address and reviewing the recorded covenants and current HOA governing documents.',
                bullets: [
                    'Recorded covenants and current HOA governing documents, including any rental prohibition, minimum lease term, rental cap, or approval process.',
                    'City or county land-use rules and any permit or registration you need.',
                    'Insurance availability and cost for the intended use.',
                    'Realistic demand in busy and slow months for that specific location.',
                    'The home’s condition and expensive systems that may need replacement soon.',
                ],
            },
            {
                heading: 'Costs specific to lake-area property',
                body: 'Homes near the water can have costs that similar inland homes may not, including dock or shoreline maintenance, Duke Energy application fees, property-specific flood or liability coverage, and shared-access charges. Verify the deed, survey or recorded plat, HOA documents, and Duke Energy records to determine what water access and shoreline facilities actually come with the property.',
            },
            {
                heading: 'Use a full-year forecast, not one strong month',
                body: 'For a short-term rental, do not apply a busy-season nightly rate to every month. Build a month-by-month estimate that includes vacancy, cleaning, utilities, maintenance, management, and other carrying costs. For any rental strategy, run a downside case with lower income and higher expenses.',
            },
            {
                heading: 'Check existing vacation-rental agreements before closing',
                body: 'If the property is subject to North Carolina vacation-rental agreements, G.S. 42A-19 generally makes the buyer take title subject to agreements ending no later than 180 days after the buyer’s interest is recorded. The statute also sets seller-disclosure, buyer-notice, and advance-rent transfer duties. Have the closing attorney review the reservations and funds before closing.',
            },
        ],
        faqs: [
            {
                question: 'Can I assume a nearby property\'s rental performance applies to mine?',
                answer: 'Not reliably. The deed or HOA rules, water access, condition, and guest appeal can differ between homes that look similar on a map. Check the rules and likely demand for the exact property.',
            },
            {
                question: 'What mistakes can make an investment purchase disappoint?',
                answer: 'A purchase can disappoint if rental restrictions are discovered after closing or if projected income is too high and vacancy, operating costs, or major repairs are too low. Check the records for the exact address and run a downside case with fewer bookings and higher costs before you buy.',
            },
        ],
        related: ['short-term-rental-rules-charlotte-area', 'sell-hold-or-rent-charlotte-property'],
    },
    {
        slug: 'charlotte-area-neighborhood-comparison',
        question: 'How do Charlotte-area towns compare for buyers?',
        title: 'Charlotte, Huntersville, Cornelius, Davidson, and Mooresville: How They Compare',
        metaDescription:
            'A practical way to compare Charlotte, Huntersville, Cornelius, Davidson, and Mooresville by commute, schools, utilities, local rules, and daily life.',
        answer:
            'Compare exact addresses, not town stereotypes. A Charlotte-area mailing address may not tell you the county, school district, utilities, or local land-use rules. Lake Norman spans four counties. Once you confirm those details, test the actual commute and compare each home with the things that matter in your daily life.',
        category: 'Local guide',
        datePublished: '2026-09-02',
        dateModified: '2026-09-03',
        needsVerification: true,
        verificationNote:
            'Publication remains gated until the town, school, county, and NCDOT source set receives a complete current primary-source review. Any price bands, inventory levels, tax rates, or school data added later must also be sourced, dated, and refreshed at least quarterly.',
        sections: [
            {
                heading: 'How to use a comparison like this',
                body: 'A town comparison can help you narrow the search, but it cannot choose a neighborhood or street for you. Two homes in the same town can have very different commutes, school assignments, rules, and surroundings. Narrow the search to two or three areas, then compare actual addresses.',
            },
            {
                heading: 'Each town keeps its own property and land-use records',
                body: 'There is no single Charlotte-area website for every local rule. Charlotte, Huntersville, Cornelius, Davidson, and Mooresville each keep their own maps, development rules, and verification processes. Start by finding out which local government is responsible for the exact address.',
                bullets: [
                    'Identify the city, town, or county that makes the local land-use rules for the address.',
                    'Use that government’s current map and rules rather than a property-listing summary.',
                    'Check the school district separately; the mailing city does not decide the assigned school.',
                    'Check deed and HOA restrictions, utilities, flood information, and any shoreline rules for the exact property.',
                ],
            },
            {
                heading: 'What to check for every address',
                body: 'Confirm the assigned school, drive your real route at the time you would normally travel, read the HOA or deed restrictions and fees, ask about flood and insurance concerns, and look for nearby development that could change the area.',
            },
            {
                heading: 'Test the commute instead of trusting an estimate',
                body: 'NCDOT says the I-77 Express Lanes connect uptown Charlotte with Exit 36 at N.C. 150 in Iredell County, alongside free general-purpose lanes. NCDOT is also widening part of N.C. 150 and adding a westbound Lake Norman bridge. Check current traffic and project updates rather than relying on a fixed travel-time promise.',
            },
        ],
        faqs: [
            {
                question: 'How should I compare Charlotte-area towns?',
                answer: 'List what matters to you, including the commute, type of home, local rules, utilities, school assignment, and places you visit often. Then check each exact address against official records and drive the route yourself. A town name alone cannot tell you whether a home fits.',
            },
            {
                question: 'How should commute affect a Lake Norman search?',
                answer: 'Use the actual origin, destination, departure time, and route. Test it in both directions and review current NCDOT project information; a town-wide drive-time estimate is not reliable for a specific address.',
            },
        ],
        related: ['relocating-to-charlotte', 'buying-investment-property-lake-norman'],
    },
];

export const answerPages: AnswerPage[] = [...baseAnswerPages, ...researchedAnswerPages];

export function findAnswerPage(slug: string): AnswerPage | undefined {
    return answerPages.find((page) => page.slug === slug);
}
