const { PHASE_PRODUCTION_BUILD } = require('next/constants');

/** @type {import('next').NextConfig} */
const nextConfig = (phase) => {
    const isProductionBuild = phase === PHASE_PRODUCTION_BUILD;

    return {
        ...(isProductionBuild ? { output: 'export' } : {}),
        basePath: '',
        images: {
            unoptimized: true,
        },
    };
};

module.exports = nextConfig;
