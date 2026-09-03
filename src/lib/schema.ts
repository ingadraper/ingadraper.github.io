import { siteConfig } from '../siteConfig';

const SITE = 'https://ingadraper.com';
const AGENT_ID = `${SITE}/#agent`;
const BUSINESS_ID = `${SITE}/#business`;
const BROKERAGE_ID = `${SITE}/#brokerage`;
const WEBSITE_ID = `${SITE}/#website`;

function siteUrl(value: string | undefined, label: string) {
    if (!value) throw new Error(`Missing URL for ${label}`);
    const url = new URL(value, SITE);
    if (url.origin !== SITE) throw new Error(`URL for ${label} must use ${SITE}`);
    return url.href;
}

const personProfiles = [
    siteConfig.links.youtube,
    siteConfig.links.instagram,
    siteConfig.links.facebook,
    siteConfig.links.linkedin,
    siteConfig.links.zillow,
    siteConfig.links.nextdoor,
];

const areaServed = [
    { '@type': 'City', name: 'Charlotte, NC' },
    { '@type': 'City', name: 'Huntersville, NC' },
    { '@type': 'City', name: 'Cornelius, NC' },
    { '@type': 'City', name: 'Davidson, NC' },
    { '@type': 'City', name: 'Mooresville, NC' },
    { '@type': 'Place', name: 'Lake Norman, NC' },
];

const knowsAbout = [
    'Residential real estate',
    'Relocation to Charlotte',
    'Short-term rental rules and costs',
    'Buying and owning rental property',
    'First-time home buying',
    'Preparing and pricing a home for sale',
];

/**
 * Shared entity graph. Person, local real-estate practice, brokerage, and
 * website use distinct stable IDs so answer engines do not confuse a person
 * with Schema.org's RealEstateAgent LocalBusiness type.
 */
export const agentSchema = {
    '@context': 'https://schema.org',
    '@graph': [
        {
            '@type': 'Person',
            '@id': AGENT_ID,
            name: siteConfig.agent.name,
            jobTitle: siteConfig.agent.designation,
            url: SITE,
            telephone: siteConfig.contact.phone,
            email: siteConfig.contact.email,
            description:
                'Inga Draper is a REALTOR® with eXp Realty LLC who helps buyers, sellers, and people moving to Charlotte find the home, neighborhood, or next step that fits their lives.',
            areaServed,
            knowsAbout,
            worksFor: { '@id': BROKERAGE_ID },
            hasCredential: [
                {
                    '@type': 'EducationalOccupationalCredential',
                    credentialCategory: 'Real Estate License',
                    recognizedBy: { '@type': 'Organization', name: 'North Carolina Real Estate Commission' },
                    identifier: siteConfig.compliance.licenses.nc,
                },
                {
                    '@type': 'EducationalOccupationalCredential',
                    credentialCategory: 'Real Estate License',
                    recognizedBy: { '@type': 'Organization', name: 'South Carolina Real Estate Commission' },
                    identifier: siteConfig.compliance.licenses.sc,
                },
            ],
            sameAs: personProfiles,
        },
        {
            '@type': 'RealEstateAgent',
            '@id': BUSINESS_ID,
            name: `${siteConfig.agent.name}, ${siteConfig.agent.designation} — ${siteConfig.compliance.legalBrokerageName}`,
            url: SITE,
            telephone: siteConfig.contact.phone,
            email: siteConfig.contact.email,
            areaServed,
            knowsAbout,
            employee: { '@id': AGENT_ID },
            parentOrganization: { '@id': BROKERAGE_ID },
            sameAs: [siteConfig.links.googleBusiness],
        },
        {
            '@type': 'RealEstateOrganization',
            '@id': BROKERAGE_ID,
            name: siteConfig.compliance.legalBrokerageName,
            url: siteConfig.brand.brokerageHomepage,
        },
        {
            '@type': 'WebSite',
            '@id': WEBSITE_ID,
            name: 'Inga Draper — Charlotte Real Estate',
            url: SITE,
            publisher: { '@id': BUSINESS_ID },
        },
    ],
};

/** Build a FAQPage graph from question/answer pairs rendered on the page. */
export function faqSchema(entries: { question: string; answer: string }[]) {
    return {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: entries.map((entry) => ({
            '@type': 'Question',
            name: entry.question,
            acceptedAnswer: { '@type': 'Answer', text: entry.answer },
        })),
    };
}

/** Breadcrumbs give answer engines the site's hierarchy explicitly. */
export function breadcrumbSchema(trail: { name: string; url?: string; path?: string }[]) {
    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: trail.map((crumb, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: crumb.name,
            item: siteUrl(crumb.url ?? crumb.path, `breadcrumb "${crumb.name}"`),
        })),
    };
}

/** An answer page is a distinct entity from the person who authored it. */
export function articleSchema(input: {
    headline: string;
    description: string;
    path: string;
    datePublished: string;
    dateModified: string;
}) {
    const url = siteUrl(input.path, `article "${input.headline}"`);

    return {
        '@context': 'https://schema.org',
        '@type': 'Article',
        '@id': `${url}#article`,
        headline: input.headline,
        description: input.description,
        url,
        datePublished: input.datePublished,
        dateModified: input.dateModified,
        author: { '@id': AGENT_ID },
        publisher: { '@id': BUSINESS_ID },
        mainEntityOfPage: url,
        isPartOf: { '@id': WEBSITE_ID },
    };
}

export { SITE };
