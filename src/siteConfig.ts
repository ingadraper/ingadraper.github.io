const agentName = 'Inga Draper';
const brokerageName = 'eXp Realty';
const legalBrokerageName = 'eXp Realty LLC';

export const siteConfig = {
    agent: {
        name: agentName,
        designation: 'REALTOR®',
    },
    brand: {
        brokerageName,
        brokerageHomepage: 'https://www.exprealty.com/',
        logoAlt: 'eXp Realty Sports & Entertainment',
        guidelinesUrl: 'https://www.canva.com/design/DAGdJKsWnpg/j4RnyVFqu4jTHTslj1Icjw/view?utm_content=DAGdJKsWnpg&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=hb25cfc0b7b#1',
        logos: {
            black: '/images/brand/exp-sports-entertainment-black-360.webp',
            white: '/images/brand/exp-sports-entertainment-white-360.webp',
        },
        logoSrcsets: {
            black: '/images/brand/exp-sports-entertainment-black-180.webp 180w, /images/brand/exp-sports-entertainment-black-360.webp 360w',
            white: '/images/brand/exp-sports-entertainment-white-180.webp 180w, /images/brand/exp-sports-entertainment-white-360.webp 360w',
        },
    },
    compliance: {
        legalBrokerageName,
        licenses: {
            nc: '351209',
            sc: '147132',
        },
        licenseLine: 'NC License #351209 | SC License #147132',
        equalHousingLogo: {
            black: '/images/brand/equal-housing-black-128.webp',
            white: '/images/brand/equal-housing-white.png',
        },
    },
    contact: {
        phone: '(704) 560-9101',
        phoneHref: 'tel:+17045609101',
        email: 'ingibjorg.draper@exprealty.com',
    },
    links: {
        youtube: 'https://www.youtube.com/@ingaintheqc',
        instagram: 'https://www.instagram.com/ingaintheqc',
        facebook: 'https://www.facebook.com/profile.php?id=61555586323443',
        googleBusiness: 'https://www.google.com/maps/place/?q=place_id:ChIJbdGzb90THSMRszXPLr08Jmw',
        googleReview: 'https://search.google.com/local/writereview?placeid=ChIJbdGzb90THSMRszXPLr08Jmw',
        nextdoor: 'https://nextdoor.com/page/inga-draper-homes-charlotte-nc',
        experience: 'https://www.experience.com/reviews/inga-18104411',
        zillow: 'https://www.zillow.com/profile/ingaintheqc',
        linkedin: 'https://www.linkedin.com/in/ingadraper',
    },
    youtube: {
        channelName: 'Inga in the QC',
        handle: '@ingaintheqc',
        featuredVideoId: 'LYM-e6syfmQ',
        featuredVideoUrl: 'https://www.youtube.com/watch?v=LYM-e6syfmQ',
        featuredEmbedUrl: 'https://www.youtube-nocookie.com/embed/LYM-e6syfmQ',
    },
    images: {
        hero: {
            src: '/images/property/charlotte-home-hero-1280.webp',
            srcset: '/images/property/charlotte-home-hero-640.webp 640w, /images/property/charlotte-home-hero-960.webp 960w, /images/property/charlotte-home-hero-1280.webp 1280w, /images/property/charlotte-home-hero-1360.webp 1360w, /images/property/charlotte-home-hero-1440.webp 1440w, /images/property/charlotte-home-hero-1920.webp 1920w',
            width: 1280,
            height: 960,
            alt: 'Soft, refined living room with warm natural light',
        },
        about: {
            src: '/images/property/inga-draper-charlotte-750.webp',
            srcset: '/images/property/inga-draper-charlotte-500.webp 500w, /images/property/inga-draper-charlotte-750.webp 750w, /images/property/inga-draper-charlotte-1000.webp 1000w',
            width: 1000,
            height: 1440,
            alt: 'Inga Draper, Charlotte real estate advisor, with the Charlotte skyline',
        },
    },
    connectors: {
        goHighLevelFormUrl: '',
        goHighLevelCalendarUrl: '',
        goHighLevelChatWidgetId: '',
    },
};