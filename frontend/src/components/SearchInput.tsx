"use client";
import { useContext } from "react";
import { NotesContext } from "../utils/NotesContext";

const SearchInput = () => {
	const { setSearchQuery } = useContext(NotesContext);
	const handleSearchChange = (e: any) => {
		setSearchQuery(e.target.value);
	};

	return (
		<div className="search-container">
			<input
				type="text"
				placeholder="Search..."
				onChange={handleSearchChange}
				className="search-input bg-black rounded-full h-full px-3 border-2 outline-none border-white"
			/>
		</div>
	);
};

export default SearchInput;
