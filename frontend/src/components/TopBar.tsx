import { CircleUser } from "lucide-react";
import SearchInput from "./SearchInput";
import Image from "next/image";

const TopBar = () => {
	return (
		<div className="top-bar">
			<Image
				src="/hero-logo.png"
				width={120}
				height={120}
				className="hidden md:block ml-5"
				alt="logo desktop version"
			/>
			<Image
				src="/hero-logo.png"
				width={120}
				height={80}
				className="block md:hidden p-2"
				alt=" logo mobile version"
			/>
			<div className="icons">
				<SearchInput />
				<CircleUser strokeWidth={0.5} size={40} className="circle" />
			</div>
		</div>
	);
};

export default TopBar;
