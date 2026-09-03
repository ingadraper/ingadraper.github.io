export interface ResearchSource {
    title: string;
    publisher: string;
    url: string;
    checked: string;
}

/** Primary-source bibliography by answer-page slug. */
export const sourceSets: Record<string, ResearchSource[]> = {
    'short-term-rental-rules-charlotte-area': [
        {
            title: 'Unified Development Ordinance',
            publisher: 'City of Charlotte',
            url: 'https://www.charlottenc.gov/Growth-and-Development/Planning-and-Development/Planning/Unified-Development-Ordinance',
            checked: 'September 2, 2026',
        },
        {
            title: 'Zoning',
            publisher: 'Town of Huntersville',
            url: 'https://www.huntersville.org/3124/Zoning',
            checked: 'September 2, 2026',
        },
        {
            title: 'My Property',
            publisher: 'Town of Cornelius Planning Department',
            url: 'https://cornelius.org/residents/my_property',
            checked: 'September 2, 2026',
        },
        {
            title: 'Planning Department',
            publisher: 'Town of Davidson',
            url: 'https://www.townofdavidson.org/68/Planning',
            checked: 'September 2, 2026',
        },
        {
            title: 'Planning',
            publisher: 'Town of Mooresville',
            url: 'https://mooresvillenc.gov/government/departments/planning___community_development/planning.php',
            checked: 'September 2, 2026',
        },
        {
            title: 'Land Development Code, Chapter 5 — Uses',
            publisher: 'Town of Cornelius',
            url: 'https://cornelius.org/Document%20Center/Government/Departments/Planning/LDC/CH%2005%20Uses.pdf?t=202602180915490',
            checked: 'September 2, 2026',
        },
        {
            title: 'Davidson Planning Ordinance (updated February 25, 2025)',
            publisher: 'Town of Davidson',
            url: 'https://www.townofdavidson.org/DocumentCenter/View/15595/_Complete-Davidson-Planning-Ordinance-20250225',
            checked: 'September 2, 2026',
        },
        {
            title: 'Short-Term Rental Regulations',
            publisher: 'Iredell County',
            url: 'https://www.iredellcountync.gov/1717/Short-Term-Rental-Regulations',
            checked: 'September 2, 2026',
        },
    ],
    'relocating-to-charlotte': [
        {
            title: '2026–2027 Student Boundary Maps',
            publisher: 'Charlotte-Mecklenburg Schools',
            url: 'https://www.cmsk12.org/academics/planning-services/student-boundary-maps',
            checked: 'September 2, 2026',
        },
        {
            title: 'Enrollment and Registration',
            publisher: 'Iredell-Statesville Schools',
            url: 'https://issnc.org/enroll',
            checked: 'September 2, 2026',
        },
    ],
    'first-time-home-buyer-charlotte': [
        {
            title: 'Due Diligence Questions and Answers',
            publisher: 'North Carolina Real Estate Commission',
            url: 'https://bulletins.ncrec.gov/due-diligence-questions-and-answers/',
            checked: 'September 2, 2026',
        },
        {
            title: 'Due Diligence Fees: When Are They Refunded?',
            publisher: 'North Carolina Real Estate Commission',
            url: 'https://bulletins.ncrec.gov/due-diligence-fees-when-are-they-refunded/',
            checked: 'September 2, 2026',
        },
        {
            title: 'Buyer Agency Agreements',
            publisher: 'North Carolina Real Estate Commission',
            url: 'https://bulletins.ncrec.gov/buyer-agency-agreements/',
            checked: 'September 2, 2026',
        },
        {
            title: '21 NCAC 58A .0104 — Agency Agreements and Disclosure',
            publisher: 'North Carolina Office of Administrative Hearings',
            url: 'http://reports.oah.state.nc.us/ncac/title%2021%20-%20occupational%20licensing%20boards%20and%20commissions/chapter%2058%20-%20real%20estate%20commission/subchapter%20a/21%20ncac%2058a%20.0104.pdf',
            checked: 'September 2, 2026',
        },
    ],
    'sell-hold-or-rent-charlotte-property': [
        {
            title: 'Topic No. 701: Sale of Your Home',
            publisher: 'Internal Revenue Service',
            url: 'https://www.irs.gov/taxtopics/tc701',
            checked: 'September 2, 2026',
        },
        {
            title: 'Publication 523 (2025): Selling Your Home',
            publisher: 'Internal Revenue Service',
            url: 'https://www.irs.gov/publications/p523',
            checked: 'September 2, 2026',
        },
        {
            title: 'Publication 527 (2025): Residential Rental Property',
            publisher: 'Internal Revenue Service',
            url: 'https://www.irs.gov/publications/p527',
            checked: 'September 2, 2026',
        },
        {
            title: 'Frequently Asked Questions on Gift Taxes: Basis and Rental Conversion',
            publisher: 'Internal Revenue Service',
            url: 'https://www.irs.gov/newsroom/frequently-asked-questions-on-gift-taxes',
            checked: 'September 2, 2026',
        },
        {
            title: 'G.S. 42-42 — Landlord to Provide Fit Premises',
            publisher: 'North Carolina General Assembly',
            url: 'https://www.ncleg.gov/EnactedLegislation/Statutes/HTML/BySection/Chapter_42/GS_42-42.html',
            checked: 'September 2, 2026',
        },
        {
            title: 'Chapter 42, Article 6 — Tenant Security Deposit Act',
            publisher: 'North Carolina General Assembly',
            url: 'https://www.ncleg.gov/EnactedLegislation/Statutes/HTML/ByArticle/Chapter_42/Article_6.html',
            checked: 'September 2, 2026',
        },
    ],
    'buying-investment-property-lake-norman': [
        {
            title: 'Permits for Shoreline Activities',
            publisher: 'Duke Energy',
            url: 'https://www.duke-energy.com/community/lakes/services/permits-shoreline-activities',
            checked: 'September 2, 2026',
        },
        {
            title: 'Catawba-Wateree Shoreline Management Plan',
            publisher: 'Duke Energy',
            url: 'https://www.duke-energy.com/community/lakes/services/cw-shoreline-management-plan',
            checked: 'September 2, 2026',
        },
        {
            title: 'Know Your Flood Risk',
            publisher: 'Federal Emergency Management Agency',
            url: 'https://www.fema.gov/flood-maps/know-your-risk/homeowners',
            checked: 'September 2, 2026',
        },
    ],
    'charlotte-area-neighborhood-comparison': [
        {
            title: 'Unified Development Ordinance',
            publisher: 'City of Charlotte',
            url: 'https://www.charlottenc.gov/Growth-and-Development/Planning-and-Development/Planning/Unified-Development-Ordinance',
            checked: 'September 2, 2026',
        },
        {
            title: 'Zoning',
            publisher: 'Town of Huntersville',
            url: 'https://www.huntersville.org/3124/Zoning',
            checked: 'September 2, 2026',
        },
        {
            title: 'My Property',
            publisher: 'Town of Cornelius Planning Department',
            url: 'https://cornelius.org/residents/my_property',
            checked: 'September 2, 2026',
        },
        {
            title: 'Planning Areas',
            publisher: 'Town of Davidson',
            url: 'https://www.townofdavidson.org/1284/Planning-Areas',
            checked: 'September 2, 2026',
        },
        {
            title: 'Planning',
            publisher: 'Town of Mooresville',
            url: 'https://mooresvillenc.gov/government/departments/planning___community_development/planning.php',
            checked: 'September 2, 2026',
        },
        {
            title: '2026–2027 Student Boundary Maps',
            publisher: 'Charlotte-Mecklenburg Schools',
            url: 'https://www.cmsk12.org/academics/planning-services/student-boundary-maps',
            checked: 'September 2, 2026',
        },
        {
            title: 'Municipalities',
            publisher: 'Mecklenburg County Government',
            url: 'https://www.mecknc.gov/Municipalities',
            checked: 'September 2, 2026',
        },
        {
            title: 'G.S. 77-89.1 — Lake Norman Marine Commission; Jurisdiction',
            publisher: 'North Carolina General Assembly',
            url: 'https://www.ncleg.gov/enactedlegislation/statutes/html/bysection/chapter_77/gs_77-89.1.html',
            checked: 'September 2, 2026',
        },
        {
            title: 'Town of Mooresville Frequently Asked Questions',
            publisher: 'Town of Mooresville',
            url: 'https://www.mooresvillenc.gov/how_do_i/town_faqs.php',
            checked: 'September 2, 2026',
        },
        {
            title: 'Express Lanes in N.C.',
            publisher: 'North Carolina Department of Transportation',
            url: 'https://www.ncdot.gov/divisions/turnpike/Pages/express-lanes-nc.aspx',
            checked: 'September 2, 2026',
        },
        {
            title: 'Contract Awarded to Improve N.C. 150 in Two Counties',
            publisher: 'North Carolina Department of Transportation',
            url: 'https://www.ncdot.gov/news/press-releases/Pages/2024/2024-11-07-nc-150-widening-contract-award.aspx',
            checked: 'September 2, 2026',
        },
    ],
    'north-carolina-due-diligence-fee': [
        {
            title: 'July 2026 Changes to Offer to Purchase and Contract',
            publisher: 'NC REALTORS',
            url: 'https://www.ncrealtors.org/wp-content/uploads/markedup0726-2-T.pdf',
            checked: 'September 2, 2026',
        },
        {
            title: 'Due Diligence Questions and Answers',
            publisher: 'North Carolina Real Estate Commission',
            url: 'https://bulletins.ncrec.gov/due-diligence-questions-and-answers/',
            checked: 'September 2, 2026',
        },
        {
            title: 'Due Diligence Fees: When Are They Refunded?',
            publisher: 'North Carolina Real Estate Commission',
            url: 'https://bulletins.ncrec.gov/due-diligence-fees-when-are-they-refunded/',
            checked: 'September 2, 2026',
        },
        {
            title: 'Questions and Answers on Earnest Money Deposits',
            publisher: 'North Carolina Real Estate Commission',
            url: 'https://www.ncrec.gov/Brochures/EarnestMoneyBrochure.pdf',
            checked: 'September 2, 2026',
        },
    ],
    'verify-school-assignment-charlotte-lake-norman': [
        {
            title: 'New Family Registration',
            publisher: 'Charlotte-Mecklenburg Schools',
            url: 'https://www.cmsk12.org/student-planning-placement-programs/registration/new-family-registration',
            checked: 'September 2, 2026',
        },
        {
            title: 'Planning Services Overview',
            publisher: 'Charlotte-Mecklenburg Schools',
            url: 'https://cmsk12.org/academics/planning-services/planning-services-overview',
            checked: 'September 2, 2026',
        },
        {
            title: '2026–2027 Student Boundary Maps',
            publisher: 'Charlotte-Mecklenburg Schools',
            url: 'https://www.cmsk12.org/academics/planning-services/student-boundary-maps',
            checked: 'September 2, 2026',
        },
        {
            title: 'School Attendance Zones',
            publisher: 'Iredell-Statesville Schools',
            url: 'https://www.issnc.org/about/school-attendance-zones',
            checked: 'September 2, 2026',
        },
        {
            title: '2027–2028 Redistricting',
            publisher: 'Iredell-Statesville Schools',
            url: 'https://www.issnc.org/community/redistricting',
            checked: 'September 2, 2026',
        },
        {
            title: 'Enrollment',
            publisher: 'Mooresville Graded School District',
            url: 'https://www.mgsd.k12.nc.us/enrollment',
            checked: 'September 2, 2026',
        },
    ],
    'lake-norman-waterfront-property-checks': [
        {
            title: 'Permits for Shoreline Activities',
            publisher: 'Duke Energy',
            url: 'https://www.duke-energy.com/community/lakes/services/permits-shoreline-activities',
            checked: 'September 2, 2026',
        },
        {
            title: 'Catawba-Wateree Shoreline Management Plan',
            publisher: 'Duke Energy',
            url: 'https://www.duke-energy.com/community/lakes/services/cw-shoreline-management-plan',
            checked: 'September 2, 2026',
        },
        {
            title: 'Know Your Flood Risk',
            publisher: 'Federal Emergency Management Agency',
            url: 'https://www.fema.gov/flood-maps/know-your-risk/homeowners',
            checked: 'September 2, 2026',
        },
        {
            title: 'Huntersville Zoning Maps and Ordinances',
            publisher: 'Town of Huntersville',
            url: 'https://www.huntersville.org/269/Zoning-Maps-Ordinances',
            checked: 'September 2, 2026',
        },
        {
            title: 'Information for Buyers/Sellers of Lake Property',
            publisher: 'Duke Energy Lake Services',
            url: 'https://www.duke-energy.com/-/media/pdfs/community/lakes-and-rec/potential-buyers-info-sheet.pdf?rev=0cc88e87a6ba457781bb4379328ef9f0',
            checked: 'September 2, 2026',
        },
        {
            title: 'G.S. 77-89.1 — Lake Norman Marine Commission; Jurisdiction',
            publisher: 'North Carolina General Assembly',
            url: 'https://www.ncleg.gov/enactedlegislation/statutes/html/bysection/chapter_77/gs_77-89.1.html',
            checked: 'September 2, 2026',
        },
        {
            title: 'Groundwater and Wastewater Services',
            publisher: 'Mecklenburg County',
            url: 'https://eh.mecknc.gov/water',
            checked: 'September 2, 2026',
        },
        {
            title: 'Onsite Water Protection',
            publisher: 'Iredell County',
            url: 'https://www.iredellcountync.gov/853/Onsite-Water-Protection',
            checked: 'September 2, 2026',
        },
        {
            title: 'Environmental Health',
            publisher: 'Lincoln County',
            url: 'https://lincolncountync.gov/451/Environmental-Health',
            checked: 'September 2, 2026',
        },
        {
            title: 'On-Site Wastewater — Septic Systems',
            publisher: 'Catawba County',
            url: 'https://www.catawbacountync.gov/county-services/environmental-health/septic-wells/septic-systems/',
            checked: 'September 2, 2026',
        },
    ],
    'verify-zoning-before-buying-charlotte-area': [
        {
            title: 'Unified Development Ordinance',
            publisher: 'City of Charlotte',
            url: 'https://www.charlottenc.gov/Growth-and-Development/Planning-and-Development/Planning/Unified-Development-Ordinance',
            checked: 'September 2, 2026',
        },
        {
            title: 'Zoning Verification Letter',
            publisher: 'Town of Huntersville',
            url: 'https://www.huntersville.org/2630/Zoning-Verification-Letter',
            checked: 'September 2, 2026',
        },
        {
            title: 'My Property',
            publisher: 'Town of Cornelius Planning Department',
            url: 'https://cornelius.org/residents/my_property',
            checked: 'September 2, 2026',
        },
        {
            title: 'Planning Department',
            publisher: 'Town of Davidson',
            url: 'https://www.townofdavidson.org/68/Planning',
            checked: 'September 2, 2026',
        },
        {
            title: 'Planning',
            publisher: 'Town of Mooresville',
            url: 'https://mooresvillenc.gov/government/departments/planning___community_development/planning.php',
            checked: 'September 2, 2026',
        },
    ],
};
