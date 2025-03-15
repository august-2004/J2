import { Router } from "express";
import FolderModel from "../Schemas/FolderSchema.mjs";
import NoteModel from "../Schemas/NoteSchema.mjs";
import passport from "passport";
import "../config/passport.mjs";

const folderCrud = Router();

folderCrud.put(
	"/folder/create",
	passport.authenticate("jwt", { session: false }),
	async (req, res) => {
		try {
			const owner = req.user._id;
			const { title } = req.body;
			if (!title || typeof title !== "string") {
				return res.status(400).json({ error: "Valid title is required" });
			}
			const folder = new FolderModel({ title, owner });
			const response = await folder.save();
			res.status(201).json(response);
		} catch (err) {
			console.error("Error creating folder:", err);
			res.status(500).json({ error: err.message });
		}
	}
);

folderCrud.get(
	"/folder/read",
	passport.authenticate("jwt", { session: false }),
	async (req, res) => {
		try {
			const folders = await FolderModel.find({ owner: req.user._id });
			res.json(folders.reverse());
		} catch (err) {
			console.error("Error fetching folders:", err);
			res.status(500).json({ error: err.message });
		}
	}
);

folderCrud.put(
	"/folder/rename",
	passport.authenticate("jwt", { session: false }),
	async (req, res) => {
		try {
			const { id, title } = req.body;

			if (!id) {
				return res.status(400).json({ error: "Folder ID is required" });
			}
			if (!title || typeof title !== "string") {
				return res.status(400).json({ error: "Valid title is required" });
			}

			const updatedFolder = await FolderModel.findOneAndUpdate(
				{ _id: id, owner: req.user._id },
				{ title },
				{ new: true }
			);

			if (!updatedFolder) {
				return res
					.status(404)
					.json({ error: "Folder not found or you don't have permission" });
			}

			res.json(updatedFolder);
		} catch (err) {
			console.error("Error renaming folder:", err);
			res.status(500).json({ error: err.message });
		}
	}
);

folderCrud.put(
	"/folder/addNote",
	passport.authenticate("jwt", { session: false }),
	async (req, res) => {
		try {
			const { folderId, noteId } = req.body;

			if (!folderId || !noteId) {
				return res.status(400).json({
					error: "Missing required fields",
					received: req.body,
				});
			}

			const folderExists = await FolderModel.exists({
				_id: folderId,
				owner: req.user._id,
			});

			if (!folderExists) {
				return res
					.status(404)
					.json({ error: "Folder not found or you don't have permission" });
			}

			const noteExists = await NoteModel.exists({
				_id: noteId,
				owner: req.user._id,
			});

			if (!noteExists) {
				return res
					.status(404)
					.json({ error: "Note not found or you don't have permission" });
			}

			const updatedFolder = await FolderModel.findOneAndUpdate(
				{ _id: folderId, owner: req.user._id },
				{ $addToSet: { notes: noteId } },
				{ new: true }
			);

			const updateNote = await NoteModel.findOneAndUpdate(
				{ _id: noteId, owner: req.user._id },
				{ $addToSet: { folders: folderId } },
				{ new: true }
			);

			res.json(updatedFolder);
		} catch (error) {
			console.error("Error adding note to folder:", error);
			res.status(500).json({ error: error.message });
		}
	}
);

folderCrud.put(
	"/folder/removeNote",
	passport.authenticate("jwt", { session: false }),
	async (req, res) => {
		try {
			const { folderId, noteId } = req.body;

			if (!folderId || !noteId) {
				return res.status(400).json({
					error: "Missing required fields",
					received: req.body,
				});
			}

			const updatedFolder = await FolderModel.findOneAndUpdate(
				{ _id: folderId, owner: req.user._id },
				{ $pull: { notes: noteId } },
				{ new: true }
			);

			if (!updatedFolder) {
				return res
					.status(404)
					.json({ error: "Folder not found or you don't have permission" });
			}

			const updatedNote = await NoteModel.findOneAndUpdate(
				{ _id: noteId, owner: req.user._id },
				{ $pull: { folders: folderId } },
				{ new: true }
			);

			res.json(updatedFolder);
		} catch (error) {
			console.error("Error removing note from folder:", error);
			res.status(500).json({ error: error.message });
		}
	}
);

folderCrud.delete(
	"/folder/delete",
	passport.authenticate("jwt", { session: false }),
	async (req, res) => {
		try {
			const { id } = req.body;

			if (!id) {
				return res.status(400).json({ error: "Folder ID is required" });
			}

			const deleteResult = await FolderModel.deleteOne({
				_id: id,
				owner: req.user._id,
			});

			if (deleteResult.deletedCount === 0) {
				return res
					.status(404)
					.json({ error: "Folder not found or you don't have permission" });
			}

			await NoteModel.updateMany(
				{ folders: { $in: [id] } },
				{ $pull: { folders: id } }
			);

			res.json({ message: "Folder deleted successfully" });
		} catch (error) {
			console.error("Error deleting folder:", error);
			res.status(500).json({ error: error.message });
		}
	}
);
export default folderCrud;
