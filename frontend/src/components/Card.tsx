"use client";
import { useContext, useRef, useState, useEffect } from "react";
import DOMPurify from "dompurify";
import { autoGrow } from "../utils/autoGrow";
import "./styles/Card.css";
import { NotesContext } from "@/utils/NotesContext";
import { PageContext } from "@/utils/PageContext";
import Kebab from "./Kebab";

const Card = ({ note }: any) => {
	const textAreaRef = useRef(null);
	const titleAreaRef = useRef(null);
	const cardBodyRef = useRef(null);
	const [saving, setSaving] = useState(false);
	const keyUpTime = useRef(null);
	const { currentPage, setCurrentPage } = useContext(PageContext);
	const { notes, selectedNote, setSelectedNote, setNotes } =
		useContext(NotesContext);

	// Sanitize the note content
	const sanitizedContent = DOMPurify.sanitize(note.content);

	// Use autoGrow to adjust the height of the card body
	useEffect(() => {
		autoGrow(cardBodyRef.current);
	}, [sanitizedContent]);

	return (
		<div className="card">
			<div className="card-header" style={{ backgroundColor: note.titleColor }}>
				<p
					style={{ fontWeight: "800" }}
					onClick={() => {
						setCurrentPage("editor");
						setSelectedNote(note);
					}}
				>
					{note.title}
				</p>
				{saving && <div className="saving">Saving</div>}
				<Kebab
					color={{
						titleColor: note.titleColor,
						contentColor: note.contentColor,
					}}
					note_id={note._id}
				/>
			</div>
			<div
				onClick={() => {
					setCurrentPage("editor");
					setSelectedNote(note);
				}}
				ref={cardBodyRef}
				className="card-body"
				style={{ backgroundColor: note.contentColor }}
				dangerouslySetInnerHTML={{ __html: sanitizedContent }}
			></div>
		</div>
	);
};

export default Card;
