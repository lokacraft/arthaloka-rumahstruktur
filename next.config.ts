/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",          // asal path
        destination: "/landingpage", // tujuan redirect
        permanent: true,      // true = 308 redirect (SEO friendly), false = 307 (temporary)
      },
    ];
  },
};

module.exports = nextConfig;