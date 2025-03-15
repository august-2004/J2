"use client";
import { useState, createContext } from "react";

export const PageContext = createContext();

const PageProvider = ({ children }) => {
	const [currentPage, setCurrentPage] = useState("home");
	const [currentLayout, setCurrentLayout] = useState("home");
	const contextData = {
		currentPage,
		setCurrentPage,
		setCurrentLayout,
		currentLayout,
	};

	return (
		<PageContext.Provider value={contextData}>{children}</PageContext.Provider>
	);
};
export default PageProvider;
