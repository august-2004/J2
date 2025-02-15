import CardLayout from "@/components/CardLayout";
import TopBar from "@/components/TopBar";
import SideBar from "@/components/SideBar";

export default function Home() {
	const notes = [
		{
			id: 1,
			title: "My first note",
			content: "This is the content of my first note",
		},
		{
			id: 2,
			title: "My second note",
			content:
				"This is the content of my second noteThis is the content of my second noteThis is the content of my second noteThis is the content of my second noteThis is the content of my second noteThis is the content of my second noteThis is the content of my second noteThis is the content of my second noteThis is the content of my second noteThis is the content of my second noteThis is the content of my second noteThis is the content of my second noteThis is the content of my second noteThis is the content of my second noteThis is the content of my second noteThis is the content of my second noteThis is the content of my second noteThis is the content of my second noteThis is the content of my second noteThis is the content of my second noteThis is the content of my second noteThis is the content of my second noteThis is the content of my second noteThis is the content of my second noteThis is the content of my second noteThis is the content of my second noteThis is the content of my second noteThis is the content of my second noteThis is the content of my second noteThis is the content of my second noteThis is the content of my second noteThis is the content of my second noteThis is the content of my second noteThis is the content of my second noteThis is the content of my second noteThis is the content of my second noteThis is the content of my second noteThis is the content of my second noteThis is the content of my second noteThis is the content of my second noteThis is the content of my second noteThis is the content of my second noteThis is the content of my second noteThis is the content of my second noteThis is the content of my second noteThis is the content of my second noteThis is the content of my second noteThis is the content of my second noteThis is the content of my second noteThis is the content of my second noteThis is the content of my second noteThis is the content of my second note",
		},
		{
			id: 3,
			title: "My third note",
			content: "This is the content of my third note",
		},
		{
			id: 4,
			title: "My fourth note",
			content:
				"This is the content of my fourth noteThis is the content of my fourth noteThis is the content of my fourth noteThis is the content of my fourth noteThis is the content of my fourth noteThis is the content of my fourth noteThis is the content of my fourth noteThis is the content of my fourth noteThis is the content of my fourth noteThis is the content of my fourth noteThis is the content of my fourth noteThis is the content of my fourth noteThis is the content of my fourth noteThis is the content of my fourth noteThis is the content of my fourth noteThis is the content of my fourth noteThis is the content of my fourth noteThis is the content of my fourth noteThis is the content of my fourth noteThis is the content of my fourth noteThis is the content of my fourth noteThis is the content of my fourth noteThis is the content of my fourth noteThis is the content of my fourth noteThis is the content of my fourth noteThis is the content of my fourth noteThis is the content of my fourth noteThis is the content of my fourth noteThis is the content of my fourth noteThis is the content of my fourth noteThis is the content of my fourth noteThis is the content of my fourth noteThis is the content of my fourth noteThis is the content of my fourth noteThis is the content of my fourth noteThis is the content of my fourth noteThis is the content of my fourth noteThis is the content of my fourth noteThis is the content of my fourth noteThis is the content of my fourth noteThis is the content of my fourth noteThis is the content of my fourth noteThis is the content of my fourth noteThis is the content of my fourth noteThis is the content of my fourth noteThis is the content of my fourth noteThis is the content of my fourth noteThis is the content of my fourth noteThis is the content of my fourth noteThis is the content of my fourth noteThis is the content of my fourth noteThis is the content of my fourth noteThis is the content of my fourth noteThis is the content of my fourth noteThis is the content of my fourth noteThis is the content of my fourth noteThis is the content of my fourth noteThis is the content of my fourth noteThis is the content of my fourth noteThis is the content of my fourth note",
		},
		{
			id: 5,
			title: "My fifth note",
			content: "This is the content of my fifth note",
		},
	];
	return (
		<div className="app-container">
			<TopBar />
			<div className="main-container">
				<SideBar />
				<CardLayout notes={notes} />
			</div>
		</div>
	);
}
