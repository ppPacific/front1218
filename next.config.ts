import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  /* config options here */
    reactCompiler:true,
    experimental:{
        turbopackFileSystemCacheForDev: true
    }
};

//const withNextIntl = createNextIntlPlugin();
export default nextConfig;
