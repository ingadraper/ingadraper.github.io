import { siteConfig } from '../siteConfig';

const SITE = 'https://ingadraper.com';

/** Every profile that resolves to the same real person. */
const sameAs = [
    siteConfig.links.youtube,
    siteConfig.links.instagram,
    siteConfig.links.facebook,
    siteConfig.links.linkedin,
    siteConfig.links.zillow,
    siteConfig.links.nextdoor,
    siteConfig.links.experience,
];

const areaServed = [
    'Charlotte, NC',
    'Huntersville, NC',
    'Cornelius, NC',
    'Davidson, NC',
    'Mooresville, NC',
    'Lake Norman, NC',
].map((name) => ({ '@type': 'City', name }));

/**
 * The agent entity. This is what lets an answer engine resolve the string
 * "Inga Draper" to one unambiguous licensed professional.
 */
export const agentSchema = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    '@id': `${SITE}/#agent`,
    name: siteConfig.agent.name,
    jobTitle: siteConfig.agent.designation,
    url: SITE,
    telephone: siteConfig.contact.phone,
    email: siteConfig.contact.email,
    image: `${SITE}${siteConfig.brand.logos.black}`,
    description:
        'Inga Draper is a REALTOR® with eXp Realty serving Charlotte, Huntersville, Cornelius, Davidson, and Lake Norman, North Carolina. She works with buyers, sellers, relocation clients, and investors evaluating rental and short-term rental property strategy.',
    areaServed,
    knowsAbout: [
        'Residential real estate',
        'Relocation to Charlotte',
        'Short-term rental readiness',
        'Investment property strategy',
        'First-time home buying',
        'Home selling and pricing strategy',
    ],
    worksFor: {
        '@type': 'RealEstateOrganization',
        name: siteConfig.brand.brokerageName,
    },
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
    sameAs,
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
export function breadcrumbSchema(trail: { name: string; path: string }[]) {
    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: trail.map((crumb, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: crumb.name,
            item: `${SITE}${crumb.path}`,
        })),
    };
}

/** An answer page is a distinct entity from the agent that authored it. */
export function articleSchema(input: {
    headline: string;
    description: string;
    path: string;
    datePublished: string;
    dateModified: string;
}) {
    return {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: input.headline,
        description: input.description,
        url: `${SITE}${input.path}`,
        datePublished: input.datePublished,
        dateModified: input.dateModified,
        author: { '@id': `${SITE}/#agent` },
        publisher: { '@id': `${SITE}/#agent` },
        mainEntityOfPage: `${SITE}${input.path}`,
    };
}

export { SITE };
