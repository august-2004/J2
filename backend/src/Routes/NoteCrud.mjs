import { Router } from "express";
import NoteModel from "../Schemas/NoteSchema.mjs";

const noteCrud = Router();

noteCrud.put("/create", async (req, res) => {
	const { titleColor, contentColor } = req.body;
	const owner = "vanji";
	console.log(titleColor, contentColor);
	try {
		const note = new NoteModel({ owner, titleColor, contentColor });
		await note.save();
		res.json(note);
	} catch (err) {
		console.log(err);
		res.json({ error: err });
	}
});

noteCrud.get("/read", async (req, res) => {
	const notes = await NoteModel.find({ owner: "vanji" });
	res.json(notes.reverse());
});

noteCrud.put("/update", async (req, res) => {
	const { id, title, content } = req.body;
	const updatedNote = await NoteModel.findOneAndUpdate(
		{ _id: id },
		{ title, content },
		{ new: true }
	);
	res.json(updatedNote);
});

noteCrud.delete("/delete", async (req, res) => {
	const { id } = req.body;
	await NoteModel.deleteOne({ _id: id });
	res.json({ message: "Note deleted" });
});

export default noteCrud;
