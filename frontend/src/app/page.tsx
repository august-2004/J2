import CardLayout from "@/components/CardLayout";
import TopBar from "@/components/TopBar";
import SideBar from "@/components/SideBar";
import NotesProvider from "@/utils/NotesContext.jsx";
import PageProvider from "@/utils/PageContext";
import { Toaster } from "@/components/ui/sonner";

export default function Home() {
	return (
		<NotesProvider>
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
		</NotesProvider>
	);
}
