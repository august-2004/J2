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
			const token = localStorage.getItem("token");
			if (!token) {
				toast.error("You need to be logged in to view notes");
				return;
			}
			const response = await fetch(
				"https://theskribe-backend.vercel.app/read",
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
				}
			);
			const data = await response.json();
			setNotes(data);
			console.log(data);
		} catch (error) {
			console.log(error);
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
