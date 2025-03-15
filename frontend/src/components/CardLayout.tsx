"use client";
import { NotesContext } from "@/utils/NotesContext";
import { PageContext } from "@/utils/PageContext";
import { FolderContext } from "@/utils/FolderContext";
import { useContext } from "react";
import Card from "./Card";
import Editor from "./Editor";
import "./styles/CardLayout.css";
import Masonry from "react-masonry-css";
import { useEffect } from "react";
import { format } from "date-fns";
import { Trash } from "lucide-react";

const CardLayout = () => {
	const { currentPage, setCurrentPage, setCurrentLayout, currentLayout } =
		useContext(PageContext);
	const { notes, selectedNote, setSelectedNote, fetchNotes } =
		useContext(NotesContext);
	const { folders, fetchFolders, deleteFolder } = useContext(FolderContext);

	useEffect(() => {
		fetchNotes();
		fetchFolders();
	}, [currentPage]);

	const formatDate = (isoString: string) => {
		const date = new Date(isoString);
		return format(date, "do MMMM yyyy");
	};
	const groupNotesByDate = (notes: any[]) => {
		return notes.reduce((acc, note) => {
			const dateKey = new Date(note.createdAt).toISOString().split("T")[0];

			if (!acc[dateKey]) {
				acc[dateKey] = [];
			}
			acc[dateKey].push(note);
			return acc;
		}, {} as Record<string, any[]>);
	};

	const groupNotesByFolder = (notes: any[]) => {
		return notes.reduce((acc, note) => {
			if (!note.folders || note.folders.length === 0) {
				if (!acc["Uncategorized"]) {
					acc["Uncategorized"] = [];
				}
				acc["Uncategorized"].push(note);
			} else {
				note.folders.forEach((folder: string) => {
					if (!acc[folder]) {
						acc[folder] = [];
					}
					acc[folder].push(note);
				});
			}
			return acc;
		}, {} as Record<string, any[]>);
	};

	const groupedNotes =
		currentLayout === "folder"
			? groupNotesByFolder(notes)
			: groupNotesByDate(notes);
	const sortedKeys = Object.keys(groupedNotes).sort((a, b) =>
		b.localeCompare(a)
	);

	const breakpointColumns = {
		default: 4,
		1050: 3,
		700: 1,
	};

	return (
		<div className="card-layout">
			{currentPage === "editor" && (
				<Editor
					note={selectedNote}
					onClose={() => {
						setCurrentPage("home");
					}}
					fetchNotes={fetchNotes}
				/>
			)}

			{sortedKeys.map((key) => (
				<div key={key} className="group">
					<h2 className="group-header font-extrabold ml-5">
						{currentLayout === "folder"
							? folders?.find((f: any) => f._id === key)?.title ||
							  "Uncategorized"
							: formatDate(key)}
					</h2>

					<Masonry
						breakpointCols={breakpointColumns}
						className="masonry-grid"
						columnClassName="masonry-column"
					>
						{groupedNotes[key].map((note: any) => (
							<Card className="card" key={note._id} note={note} />
						))}
					</Masonry>
				</div>
			))}

			<footer className="absolute bottom-0 left-0 right-0 text-center text-gray-500 text-xs">
				Made with ♥️ by Vanji
			</footer>
		</div>
	);
};

export default CardLayout;
