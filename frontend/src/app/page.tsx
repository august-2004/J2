import CardLayout from "@/components/CardLayout";
import TopBar from "@/components/TopBar";
import SideBar from "@/components/SideBar";
import NotesProvider from "@/utils/NotesContext.jsx";

export default function Home() {
	return (
		<NotesProvider>
			<div className="app-container">
				<TopBar />
				<div className="main-container">
					<SideBar />
					<CardLayout />
				</div>
			</div>
		</NotesProvider>
	);
}
