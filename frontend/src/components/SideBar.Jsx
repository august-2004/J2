"use client";
import { useContext } from "react";
import { NotesContext } from "@/utils/NotesContext";

const SideBar = () => {
	const { setNotes } = useContext(NotesContext);
	const createNote = async ({ titleColor, contentColor }) => {
		try {
			const response = await fetch("http://localhost:3100/create", {
				method: "POST",
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
		} catch (error) {
			console.error("Error:", error);
		}
	};

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
