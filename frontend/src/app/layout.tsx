import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import ClientTokenProvider from "@/components/ClientTokenProvider";

export const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "The Skribe",
	icons: {
		icon: "./favicon.png",
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<head>
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<meta property="og:description" content="Take your notes everywhere." />
				<meta
					property="og:image"
					content="https://raw.githubusercontent.com/august-2004/j2/main/frontend/public/opengraph.png"
				/>
				<meta property="og:image:width" content="1200" />
				<meta property="og:image:height" content="630" />
				<meta property="og:type" content="website" />
				<meta property="og:site_name" content="The Skribe" />
				<meta property="og:url" content="https://theskribe.vercel.app/" />
				<meta name="msapplication-TileColor" content="#000000" />
				<meta name="theme-color" content="#000000" />
			</head>
			<body className={inter.className}>
				<ClientTokenProvider>{children}</ClientTokenProvider>
			</body>
		</html>
	);
}
