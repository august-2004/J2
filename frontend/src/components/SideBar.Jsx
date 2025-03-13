"use client";
import { useContext } from "react";
import { NotesContext } from "@/utils/NotesContext";
import { PageContext } from "@/utils/PageContext";

const SideBar = () => {
	const { setNotes, setSelectedNote } = useContext(NotesContext);
	const createNote = async ({ titleColor, contentColor }) => {
		try {
			const response = await fetch("api/create", {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					titleColor,
					contentColor,
				}),
			});
			const note = await response.json();
			setNotes((prevNotes) => [note, ...prevNotes]);
			setCurrentPage("editor");
			setSelectedNote(note);
		} catch (error) {
			console.error("Error:", error);
		}
	};
	const { setCurrentPage } = useContext(PageContext);

	const colors = {
		cyanoViolet: ["#150836", "#1E0B4C"],
		bloodWine: ["#360819", "#4C0B24"],
		oceanBlue: ["#082936", "#0B3A4C"],
		bananaSun: ["#363608", "#4C4C0B"],
	};

	return (
		<div className="sidebar">
			<div className="palatte">
				{Object.values(colors).map((color, index) => {
					return (
						<div
							key={index}
							className="colorpicker"
							style={{
								backgroundColor: color[1],
								outlineColor: color[0],
							}}
							onClick={() =>
								createNote({ titleColor: color[0], contentColor: color[1] })
							}
						></div>
					);
				})}
			</div>
		</div>
	);
};

export default SideBar;
