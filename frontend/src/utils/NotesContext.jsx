"use client";
import { useState, useEffect, createContext } from "react";

export const NotesContext = createContext();

const NotesProvider = ({ children }) => {
	const [notes, setNotes] = useState([]);
	const [selectedNote, setSelectedNote] = useState(null);
	useEffect(() => {
		fetchNotes();
	}, []);

	const fetchNotes = async () => {
		const response = await fetch("http://localhost:3100/read");
		const data = await response.json();
		setNotes(data);
		console.log(data);
	};
	const contextData = {
		notes,
		setNotes,
		fetchNotes,
		selectedNote,
		setSelectedNote,
	};

	return (
		<NotesContext.Provider value={contextData}>
			{children}
		</NotesContext.Provider>
	);
};
export default NotesProvider;
