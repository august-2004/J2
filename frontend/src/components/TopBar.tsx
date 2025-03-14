import { CircleUser } from "lucide-react";
import SearchInput from "./SearchInput";

const TopBar = () => {
	return (
		<div className="top-bar">
			<div className="heroName">J2</div>
			<div className="icons">
				<SearchInput />
				<CircleUser strokeWidth={1.2} className="circle" />
			</div>
		</div>
	);
};

export default TopBar;
