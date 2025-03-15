import React from "react";
import Image from "next/image";
import { Github } from "lucide-react";
import LoginOverlay from "./LoginOverlay";
import { Toaster } from "sonner";

const HeroPage = () => {
	return (
		<main>
			<div className="top w-full h-10 border-b flex justify-between items-center">
				<h1 className="text-x font-black ml-5">Made with ♥️ by Vanji</h1>
				<a href="https://github.com/august-2004/theskribe">
					<Github className="mr-5 cursor-pointer" />
				</a>
			</div>
			<div className="block md:flex">
				<div>
					<Image src="/hero-logo.svg" alt="Logo" width={768} height={400} />
					<div className="h-20">
						<LoginOverlay />
					</div>
				</div>
				<div className="max">
					<Image
						className="hidden md:block mt-10"
						src="/laptop.png"
						alt="Laptop"
						width={1000}
						height={100}
					/>
					<Image
						className="blocl md:hidden"
						src="/phone.png"
						alt="phone"
						width={1000}
						height={100}
					/>
				</div>
			</div>
			<Toaster richColors />
		</main>
	);
};

export default HeroPage;
