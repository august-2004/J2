import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	async rewrites() {
		return [
			{
				source: "/api/:path*", // Any API request in Next.js
				destination: "http://192.168.1.4:3100/:path*", // Proxy to Express backend
			},
		];
	},
};

export default nextConfig;
