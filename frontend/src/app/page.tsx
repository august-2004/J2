import Card from "@/components/Card";
import Image from "next/image";
import { title } from "process";

export default function Home() {
	const note = {
		title: "My first note",
		content: "This is the content of my first note",
	};
	return (
		<>
			<Card note={note} />
		</>
	);
}
