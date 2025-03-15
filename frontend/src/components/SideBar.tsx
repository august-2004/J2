"use client";
import { useContext, useState } from "react";
import { NotesContext } from "@/utils/NotesContext";
import { PageContext } from "@/utils/PageContext";
import { FolderOpen, Home } from "lucide-react";
import { toast } from "sonner";

const SideBar = () => {
	const { setNotes, setSelectedNote } = useContext(NotesContext);
	const [showFolders, setShowFolders] = useState(false);
	const createNote = async ({ titleColor, contentColor }: any) => {
		try {
			const token = localStorage.getItem("token");
			if (!token) {
				toast.error("Please sign in to create a note");
				return;
			}
			const response = await fetch("api/create", {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({
					titleColor,
					contentColor,
				}),
			});
			const note = await response.json();
			setNotes((prevNotes: any) => [note, ...prevNotes]);
			setCurrentPage("editor");
			setSelectedNote(note);
		} catch (error: any) {
			toast.error(error);
		}
	};

	const { setCurrentLayout, setCurrentPage } = useContext(PageContext);

	const toggleView = () => {
		setShowFolders(!showFolders);
		setCurrentLayout(showFolders ? "home" : "folder");
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
				{showFolders ? (
					<Home className="icon-bar" strokeWidth={0.5} onClick={toggleView} />
				) : (
					<FolderOpen
						className="icon-bar"
						strokeWidth={0.5}
						onClick={toggleView}
					/>
				)}
			</div>
		</div>
	);
};

export default SideBar;
