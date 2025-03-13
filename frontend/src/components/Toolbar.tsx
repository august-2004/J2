import {
	Bold,
	Italic,
	Underline as UnderlineIcon,
	Strikethrough,
	Quote,
	Code2,
	Heading1,
	Heading2,
	Heading3,
	List,
	ListOrdered,
	AlignLeft,
	AlignCenter,
	AlignRight,
	AlignJustify,
} from "lucide-react";
import "./styles/Toolbar.css";
// Toolbar button component
const ToolbarButton = ({ onClick, icon: Icon, isActive, color }: any) => (
	<button
		onClick={onClick}
		className={`p-2 rounded-md ${isActive ? "bg-gray-200" : ""}`}
		style={{ backgroundColor: color }}
	>
		<Icon size={18} />
	</button>
);

const Toolbar = ({ editor, color }: any) => {
	if (!editor) return null;

	return (
		<div className="toolbar">
			{/* Text Formatting */}
			<div className="text-formatting menu">
				<ToolbarButton
					onClick={() => editor.chain().focus().toggleBold().run()}
					icon={Bold}
					isActive={editor.isActive("bold")}
					color={color}
				/>
				<ToolbarButton
					onClick={() => editor.chain().focus().toggleItalic().run()}
					icon={Italic}
					isActive={editor.isActive("italic")}
					color={color}
				/>
				<ToolbarButton
					onClick={() => editor.chain().focus().toggleUnderline().run()}
					icon={UnderlineIcon}
					isActive={editor.isActive("underline")}
					color={color}
				/>
				<ToolbarButton
					onClick={() => editor.chain().focus().toggleStrike().run()}
					icon={Strikethrough}
					isActive={editor.isActive("strike")}
					color={color}
				/>
			</div>

			{/* Headings */}
			<div className="headings menu">
				<ToolbarButton
					onClick={() =>
						editor.chain().focus().toggleHeading({ level: 1 }).run()
					}
					icon={Heading1}
					isActive={editor.isActive("heading", { level: 1 })}
					color={color}
				/>
				<ToolbarButton
					onClick={() =>
						editor.chain().focus().toggleHeading({ level: 2 }).run()
					}
					icon={Heading2}
					isActive={editor.isActive("heading", { level: 2 })}
					color={color}
				/>
				<ToolbarButton
					onClick={() =>
						editor.chain().focus().toggleHeading({ level: 3 }).run()
					}
					icon={Heading3}
					isActive={editor.isActive("heading", { level: 3 })}
					color={color}
				/>
			</div>

			{/* Lists */}
			<div className="lists menu">
				<ToolbarButton
					onClick={() => editor.chain().focus().toggleBulletList().run()}
					icon={List}
					isActive={editor.isActive("bulletList")}
					color={color}
				/>
				<ToolbarButton
					onClick={() => editor.chain().focus().toggleOrderedList().run()}
					icon={ListOrdered}
					isActive={editor.isActive("orderedList")}
					color={color}
				/>
			</div>
			{/* Text Alignment */}
			<div className="text-alignment menu">
				<ToolbarButton
					onClick={() => editor.chain().focus().setTextAlign("left").run()}
					icon={AlignLeft}
					isActive={editor.isActive({ textAlign: "left" })}
					color={color}
				/>
				<ToolbarButton
					onClick={() => editor.chain().focus().setTextAlign("center").run()}
					icon={AlignCenter}
					isActive={editor.isActive({ textAlign: "center" })}
					color={color}
				/>
				<ToolbarButton
					onClick={() => editor.chain().focus().setTextAlign("right").run()}
					icon={AlignRight}
					isActive={editor.isActive({ textAlign: "right" })}
					color={color}
				/>
				<ToolbarButton
					onClick={() => editor.chain().focus().setTextAlign("justify").run()}
					icon={AlignJustify}
					isActive={editor.isActive({ textAlign: "justify" })}
					color={color}
				/>
			</div>
		</div>
	);
};

export default Toolbar;
