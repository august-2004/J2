"use client";
import { createContext, useState, useEffect, use } from "react";
import { toast } from "sonner";

export const FolderContext = createContext();

const FolderProvider = ({ children }) => {
	const [folders, setFolders] = useState([]);
	const [selectedFolder, setSelectedFolder] = useState(null);

	useEffect(() => {
		fetchFolders();
	}, []);

	const fetchFolders = async () => {
		try {
			const response = await fetch("/api/folder/read");
			const data = await response.json();
			setFolders(data);
		} catch (error) {
			toast.error("Failed to fetch folders");
		}
	};

	const createFolder = async (title) => {
		try {
			const response = await fetch("/api/folder/create", {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ title }),
			});
			const data = await response.json();
			fetchFolders();
			toast.success("Folder created");
		} catch (error) {
			toast.error("Failed to create folder");
		}
	};

	const addNote = async (folderId, noteId) => {
		try {
			const response = await fetch("/api/folder/addNote", {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ folderId, noteId }),
			});
			const data = await response.json();
			fetchFolders();
		} catch (error) {
			toast.error("Failed to add note to folder");
		}
	};

	const removeNote = async (folderId, noteId) => {
		try {
			const response = await fetch("/api/folder/removeNote", {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ folderId, noteId }),
			});
			const data = await response.json();
			fetchFolders();
		} catch (error) {
			toast.error("Failed to remove note from folder");
		}
	};

	const deleteFolder = async (folderId) => {
		try {
			const response = await fetch("/api/folder/delete", {
				method: "DELETE",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ folderId }),
			});
			const data = await response.json();
			toast.success("Folder deleted");
		} catch (error) {
			toast.error("Failed to delete folder");
			console.error(error);
		}
	};

	const contextData = {
		folders,
		setFolders,
		fetchFolders,
		selectedFolder,
		setSelectedFolder,
		createFolder,
		addNote,
		removeNote,
		deleteFolder,
	};

	return (
		<FolderContext.Provider value={contextData}>
			{children}
		</FolderContext.Provider>
	);
};

export default FolderProvider;
