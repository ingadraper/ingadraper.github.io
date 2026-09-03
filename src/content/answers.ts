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
 * but these pages are NOT publication-ready until verified and dated.
 */

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

export const answerPages: AnswerPage[] = [
    {
        slug: 'short-term-rental-rules-charlotte-area',
        question: 'Can I run a short-term rental in the Charlotte area?',
        title: 'Short-Term Rental Rules in the Charlotte Area: What to Check First',
        metaDescription:
            'Short-term rental rules differ by municipality and HOA across Charlotte, Huntersville, Cornelius, and Davidson. Here is the checklist to work through before you buy.',
        answer:
            'It depends on the specific address, not the region. Short-term rental permission in the Charlotte area is set by three independent layers: municipal zoning, HOA covenants, and your insurance carrier. Any one of them can prohibit it outright. Confirm all three in writing before you make an offer.',
        category: 'Rental strategy',
        datePublished: '2026-09-02',
        dateModified: '2026-09-02',
        needsVerification: true,
        verificationNote:
            'Municipal ordinance specifics for Charlotte, Huntersville, Cornelius, Davidson, and Mooresville must be verified against each current city code before publication, and re-checked at least twice yearly.',
        sections: [
            {
                heading: 'The three layers that decide it',
                body: 'People usually ask whether a city "allows" short-term rentals. That framing misses how the restriction actually works. Three separate authorities each hold a veto, and they do not coordinate with each other.',
                bullets: [
                    'Municipal zoning: whether the use is permitted in that zoning district, and whether a permit, registration, or inspection is required.',
                    'HOA covenants: private restrictions that frequently impose minimum lease terms. These bind you regardless of what the city permits.',
                    'Insurance: a standard homeowner policy generally does not cover short-term rental activity. Carriers can deny claims or cancel coverage.',
                ],
            },
            {
                heading: 'Why the HOA layer surprises people most',
                body: 'A property can sit in a district where the city permits short-term rentals and still be unusable for that purpose, because the HOA imposes a minimum lease term. Minimum-term covenants are common in newer Lake Norman area subdivisions, and they are enforceable private contracts. Read the recorded covenants, not the summary sheet a seller provides.',
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
                answer: 'They operate independently. City zoning sets whether the use is legally permitted; the HOA covenant is a private contract that can restrict it further. The more restrictive of the two governs what you can actually do.',
            },
            {
                question: 'Will my homeowner insurance cover a short-term rental?',
                answer: 'Generally not. Standard homeowner policies typically exclude commercial or short-term rental activity. You usually need a specific short-term rental or landlord policy, and the carrier must be told the intended use in writing.',
            },
            {
                question: 'Can a short-term rental be prohibited after I buy?',
                answer: 'Yes. Municipalities amend ordinances and HOAs amend covenants. Some jurisdictions grandfather existing permitted uses and some do not. This is a real risk to weigh when the entire purchase depends on rental income.',
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
            'Choose your commute tolerance before you choose a neighborhood. In the Charlotte area, most relocation regret traces to underestimating drive times across the lake and river crossings, or assuming school assignment follows the mailing address. Both should be verified for a specific parcel before you commit.',
        category: 'Relocation',
        datePublished: '2026-09-02',
        dateModified: '2026-09-02',
        needsVerification: true,
        verificationNote:
            'School assignment mechanics and any district-boundary claims must be verified against the current CMS and Iredell-Statesville assignment tools before publication.',
        sections: [
            {
                heading: 'Start with the commute, not the house',
                body: 'The Charlotte metro is shaped by water and highway crossings. A property that looks fifteen minutes from an office on a map can be forty-five at 8am because the route funnels through a limited number of crossings. Drive the actual route at the actual hour before deciding an area works.',
            },
            {
                heading: 'School assignment is parcel-level',
                body: 'Assignment is determined by the specific parcel, not the town or the mailing address, and boundaries are periodically redrawn. Two houses on the same street can be assigned differently. Verify the assignment for the exact address using the district tool, and ask whether any boundary review is currently underway.',
            },
            {
                heading: 'What each area tends to trade',
                body: 'Every area in the region trades something. Naming the tradeoff up front is more useful than ranking neighborhoods.',
                bullets: [
                    'Closer-in Charlotte neighborhoods: shorter commutes and walkability, generally older housing stock and smaller lots.',
                    'Huntersville and Cornelius: lake access and newer construction, with crossing-dependent commutes.',
                    'Davidson: walkable town center and strong community identity, with a tighter and more competitive inventory.',
                    'Mooresville and outer areas: more land and lower price per square foot, with the longest commutes.',
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
                answer: 'Most out-of-state buyers benefit from starting sixty to ninety days ahead. That allows time to narrow areas remotely, schedule a focused visit, and secure financing without compressing inspection and due-diligence decisions.',
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
            'Understand the due diligence fee first. In North Carolina, buyers typically pay a non-refundable due diligence fee directly to the seller for the right to inspect and terminate. It is credited at closing if you proceed, but you generally lose it if you walk away. Budget it as real money at risk.',
        category: 'Buying',
        datePublished: '2026-09-02',
        dateModified: '2026-09-02',
        needsVerification: true,
        verificationNote:
            'North Carolina due diligence and earnest money mechanics must be verified against the current NC Association of REALTORS® standard form and Real Estate Commission guidance before publication.',
        sections: [
            {
                heading: 'How North Carolina offers actually work',
                body: 'North Carolina uses a due diligence structure that surprises buyers coming from other states. Rather than a contingency you satisfy, you buy a defined window in which you can terminate for any reason. Two separate amounts are typically negotiated: the due diligence fee, paid to the seller and generally non-refundable, and earnest money, which is usually refundable if you terminate within the window.',
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
                question: 'Do I need twenty percent down to buy in Charlotte?',
                answer: 'No. Several loan programs allow lower down payments, though they typically add mortgage insurance. The right structure depends on your timeline, cash position, and how long you expect to hold the property.',
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
            'Decide based on your timeline and the capital gains exclusion clock, not on current rent estimates. If the property was your primary residence for two of the last five years, you may qualify for a significant gains exclusion when selling. Converting to a rental starts eroding that window, which is often the largest number in the decision.',
        category: 'Selling',
        datePublished: '2026-09-02',
        dateModified: '2026-09-02',
        needsVerification: true,
        verificationNote:
            'Capital gains exclusion mechanics are federal tax matters. This page must be reviewed for accuracy and must direct readers to a CPA. Real estate licensees should not give tax advice.',
        sections: [
            {
                heading: 'Why timing usually dominates the math',
                body: 'Owners typically compare an estimated monthly rent against a mortgage payment and decide from the difference. That comparison ignores the item most likely to be the largest single number in the decision: the tax treatment of the eventual sale, which changes based on how long the property has been a rental.',
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
                answer: 'It can. The exclusion generally depends on having used the property as a primary residence for a qualifying period within the years before the sale. Converting to a rental starts a clock on that eligibility. Confirm your specific situation with a CPA.',
            },
            {
                question: 'Is property management worth the cost?',
                answer: 'It depends on distance and tolerance for interruption. Management typically costs a percentage of collected rent plus leasing fees. For owners relocating out of state, it is often the difference between a workable arrangement and an ongoing problem.',
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
            'Verify the covenant restrictions before you evaluate the returns. Near Lake Norman, many subdivisions impose minimum lease terms that eliminate short-term rental use entirely, and some restrict rentals altogether. A property that fails this test cannot produce the income the pro forma assumes, regardless of how strong the numbers look.',
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
                body: 'Demand near the lake is not evenly distributed across the year. A pro forma built on peak-season rates will overstate annual income. Build the model on a conservative annual occupancy assumption and confirm it against actual comparable performance rather than platform projections.',
            },
        ],
        faqs: [
            {
                question: 'Can I assume a nearby property\'s rental performance applies to mine?',
                answer: 'Not reliably. Covenants, access, condition, and guest appeal vary considerably between properties that look comparable on a map. Verify the restrictions and demand for the specific parcel.',
            },
            {
                question: 'What is the most common reason an investment purchase disappoints?',
                answer: 'A restriction discovered after closing that prevents the intended use, or a pro forma built on peak-season rates applied across the full year. Both are avoidable during due diligence.',
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
                heading: 'The tradeoff each area asks you to accept',
                body: 'Stated plainly, so you can pick the one you are willing to live with rather than the one that sounds best.',
                bullets: [
                    'Charlotte proper: proximity and walkability, generally older stock, smaller lots, and higher price per square foot closer in.',
                    'Huntersville: newer construction and lake proximity, with commute times that depend heavily on crossing routes.',
                    'Cornelius: strong lake access and established neighborhoods, often with covenant restrictions worth reading closely.',
                    'Davidson: walkable center and distinct community identity, with limited and competitive inventory.',
                    'Mooresville: more land per dollar, with the longest and least flexible commutes into Charlotte.',
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

export function findAnswerPage(slug: string): AnswerPage | undefined {
    return answerPages.find((page) => page.slug === slug);
}
