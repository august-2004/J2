"use client";
import { useState, useEffect, createContext } from "react";
export const NotesContext = createContext();
import { toast } from "sonner";

const NotesProvider = ({ children }) => {
	const [notes, setNotes] = useState([]);
	const [selectedNote, setSelectedNote] = useState(null);
	const [searchQuery, setSearchQuery] = useState("");
	useEffect(() => {
		fetchNotes();
	}, []);

	const fetchNotes = async () => {
		try {
			const response = await fetch("/api/read", {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
				credentials: "include",
			});
			const data = await response.json();
			setNotes(data);
			console.log(data);
		} catch (error) {
			toast.error("Failed to fetch notes");
		}
	};

	const handleSearch = (query) => {
		setSearchQuery(query);
	};

	const filteredNotes = notes.filter(
		(note) =>
			note.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
			note.content?.toLowerCase().includes(searchQuery.toLowerCase())
	);

	const contextData = {
		notes: filteredNotes,
		setNotes,
		fetchNotes,
		selectedNote,
		setSelectedNote,
		searchQuery,
		setSearchQuery: handleSearch,
	};

	return (
		<NotesContext.Provider value={contextData}>
			{children}
		</NotesContext.Provider>
	);
};
export default NotesProvider;
