"use client";
import { LogOut } from "lucide-react";

const LogoutButton = () => {
	const handleLogout = () => {
		localStorage.removeItem("token");
		location.reload();
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
