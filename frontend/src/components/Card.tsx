"use client";
import { useContext, useRef, useState, useEffect } from "react";
import DOMPurify from "dompurify";
import { autoGrow } from "../utils/autoGrow";
import "./styles/Card.css";
import { NotesContext } from "@/utils/NotesContext";
import { PageContext } from "@/utils/PageContext";

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
		<div
			className="card"
			onClick={() => {
				setCurrentPage("editor");
				setSelectedNote(note);
			}}
		>
			<div className="card-header" style={{ backgroundColor: note.titleColor }}>
				<p>{note.title}</p>
				{saving && <div className="saving">Saving</div>}
			</div>
			<div
				ref={cardBodyRef}
				className="card-body"
				style={{ backgroundColor: note.contentColor }}
				dangerouslySetInnerHTML={{ __html: sanitizedContent }}
			></div>
		</div>
	);
};

export default Card;
