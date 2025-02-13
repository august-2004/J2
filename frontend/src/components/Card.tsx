"use client";

import { useEffect, useRef, useState } from "react";
import { autoGrow } from "../utils/autoGrow";
import "./styles/Card.css";

const Card = ({ note }: any) => {
	const textAreaRef = useRef(null);
	useEffect(() => {
		autoGrow(textAreaRef);
	}, []);
	return (
		<div className="card">
			<div className="card-header">
				<h2>{note.title}</h2>
			</div>
			<div className="card-body">
				<textarea
					ref={textAreaRef}
					defaultValue={note.content}
					onInput={() => {
						autoGrow(textAreaRef);
					}}
				/>
			</div>
		</div>
	);
};

export default Card;
