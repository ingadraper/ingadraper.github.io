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
    ],
    'sell-hold-or-rent-charlotte-property': [
        {
            title: 'Topic No. 701, Sale of Your Home',
            publisher: 'Internal Revenue Service',
            url: 'https://www.irs.gov/taxtopics/tc701',
            checked: 'September 2, 2026',
        },
        {
            title: 'Publication 523, Selling Your Home',
            publisher: 'Internal Revenue Service',
            url: 'https://www.irs.gov/publications/p523',
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
    ],
    'north-carolina-due-diligence-fee': [
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
    ],
    'verify-school-assignment-charlotte-lake-norman': [
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
            title: 'My Property',
            publisher: 'Town of Cornelius Planning Department',
            url: 'https://cornelius.org/residents/my_property',
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
