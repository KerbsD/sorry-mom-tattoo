import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.100.28"],
  images: {
    formats: ["image/avif", "image/webp"], // AVIF is smaller; webp is the default
    qualities: [50, 75], // Next 16 only allows listed values (default is [75])
    minimumCacheTTL: 60 * 60 * 24 * 30,
    // Admin uploads land in a public Supabase Storage bucket. Allow any project
    // subdomain so this keeps working if the Supabase project is recreated.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/:all*(mp4|webm|svg)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
