import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	async rewrites() {
		return [
			{
				source: "/api/:path*",
				destination: "http://192.168.1.4:3100/:path*",
			},
		];
	},
};

export default nextConfig;
