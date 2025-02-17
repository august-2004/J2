"use client";
import { NotesContext } from "@/utils/NotesContext";
import { PageContext } from "@/utils/PageContext";
import { useContext } from "react";
import Card from "./Card";
import Editor from "./Editor";
import "./styles/CardLayout.css";
import Masonry from "react-masonry-css";
import { useEffect } from "react";
const CardLayout = () => {
	const breakpointColumns = {
		default: 4,
		1050: 3,
		700: 1,
	};
	const { currentPage, setCurrentPage } = useContext(PageContext);
	const { notes, selectedNote, setSelectedNote, fetchNotes } =
		useContext(NotesContext);
	useEffect(() => {
		fetchNotes();
	}, [currentPage]);

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
			<Masonry
				breakpointCols={breakpointColumns}
				className="masonry-grid"
				columnClassName="masonry-column"
			>
				{notes.map((note: any) => (
					<Card className="card" key={note._id} note={note} />
				))}
			</Masonry>
		</div>
	);
};

export default CardLayout;
