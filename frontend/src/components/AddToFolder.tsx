import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const AddToFolder = ({ color, note_id }: any) => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger>Add to Folder</DropdownMenuTrigger>
			<DropdownMenuContent
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
				<DropdownMenuItem onClick={() => console.log("hii")}>
					Folder 1
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default AddToFolder;
