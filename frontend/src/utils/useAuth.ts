import { useState, useEffect } from "react";

export default function useAuth() {
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	useEffect(() => {
		async function fetchAuth() {
			const token = document.cookie
				.split("; ")
				.find((row) => row.startsWith("token="))
				?.split("=")[1];

			if (!token) return;

			try {
				const res = await fetch("/api/check", {
					method: "GET",
					headers: {
						Authorization: `Bearer ${token}`,
						"Content-Type": "application/json",
					},
					cache: "no-store",
				});

				const data = await res.json();
				if (data.success) setIsAuthenticated(true);
			} catch (error) {
				console.error("Auth error:", error);
			}
		}

		fetchAuth();
	}, []);

	return isAuthenticated;
}
