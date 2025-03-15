import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import HeroPage from "@/components/HeroPage";
import ClientTokenProvider from "@/components/ClientTokenProvider";

export const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "My App",
	icons: {
		icon: "./favicon.png",
	},
};

async function validateToken(token: string | undefined) {
	if (!token) return false;

	try {
		const res = await fetch("http://localhost:3100/check", {
			headers: { Authorization: `Bearer ${token}` },
			cache: "no-store",
		});

		const data = await res.json();
		return data.success;
	} catch (error) {
		console.error("Auth error:", error);
		return false;
	}
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<ClientTokenProvider>
					{(token) => <AuthHandler token={token}>{children}</AuthHandler>}
				</ClientTokenProvider>
			</body>
		</html>
	);
}

async function AuthHandler({
	token,
	children,
}: {
	token: string | null;
	children: React.ReactNode;
}) {
	const isValid = await validateToken(token || undefined);
	return isValid ? children : <HeroPage />;
}
