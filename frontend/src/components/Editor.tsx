"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import "./styles/Editor.css";
import { Minimize2 } from "lucide-react";
import { useRef, useState, useContext, useEffect } from "react";
import { NotesContext } from "@/utils/NotesContext";
import DOMPurify from "dompurify";
import Toolbar from "./Toolbar";
import Loader from "./Loader";
import { toast } from "sonner";
import Kebab from "./Kebab";

export default function Editor({ note, onClose }: any) {
	const [isVisible, setIsVisible] = useState(false);
	const editor = useEditor({
		extensions: [
			StarterKit,
			TextAlign.configure({ types: ["heading", "paragraph"] }),
			Link.configure({ autolink: true }),
			Placeholder.configure({ placeholder: "Start typing..." }),
			Underline,
		],
		content: note.content,
		onUpdate: ({ editor }) => {
			handleChange(editor);
		},
	});

	useEffect(() => {
		// Delay setting visibility to create animation effect
		const timer = setTimeout(() => {
			setIsVisible(true);
		}, 50);

		if (textAreaRef.current) {
			textAreaRef.current.focus();
		}
		if (editor) {
			editor.commands.focus();
		}

		return () => clearTimeout(timer);
	}, [editor]);

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
		}, 1000);
	};

	const saveData = async (title: string, content: string) => {
		try {
			const response = await fetch("api/update", {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ title, content, id: note._id }),
			});
			const data = await response.json();
			console.log(data);
		} catch (err) {
			toast.error("Failed to save note");
		}
	};

	const handleClose = () => {
		setIsVisible(false);
		// Delay actual closing to allow animation to complete
		setTimeout(() => {
			onClose();
		}, 300);
	};
	const handleOverlayClick = (e: React.MouseEvent) => {
		if (e.target === e.currentTarget) {
			handleClose();
		}
	};

	return (
		<div
			className={`editor-overlay ${isVisible ? "visible" : ""}`}
			onClick={handleOverlayClick}
		>
			<div
				className={`editor ${isVisible ? "visible" : ""}`}
				style={{ backgroundColor: note.contentColor }}
			>
				<div
					className="editor-header"
					style={{ backgroundColor: note.titleColor }}
				>
					<textarea
						style={{ fontWeight: "800" }}
						onKeyUp={() => {
							handleChange(editor);
						}}
						ref={textAreaRef}
						defaultValue={note.title || "untitled"}
					/>
					<div className="flex align-content:center">
						{saving && <Loader />}
						<Kebab note_id={note._id} color={note} />
						<Minimize2 className="minimize" onClick={handleClose} />
					</div>
				</div>
				<Toolbar editor={editor} color={note.titleColor} />

				<div className="editor-body" style={{ fontWeight: "400" }}>
					<EditorContent editor={editor} />
				</div>
			</div>
		</div>
	);
}
