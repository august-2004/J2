"use client";
import Card from "./Card";
import "./styles/CardLayout.css";
import Masonry from "react-masonry-css";
const CardLayout = ({ notes }: any) => {
	const breakpointColumns = {
		default: 4,
		1050: 3,
		700: 1,
	};
	return (
		<div className="card-layout">
			<Masonry
				breakpointCols={breakpointColumns}
				className="masonry-grid"
				columnClassName="masonry-column"
			>
				{notes.map((note: any) => (
					<Card className="card" key={note.id} note={note} />
				))}
			</Masonry>
		</div>
	);
};

export default CardLayout;
