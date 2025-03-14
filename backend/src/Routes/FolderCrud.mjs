import { Router } from "express";
import FolderModel from "../Schemas/FolderSchema.mjs";
import NoteModel from "../Schemas/NoteSchema.mjs";
const folderCrud = Router();

folderCrud.put("/folder/create", async (req, res) => {
	const owner = "vanji";
	try {
		const { title } = req.body;
		const folder = new FolderModel({ title, owner });
		const response = await folder.save();
		res.json(response);
	} catch (err) {
		console.log(err);
		res.json({ error: err });
	}
});

folderCrud.get("/folder/read", async (req, res) => {
	const folders = await FolderModel.find({ owner: "vanji" });
	res.json(folders.reverse());
});

folderCrud.put("/folder/rename", async (req, res) => {
	const { id, title } = req.body;
	const updatedFolder = await FolderModel.findOneAndUpdate(
		{ _id: id },
		{ title },
		{ new: true }
	);
	res.json(updatedFolder);
});

folderCrud.put("/folder/addNote", async (req, res) => {
	try {
		console.log("Request body:", req.body);

		// Extract IDs properly from request
		let folderId, noteId;

		if (req.body.folderId && req.body.noteId) {
			// Standard format
			folderId = req.body.folderId;
			noteId = req.body.noteId;
		} else {
			return res.status(400).json({
				error: "Missing required fields",
				received: req.body,
			});
		}

		const updatedFolder = await FolderModel.findOneAndUpdate(
			{ _id: folderId },
			{ $push: { notes: noteId } },
			{ new: true }
		);
		const updateNote = await NoteModel.findOneAndUpdate(
			{ _id: noteId },
			{ $push: { folders: folderId } },
			{ new: true }
		);

		if (!updatedFolder) {
			return res.status(404).json({ error: "Folder not found" });
		}
		console.log("Note added to folder:", updatedFolder);

		res.json(updatedFolder);
	} catch (error) {
		console.error("Error adding note to folder:", error);
		res.status(500).json({ error: error.message });
	}
});

folderCrud.put("/folder/removeNote", async (req, res) => {
	const { folderId, noteId } = req.body;
	console.log(folderId, noteId);
	const updatedFolder = await FolderModel.findOneAndUpdate(
		{ _id: folderId },
		{ $pull: { notes: noteId } },
		{ new: true }
	);
	const updatedNote = await NoteModel.findOneAndUpdate(
		{ _id: noteId },
		{ $pull: { folders: folderId } },
		{ new: true }
	);
	res.json(updatedFolder);
});

folderCrud.delete("/folder/delete", async (req, res) => {
	const { id } = req.body;
	await FolderModel.deleteOne({ _id: id });
	await NoteModel.updateMany(
		{ folders: { $in: [id] } },
		{ $pull: { folders: { $in: [id] } } },
		{ multi: true }
	);
	res.json({ message: "Folder deleted" });
});

export default folderCrud;
