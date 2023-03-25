/** @type {import('next').NextConfig} */
require('dotenv').config();

const nextConfig = {
    reactStrictMode: true,
    images: {
        dangerouslyAllowSVG: true,
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**',
            },
        ],
    },
    env: {
        COINMARKETCAP_API_KEY: process.env.COINMARKETCAP_API_KEY,
        API_URL: process.env.API_URL,
    },
};

module.exports = nextConfig;
