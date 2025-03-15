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
			<body className={inter.className}>
				<ClientTokenProvider>{children}</ClientTokenProvider>
			</body>
		</html>
	);
}
