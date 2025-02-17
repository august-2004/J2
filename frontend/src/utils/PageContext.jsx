"use client";
import { useState, useEffect, createContext } from "react";

export const PageContext = createContext();

const PageProvider = ({ children }) => {
	const [currentPage, setCurrentPage] = useState("home");

	const contextData = { currentPage, setCurrentPage };

	return (
		<PageContext.Provider value={contextData}>{children}</PageContext.Provider>
	);
};
export default PageProvider;
