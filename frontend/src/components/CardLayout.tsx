"use client";
import Card from "./Card";
import "./styles/CardLayout.css";
import Masonry from "react-masonry-css";
const CardLayout = ({ notes }: any) => {
	const breakpointColumns = {
		default: 3,
		1050: 2,
		700: 1,
	};
	return (
		<Masonry
			breakpointCols={breakpointColumns}
			className="masonry-grid"
			columnClassName="masonry-column"
		>
			{notes.map((note: any) => (
				<Card className="card" key={note.id} note={note} />
			))}
		</Masonry>
	);
};

export default CardLayout;
