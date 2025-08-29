const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin('./src/i18n.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['static.wixstatic.com'], // For migrating Wix images
  },
  // Disable static exports for now to allow dynamic rendering
  output: undefined,
};

module.exports = withNextIntl(nextConfig);