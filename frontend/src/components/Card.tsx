"use client";
import { useContext, useEffect, useRef, useState } from "react";
import { autoGrow } from "../utils/autoGrow";
import "./styles/Card.css";
import { NotesContext } from "@/utils/NotesContext";

const Card = ({ note }: any) => {
	const textAreaRef = useRef(null);
	const titleAreaRef = useRef(null);
	const [saving, setSaving] = useState(false);
	const keyUpTime = useRef(null);
	const { setNotes } = useContext(NotesContext);

	useEffect(() => {
		autoGrow(textAreaRef);
	}, []);

	const saveData = async (title: any, content: any) => {
		setSaving(true);
		try {
			const response = await fetch("http://localhost:3100/update", {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ title, content, id: note._id }),
			});
			const data = await response.json();
			console.log(data);

			// Update the notes state with the returned updated note
			setNotes((prevNotes: any) =>
				prevNotes.map((n: any) => (n._id === data._id ? data : n))
			);
		} catch (err) {
			console.log(err);
		} finally {
			setSaving(false);
		}
	};

	const handleKeyUp = async () => {
		setSaving(true);

		if (keyUpTime.current) {
			clearTimeout(keyUpTime.current);
		}
		const title = titleAreaRef.current.value;
		const content = textAreaRef.current.value;
		keyUpTime.current = setTimeout(() => {
			saveData(title, content);
		}, 2000);
	};

	return (
		<div className="card">
			<div className="card-header" style={{ backgroundColor: note.titleColor }}>
				<textarea
					defaultValue={note.title}
					ref={titleAreaRef}
					onKeyUp={handleKeyUp}
					maxLength={30}
				></textarea>
				{saving && <div className="saving">Saving</div>}
			</div>
			<div className="card-body" style={{ backgroundColor: note.contentColor }}>
				<textarea
					ref={textAreaRef}
					defaultValue={note.content}
					onInput={() => {
						autoGrow(textAreaRef);
					}}
					onKeyUp={handleKeyUp}
				/>
			</div>
		</div>
	);
};

export default Card;
