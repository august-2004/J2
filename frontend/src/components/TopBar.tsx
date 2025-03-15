import SearchInput from "./SearchInput";
import Image from "next/image";
import LogoutButton from "./LogoutButton";
const TopBar = () => {
	return (
		<div className="top-bar">
			<Image
				src="/hero-logo.svg"
				width={120}
				height={120}
				className="hidden md:block ml-5"
				alt="logo desktop version"
			/>
			<Image
				src="/hero-logo.svg"
				width={120}
				height={80}
				className="block md:hidden p-2"
				alt=" logo mobile version"
			/>
			<div className="icons">
				<SearchInput />
				<LogoutButton />
			</div>
		</div>
	);
};

export default TopBar;
