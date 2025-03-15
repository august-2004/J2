"use client";

import { useEffect, useState } from "react";

export default function ClientTokenProvider({
	children,
}: {
	children: (token: string | null) => React.ReactNode;
}) {
	const [token, setToken] = useState<string | null>(null);

	useEffect(() => {
		const storedToken = localStorage.getItem("token");
		setToken(storedToken);
	}, []);

	return <>{children(token)}</>;
}
