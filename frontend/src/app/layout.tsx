import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import HeroPage from "@/components/HeroPage";
import { cookies } from "next/headers";
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

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const cookieStore = await cookies();
	const token = cookieStore.get("token")?.value;
	console.log(token);
	const isValid = await validateToken(token);
	console.log(isValid);
	return (
		<html lang="en">
			<body>{isValid ? children : <HeroPage />}</body>
		</html>
	);
}
