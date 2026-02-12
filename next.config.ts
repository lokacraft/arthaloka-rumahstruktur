/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // atau ganti dengan domain cloudflare bucket Anda, misal: "imagedelivery.net"
      },
      {
        protocol: "https",
        hostname: "pub-de04f345fff04f47926715a5ffcf8fc9.r2.dev", // atau ganti dengan domain cloudflare bucket Anda, misal: "imagedelivery.net"
        pathname: "/**",
      },
    ],
    unoptimized: true, 
  },
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