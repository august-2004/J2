import { CircleUser } from "lucide-react";
import SearchInput from "./SearchInput";
import Image from "next/image";

const TopBar = () => {
	return (
		<div className="top-bar">
			<Image
				src="/hero-logo.svg"
				width={120}
				height={0}
				className="hidden md:block mt-10"
				alt="logo desktop version"
			/>
			<Image
				src="/hero-logo.svg"
				width={80}
				height={20}
				className="block md:hidden p-2"
				alt=" logo mobile version"
			/>
			<div className="icons">
				<SearchInput />
				<CircleUser strokeWidth={1.2} className="circle" />
			</div>
		</div>
	);
};

export default TopBar;
