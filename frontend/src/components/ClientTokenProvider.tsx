"use client";

import { useEffect, useState } from "react";
import HeroPage from "@/components/HeroPage";

async function validateToken(token: string | null) {
	alert(token);
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

export default function ClientTokenProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [isValid, setIsValid] = useState<boolean | null>(null);

	useEffect(() => {
		const storedToken = localStorage.getItem("token");

		async function checkAuth() {
			const valid = await validateToken(storedToken);
			setIsValid(valid);
		}

		checkAuth();
	}, []);

	// Show nothing while checking token
	if (isValid === null) return null;

	// Render HeroPage if token is invalid
	return isValid ? <>{children}</> : <HeroPage />;
}
