"use client";
import { NotesContext } from "@/utils/NotesContext";
import Card from "./Card";
import "./styles/CardLayout.css";
import Masonry from "react-masonry-css";
import { useContext } from "react";
const CardLayout = () => {
	const breakpointColumns = {
		default: 4,
		1050: 3,
		700: 1,
	};

	const { notes } = useContext(NotesContext);

	return (
		<div className="card-layout">
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
