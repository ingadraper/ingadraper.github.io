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
    category: 'Buying' | 'Selling' | 'Relocation' | 'Rental strategy' | 'Local guide';
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
            'Short-term rental rules differ by municipality and HOA across Charlotte, Huntersville, Cornelius, and Davidson. Here is the checklist to work through before you buy.',
        answer:
            'It depends on the specific address, not the region. Municipal land-use rules, recorded private covenants, and insurance terms are separate checks. A use can satisfy one and fail another. Confirm the parcel’s current classification with planning staff, have counsel review private restrictions when needed, and obtain written insurance terms before relying on rental income.',
        category: 'Rental strategy',
        datePublished: '2026-09-02',
        dateModified: '2026-09-02',
        needsVerification: true,
        verificationNote:
            'Cornelius, Davidson, and unincorporated Iredell County have primary-source findings below. Charlotte, Huntersville, and Mooresville still require written parcel-level confirmation before publication because their public materials do not provide a single definitive STR answer.',
        sections: [
            {
                heading: 'The three layers that decide it',
                body: 'People usually ask whether a city "allows" short-term rentals. That framing misses how separate public, private, and insurance rules interact.',
                bullets: [
                    'Municipal or county land-use rules: whether the use fits the parcel and whether a permit, registration, or inspection is required.',
                    'Recorded covenants: private restrictions may impose lease limits even where government rules allow the use.',
                    'Insurance: coverage, exclusions, and endorsements vary. A carrier may decline to cover the intended activity.',
                ],
            },
            {
                heading: 'What the current official records say',
                body: 'The rules are not uniform across the Charlotte–Lake Norman area. These findings come from current government materials and still need to be matched to the parcel:',
                bullets: [
                    'Cornelius: Land Development Code §5.3.44 requires a Transient Occupancy Permit for each residence, limits operation to one individual tenancy within a seven-consecutive-day period, and requires a local contact available 24 hours a day.',
                    'Davidson: its Planning Ordinance defines residential uses as long-term habitation and expressly excludes leasing or rental of less than one month. Ask Planning how a proposed short-term use is classified and whether it is available in that planning area.',
                    'Unincorporated Iredell County: the county says its 2023 STR zoning regulations have been under a court order that stopped enforcement pending final adjudication. Proposed amendments were presented in January 2026, so current enforcement status must be confirmed directly.',
                    'Charlotte, Huntersville, and Mooresville: do not interpret the absence of a simple public FAQ as permission. Request a written answer for the parcel and proposed operating model.',
                ],
            },
            {
                heading: 'Why the HOA layer surprises people most',
                body: 'A property can satisfy local land-use rules and still carry recorded private restrictions on leasing. Read the declaration and every recorded amendment rather than relying on a seller summary. If the intended use matters to the purchase, ask a North Carolina attorney to interpret the documents and available remedies.',
            },
            {
                heading: 'What to request before you write an offer',
                body: 'The goal is to convert assumptions into documents while you still have the option to walk away.',
                bullets: [
                    'The full recorded declaration of covenants and any amendments, not the community summary.',
                    'Written confirmation from the municipality of the permitted use at that parcel.',
                    'A quote from a carrier who has been told in writing that the use is short-term rental.',
                    'Any existing rental permit or registration attached to the property.',
                    'HOA meeting minutes from the last year, where pending rule changes usually surface first.',
                ],
            },
            {
                heading: 'The economics people underestimate',
                body: 'Even where the use is permitted, the model carries costs that do not appear in a long-term rental pro forma: furnishing and replacement, cleaning turnover, platform fees, higher insurance, utilities, and vacancy that swings with local demand seasonality. A property can be permitted and still be the wrong purchase.',
            },
        ],
        faqs: [
            {
                question: 'Does an HOA rule override city zoning for short-term rentals?',
                answer: 'They operate independently. Local government rules address land use; recorded covenants may impose additional private restrictions. A buyer must evaluate both rather than treating either one as permission. Ask a North Carolina attorney to interpret enforceability for the specific documents.',
            },
            {
                question: 'Will my homeowner insurance cover a short-term rental?',
                answer: 'Do not assume it will. Coverage and exclusions vary by carrier and policy. Describe the intended rental use in writing, request a written quote or endorsement, and compare that answer with any platform-provided protection before relying on coverage.',
            },
            {
                question: 'Can a short-term rental be prohibited after I buy?',
                answer: 'Rules can change. Ask the municipality and association how amendments, existing uses, and enforcement are handled, and weigh that regulatory risk when the purchase depends on rental income.',
            },
        ],
        related: ['sell-hold-or-rent-charlotte-property', 'buying-investment-property-lake-norman'],
    },
    {
        slug: 'relocating-to-charlotte',
        question: 'What should I know before relocating to Charlotte?',
        title: 'Relocating to Charlotte: How to Choose an Area Before You Visit',
        metaDescription:
            'A practical framework for choosing where to live when relocating to the Charlotte area, including commute patterns, school assignment, and how to sequence a remote move.',
        answer:
            'Choose your recurring routes and verify school assignment before choosing a neighborhood. In the Charlotte area, lake, interstate, and local-road geography can make mileage a poor commute proxy. School assignment must be checked for the exact address and school year rather than inferred from a listing, ZIP code, or postal town.',
        category: 'Relocation',
        datePublished: '2026-09-02',
        dateModified: '2026-09-02',
        needsVerification: false,
        sections: [
            {
                heading: 'Commute time is geography, not mileage',
                body: 'The Charlotte metro is shaped by Lake Norman, interstates, and a limited set of practical crossing routes. Mileage alone does not describe a commute. Test the complete route at the days and hours you expect to travel, including the final local-road segment and any school or airport trip that matters.',
            },
            {
                heading: 'School assignment is parcel-level',
                body: 'Use the governing school district’s current resources for the exact property address and school year rather than relying on the town name, ZIP code, or listing. Charlotte-Mecklenburg Schools publishes maps by school year, while Iredell-Statesville Schools verifies domicile during enrollment. Ask the district directly about reassignment or boundary questions.',
            },
            {
                heading: 'Compare jurisdictions before comparing listings',
                body: 'A useful first pass is administrative rather than subjective. Identify which government, school district, utility systems, and private association govern each address. Those boundaries affect the records you need and may not follow the postal city shown in a listing.',
                bullets: [
                    'Confirm the municipality or county with planning jurisdiction over the parcel.',
                    'Verify the school system and current assignment for the exact address.',
                    'Check public water, sewer, well, and septic status rather than assuming from nearby homes.',
                    'Read the recorded plat and private covenants for lot-specific restrictions.',
                ],
            },
            {
                heading: 'Sequencing a move from out of state',
                body: 'Remote buyers do best when they compress decisions into a structured visit rather than deciding from listings. That usually means narrowing to two or three areas remotely, then spending a focused trip driving commutes, walking neighborhoods at different times of day, and touring a deliberately wide price range to calibrate what the market actually offers.',
            },
        ],
        faqs: [
            {
                question: 'How far in advance should I start a relocation search?',
                answer: 'Start early enough to verify financing, compare governing jurisdictions, test real travel routes, and schedule an in-person visit before offer deadlines compress the decision. The useful lead time depends on the move date, financing, and inventory rather than a universal number of days.',
            },
            {
                question: 'Does the mailing address determine the assigned school?',
                answer: 'No. Assignment is set by the specific parcel and can differ from the mailing address or town name. Always confirm using the district assignment tool for the exact property address.',
            },
        ],
        related: ['first-time-home-buyer-charlotte', 'charlotte-area-neighborhood-comparison'],
    },
    {
        slug: 'first-time-home-buyer-charlotte',
        question: 'What does a first-time buyer need to know in Charlotte?',
        title: 'First-Time Home Buyer Guide for the Charlotte Area',
        metaDescription:
            'What first-time buyers in Charlotte, Huntersville, and Lake Norman should understand about due diligence fees, offer structure, and total monthly cost.',
        answer:
            'Understand the due diligence fee before making an offer. In North Carolina, it pays the seller for the buyer’s negotiated right to terminate during the due diligence period. It is credited at closing but generally is not refunded after termination. Budget it as money at risk, not as a refundable deposit.',
        category: 'Buying',
        datePublished: '2026-09-02',
        dateModified: '2026-09-02',
        needsVerification: false,
        sections: [
            {
                heading: 'How North Carolina offers actually work',
                body: 'North Carolina’s standard transaction structure can surprise buyers coming from other states. The due diligence fee pays for a defined window in which the buyer can terminate for any reason or no reason. Earnest money is a separate negotiated deposit and may be refundable when the buyer properly terminates during that window under the signed contract.',
            },
            {
                heading: 'The tradeoff you are actually negotiating',
                body: 'A higher due diligence fee and a shorter window make an offer more attractive to a seller, because they shift risk to you. A longer window with a lower fee protects you but competes less well. That tradeoff, not price alone, is often what decides a competitive offer.',
            },
            {
                heading: 'Budget the full monthly cost',
                body: 'The mortgage payment is the number buyers anchor on and the least complete one. The realistic monthly figure includes several components that vary meaningfully by property.',
                bullets: [
                    'Principal and interest.',
                    'Property taxes, which vary by county and municipality.',
                    'Homeowner insurance, which varies with age, roof, and construction.',
                    'HOA dues, plus any special assessments the community has approved or is considering.',
                    'Mortgage insurance, depending on down payment and loan type.',
                    'Maintenance reserve, which is real even though no one bills you for it.',
                ],
            },
            {
                heading: 'What to do during due diligence',
                body: 'Use the window deliberately. Beyond a general home inspection, that often means specialized inspections where warranted, a survey if boundaries are unclear, confirming permits for prior work, reading the HOA documents in full, and resolving any repair negotiation before the window closes rather than after.',
            },
        ],
        faqs: [
            {
                question: 'Is the due diligence fee refundable?',
                answer: 'Generally no. It is paid to the seller for the right to investigate the property and terminate. If you close, it is typically credited toward your purchase. If you terminate, you usually forfeit it even when terminating for a legitimate reason.',
            },
            {
                question: 'How much should a first-time buyer save beyond the down payment?',
                answer: 'Plan for closing costs, the due diligence fee, earnest money, inspections, moving costs, and an initial maintenance reserve. These are separate from the down payment and are frequently underestimated.',
            },
            {
                question: 'When should I sign a buyer agency agreement?',
                answer: 'North Carolina Real Estate Commission guidance says an oral agency relationship must be put in writing no later than the time an offer is made. The agreement should define the broker’s duties and compensation before you commit.',
            },
        ],
        related: ['relocating-to-charlotte', 'charlotte-area-neighborhood-comparison'],
    },
    {
        slug: 'sell-hold-or-rent-charlotte-property',
        question: 'Should I sell, hold, or rent out my Charlotte property?',
        title: 'Sell, Hold, or Rent: How to Decide on a Charlotte-Area Property',
        metaDescription:
            'A decision framework for Charlotte-area owners weighing whether to sell a property, hold it, or convert it to a rental, including the tax timing most owners miss.',
        answer:
            'Start with the IRS ownership-and-use tests, then compare the rental economics. A qualifying seller may exclude up to $250,000 of gain, or $500,000 on many joint returns, after owning and using the home as a main residence for two of the five years before sale. Depreciation allowed or allowable for rental use generally cannot be excluded.',
        category: 'Selling',
        datePublished: '2026-09-02',
        dateModified: '2026-09-02',
        needsVerification: true,
        verificationNote:
            'Capital gains exclusion mechanics are federal tax matters. This page must be reviewed for accuracy and must direct readers to a CPA. Real estate licensees should not give tax advice.',
        sections: [
            {
                heading: 'Why timing usually dominates the math',
                body: 'Owners often begin with estimated rent minus the mortgage payment. Before relying on that number, review IRS Publication 523’s ownership, use, and look-back tests and the treatment of depreciation after rental use. A CPA should apply those rules to the owner’s filing history and planned sale date.',
            },
            {
                heading: 'Run the honest rental number',
                body: 'A realistic rental analysis is not rent minus mortgage. It includes the costs that arrive irregularly and are easy to omit when the property is still your home.',
                bullets: [
                    'Vacancy between tenants, including turnover time.',
                    'Property management, if you will not self-manage from where you are moving.',
                    'Maintenance and capital reserve for systems that will eventually need replacement.',
                    'Landlord insurance, which differs from your current homeowner policy.',
                    'Tax treatment changes, including depreciation and its recapture at sale.',
                ],
            },
            {
                heading: 'When holding tends to make sense',
                body: 'Holding is often reasonable when you have a low fixed interest rate that would be expensive to replace, when you may return to the area, when the property has a genuine structural advantage such as location or lot, or when you can absorb several vacant months without financial strain.',
            },
            {
                heading: 'When selling tends to make sense',
                body: 'Selling is often reasonable when you need the equity for the next purchase, when you are near the end of the exclusion window, when the property requires capital work you do not want to fund, or when managing it remotely would create stress that outweighs the return.',
            },
        ],
        faqs: [
            {
                question: 'Does renting my house affect the capital gains exclusion?',
                answer: 'It can. IRS guidance generally requires two years of ownership and two years of use as a main home during the five years before sale, and depreciation from rental use generally cannot be excluded. Partial exclusions and other exceptions are fact-specific, so confirm the timing with a CPA.',
            },
            {
                question: 'Is property management worth the cost?',
                answer: 'It depends on distance, time, local vendor access, and tolerance for interruption. Compare written proposals that identify leasing, renewal, maintenance-coordination, inspection, and vacancy responsibilities rather than choosing from one headline percentage.',
            },
        ],
        related: ['short-term-rental-rules-charlotte-area', 'buying-investment-property-lake-norman'],
    },
    {
        slug: 'buying-investment-property-lake-norman',
        question: 'What should I check before buying an investment property near Lake Norman?',
        title: 'Buying Investment Property Near Lake Norman: A Due Diligence Checklist',
        metaDescription:
            'What to verify before buying a rental or investment property near Lake Norman, including covenant restrictions, seasonality, and the costs specific to lake-area properties.',
        answer:
            'Verify permitted use and recorded covenants before evaluating returns. A private restriction, zoning rule, insurance limitation, or shoreline condition can make the intended rental strategy impossible. Near Lake Norman, also confirm dock and shoreline authorization, flood information, utilities, and what water access legally conveys with the exact parcel.',
        category: 'Rental strategy',
        datePublished: '2026-09-02',
        dateModified: '2026-09-02',
        needsVerification: true,
        verificationNote:
            'Any claim about specific subdivisions, lake access rules, dock permitting, or municipal boundaries must be verified against current recorded covenants and the relevant authority before publication.',
        sections: [
            {
                heading: 'Sequence the checks by what can kill the deal',
                body: 'The most efficient due diligence order runs from the checks that can eliminate the property to the ones that only adjust the price. Covenants and permitted use come first, because no amount of favorable math survives a prohibition.',
                bullets: [
                    'Recorded covenants and minimum lease terms.',
                    'Municipal zoning and any permit or registration requirement.',
                    'Insurance availability and cost for the intended use.',
                    'Realistic demand and seasonality for the specific location.',
                    'Condition and capital needs, including systems near end of life.',
                ],
            },
            {
                heading: 'Costs specific to lake-area property',
                body: 'Properties near the water can carry expenses that inland comparables do not. Depending on the property, that may include dock or shoreline maintenance, permitting tied to the shoreline authority, higher insurance, and access arrangements that are shared rather than exclusive. Confirm what conveys with the property in writing.',
            },
            {
                heading: 'Seasonality is a real variable here',
                body: 'If the proposed strategy depends on seasonal demand, do not apply a peak-period rate across the full year. Build month-by-month scenarios for occupancy, rate, vacancy, cleaning, utilities, and management, then test the downside case rather than relying only on a platform projection.',
            },
        ],
        faqs: [
            {
                question: 'Can I assume a nearby property\'s rental performance applies to mine?',
                answer: 'Not reliably. Covenants, access, condition, and guest appeal vary considerably between properties that look comparable on a map. Verify the restrictions and demand for the specific parcel.',
            },
            {
                question: 'What is the most common reason an investment purchase disappoints?',
                answer: 'Two preventable risks are discovering a use restriction after closing and underwriting revenue without conservative vacancy, operating-cost, and capital-repair assumptions. Address both during due diligence with records for the exact parcel and a downside scenario.',
            },
        ],
        related: ['short-term-rental-rules-charlotte-area', 'sell-hold-or-rent-charlotte-property'],
    },
    {
        slug: 'charlotte-area-neighborhood-comparison',
        question: 'How do Charlotte-area towns compare for buyers?',
        title: 'Charlotte, Huntersville, Cornelius, Davidson, and Mooresville: How They Compare',
        metaDescription:
            'A practical comparison of Charlotte-area towns for buyers weighing commute, housing stock, lake access, and long-term fit across the Lake Norman corridor.',
        answer:
            'Each town trades one thing for another. Closer-in Charlotte trades space for commute. Huntersville and Cornelius trade commute for lake access and newer construction. Davidson trades inventory for walkability. Mooresville trades drive time for land. Pick the tradeoff you can live with daily, then search inside it.',
        category: 'Local guide',
        datePublished: '2026-09-02',
        dateModified: '2026-09-02',
        needsVerification: true,
        verificationNote:
            'Any price bands, inventory levels, tax rates, or school data added to this page must be sourced and dated, and refreshed at least quarterly.',
        sections: [
            {
                heading: 'How to use a comparison like this',
                body: 'Town-level comparisons are a starting filter, not a decision. Within any of these towns the range is wide enough that a specific street can behave nothing like the town average. Use this to narrow to two or three areas, then evaluate specific parcels.',
            },
            {
                heading: 'The official records differ by town',
                body: 'The towns do not use one shared land-development record. Charlotte has its Unified Development Ordinance; Huntersville publishes zoning maps and verification processes; Cornelius directs owners to parcel, plat, and lakefront-buffer records; Davidson uses planning areas with the same legal authority as zoning districts; and Mooresville administers its own Unified Development Ordinance.',
                bullets: [
                    'Identify the government with planning jurisdiction over the exact parcel.',
                    'Use that jurisdiction’s current map and ordinance rather than a listing summary.',
                    'Verify the school system separately; postal town names do not settle assignment.',
                    'Check recorded covenants, utilities, flood information, and any shoreline authority at the parcel level.',
                ],
            },
            {
                heading: 'What to verify for any specific address',
                body: 'Regardless of town, the same parcel-level items decide whether a property works: school assignment for that exact parcel, actual drive time on your real route at your real hour, HOA covenants and dues, flood and insurance considerations, and any pending development nearby that will change the area.',
            },
        ],
        faqs: [
            {
                question: 'Which Charlotte-area town is best for families?',
                answer: 'There is no single answer, because school assignment is parcel-level and family priorities differ. The more useful question is which tradeoff you accept: commute time, lot size, walkability, or inventory competitiveness.',
            },
            {
                question: 'Is Lake Norman access worth the commute?',
                answer: 'It depends on how often you would actually use the water and how much your schedule tolerates crossing-dependent traffic. Drive the commute at your real departure time before deciding.',
            },
        ],
        related: ['relocating-to-charlotte', 'buying-investment-property-lake-norman'],
    },
];

export const answerPages: AnswerPage[] = [...baseAnswerPages, ...researchedAnswerPages];

export function findAnswerPage(slug: string): AnswerPage | undefined {
    return answerPages.find((page) => page.slug === slug);
}
