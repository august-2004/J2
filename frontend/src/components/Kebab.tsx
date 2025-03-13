import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";
import { NotesContext } from "@/utils/NotesContext";
import { useContext } from "react";

export default function Kebab({ color, note_id }: any) {
	const { fetchNotes }: any = useContext(NotesContext);

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
		} catch (err) {
			//change to popup
			console.error(err);
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
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
