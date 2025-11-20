import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // (https://aws-tippni.s3.amazonaws.com/1762435265985__3.png)
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "aws-tippni.s3.amazonaws.com",
      },
    ],
  },
};

export default nextConfig;
