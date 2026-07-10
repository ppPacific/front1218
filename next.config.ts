import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

//WHITELIST SOME URLs
const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
  allowedDevOrigins: ["127.0.0.1"],
  async rewrites() {
    return [
      {
        source: "/ingest/static/:path*",
        destination: "https://us-assets.i.posthog.com/static/:path*",
      },
      {
        source: "/ingest/:path*",
        destination: "https://us.i.posthog.com/:path*",
      },
    ];
  },
  // This is required to support PostHog trailing slash API requests
  skipTrailingSlashRedirect: true,
  // images:{
  //     remotePatterns:[
  //         {
  //             protocol:'https',
  //             hostname: 'res.cloudinary.com'
  //         }
  //     ]
  // },
  // reactCompiler:true,
  // experimental:{
  //     turbopackFileSystemCacheForDev: true
  // }
};

//const withNextIntl = createNextIntlPlugin();
export default nextConfig;
