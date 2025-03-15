import CardLayout from "@/components/CardLayout";
import TopBar from "@/components/TopBar";
import SideBar from "@/components/SideBar";
import NotesProvider from "@/utils/NotesContext.jsx";
import FolderProvider from "@/utils/FolderContext";
import PageProvider from "@/utils/PageContext";
import { Toaster } from "sonner";

export default function Home() {
	return (
		<NotesProvider>
			<FolderProvider>
				<PageProvider>
					<div className="app-container">
						<TopBar />
						<div className="main-container">
							<SideBar />
							<CardLayout />
						</div>
					</div>
					<Toaster richColors />
				</PageProvider>
			</FolderProvider>
		</NotesProvider>
	);
}
