import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
	DropdownMenuSub,
	DropdownMenuSubTrigger,
	DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu";
import { MoreVertical, Check } from "lucide-react";
import { NotesContext } from "@/utils/NotesContext";
import { PageContext } from "@/utils/PageContext";
import { useContext } from "react";
import { toast } from "sonner";
import { FolderContext } from "@/utils/FolderContext";

export default function Kebab({ color, note_id }: any) {
	const { fetchNotes }: any = useContext(NotesContext);
	const { folders, addNote, createFolder, removeNote, fetchFolders }: any =
		useContext(FolderContext);
	const { setCurrentPage } = useContext(PageContext);

	const deleteData = async (id: string) => {
		try {
			const response = await fetch("api/delete", {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ id }),
			});
			const data = await response.json();
			fetchNotes();
			setCurrentPage("home");
		} catch (err) {
			toast.error("Failed to delete note");
		}
	};
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<button className="p-2 focus:outline-none">
					<MoreVertical className="w-5 h-5" />
				</button>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				align="end"
				style={
					{
						backgroundColor: color.contentColor,
						border: "none",
						boxShadow: "0px 0px 10px 2px rgba(0,0,0,0.37)",
						color: "white",
						borderRadius: "10px",
					} as React.CSSProperties
				}
			>
				<DropdownMenuItem
					className="hover:bg-[var(--color-content)] transition-colors"
					style={
						{
							"--color-content": color.titleColor,
							borderRadius: "7px",
						} as React.CSSProperties
					}
					onClick={() => deleteData(note_id)}
				>
					Delete
				</DropdownMenuItem>
				<DropdownMenuSub>
					<DropdownMenuSubTrigger
						className="transition-colors"
						style={
							{
								"--color-content": color.titleColor,
								borderRadius: "7px",
								backgroundColor: "transparent",
							} as React.CSSProperties
						}
						onMouseEnter={(e) =>
							(e.currentTarget.style.backgroundColor = color.titleColor)
						}
						onMouseLeave={(e) =>
							(e.currentTarget.style.backgroundColor = "transparent")
						}
					>
						Add to Folder
					</DropdownMenuSubTrigger>
					<DropdownMenuSubContent
						style={
							{
								backgroundColor: color.contentColor,
								border: "none",
								boxShadow: "0px 0px 10px 2px rgba(0,0,0,0.37)",
								color: "white",
								borderRadius: "10px",
							} as React.CSSProperties
						}
					>
						<DropdownMenuItem
							className="mb-1 transition-colors"
							style={
								{
									backgroundColor: color.titleColor,
									borderRadius: "7px",
								} as React.CSSProperties
							}
						>
							<input
								className="h-6 bg-inherit outline-none"
								type="text"
								placeholder="Create Folder"
								onClick={(e) => e.stopPropagation()}
								onKeyDown={async (e) => {
									if (e.key === "Enter") {
										e.preventDefault();
										const folder = e.currentTarget.value;
										await createFolder(folder);
										fetchFolders();
										fetchNotes();
										e.stopPropagation();
									}
								}}
							/>
						</DropdownMenuItem>

						{folders.length > 0 ? (
							folders.map((folder: any) => {
								let isInFolder = folder.notes && folder.notes.includes(note_id);
								return (
									<DropdownMenuItem
										key={folder._id}
										className={`hover:bg-[var(--color-content)] transition-colors flex justify-between items-center mb-1 ${
											isInFolder ? "bg-[var(--color-content)]" : ""
										}`}
										style={
											{
												"--color-content": color.titleColor,
												borderRadius: "7px",
											} as React.CSSProperties
										}
										onClick={async (e) => {
											e.stopPropagation();
											e.preventDefault();
											if (isInFolder) {
												await removeNote(folder._id, note_id);
												fetchFolders();
												fetchNotes();
											} else {
												await addNote(folder._id, note_id);
												fetchFolders();
												fetchNotes();
											}
										}}
									>
										<span>{folder.title}</span>
										{isInFolder && <Check className="w-4 h-4 ml-2" />}
									</DropdownMenuItem>
								);
							})
						) : (
							<></>
						)}
					</DropdownMenuSubContent>
				</DropdownMenuSub>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
