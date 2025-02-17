"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import "./styles/Editor.css";
import { Minimize2 } from "lucide-react";
import { useRef, useState, useContext } from "react";
import { NotesContext } from "@/utils/NotesContext";
import DOMPurify from "dompurify";

export default function Editor({ note, onClose }: any) {
	const editor = useEditor({
		extensions: [StarterKit],
		content: note.content,
		onUpdate: ({ editor }) => {
			handleChange(editor);
		},
	});
	const keyUpTime = useRef<null | NodeJS.Timeout>(null);
	const textAreaRef = useRef<HTMLTextAreaElement>(null);
	const [saving, setSaving] = useState(false);
	const { fetchNotes } = useContext(NotesContext);

	const handleChange = async (editor: any) => {
		setSaving(true);
		if (keyUpTime.current) {
			clearTimeout(keyUpTime.current);
		}
		const content = editor.getHTML();
		keyUpTime.current = setTimeout(async () => {
			const sanitizedContent = DOMPurify.sanitize(content);
			if (textAreaRef.current) {
				await saveData(textAreaRef.current.value, sanitizedContent);
				setSaving(false);
				await fetchNotes();
			}
		}, 2000);
	};

	const saveData = async (title: string, content: string) => {
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
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<div className="editor-overlay">
			<div className="editor" style={{ backgroundColor: note.contentColor }}>
				<div
					className="editor-header"
					style={{ backgroundColor: note.titleColor }}
				>
					<textarea
						onKeyUp={() => {
							handleChange(editor);
						}}
						ref={textAreaRef}
						defaultValue={note.title || "untitled"}
					/>
					{saving && <div className="saving">Saving</div>}
					<Minimize2 className="minimize" onClick={onClose} />
				</div>
				<div className="editor-body">
					<EditorContent editor={editor} />
				</div>
			</div>
		</div>
	);
}
