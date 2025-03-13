"use client";
import { useState, useEffect, createContext } from "react";
export const NotesContext = createContext();
import { toast } from "sonner";

const NotesProvider = ({ children }) => {
	const [notes, setNotes] = useState([]);
	const [selectedNote, setSelectedNote] = useState(null);
	useEffect(() => {
		fetchNotes();
	}, []);

	const fetchNotes = async () => {
		try {
			const response = await fetch("/api/read");
			const data = await response.json();
			setNotes(data);
			console.log(data);
		} catch (error) {
			toast.error("Failed to fetch notes");
		}
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
