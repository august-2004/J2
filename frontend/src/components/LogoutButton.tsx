"use client";
import { LogOut } from "lucide-react";

const LogoutButton = () => {
	const handleLogout = () => {
		fetch("/api/logout", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		}).then(() => {
			window.location.href = "/";
		});
	};
	return (
		<LogOut
			strokeWidth={0.5}
			size={40}
			className="circle cursor-pointer"
			onClick={handleLogout}
		/>
	);
};

export default LogoutButton;
