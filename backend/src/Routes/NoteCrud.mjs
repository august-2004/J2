import { Router } from "express";
import NoteModel from "../Schemas/NoteSchema.mjs";
import FolderModel from "../Schemas/FolderSchema.mjs";
import passport from "passport";
import "../config/passport.mjs";
import { body, param, validationResult } from "express-validator";
const noteCrud = Router();

const validateRequest = (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}
	next();
};

noteCrud.put(
	"/create",
	passport.authenticate("jwt", { session: false }),
	[
		body("titleColor")
			.optional()
			.isString()
			.withMessage("Title color must be a string"),
		body("contentColor")
			.optional()
			.isString()
			.withMessage("Content color must be a string"),
	],
	validateRequest,
	async (req, res) => {
		const { titleColor, contentColor } = req.body;
		const owner = req.user._id;

		try {
			const note = new NoteModel({ owner, titleColor, contentColor });
			await note.save();
			return res.status(201).json(note);
		} catch (err) {
			console.log(err);
			return res.status(500).json({ error: "Failed to create note" });
		}
	}
);

noteCrud.get(
	"/read",
	passport.authenticate("jwt", { session: false }),
	async (req, res) => {
		try {
			const owner = req.user._id;
			const notes = await NoteModel.find({ owner });
			return res.status(200).json(notes.reverse());
		} catch (err) {
			console.log(err);
			return res.status(500).json({ error: "Failed to fetch notes" });
		}
	}
);

noteCrud.put(
	"/update",
	passport.authenticate("jwt", { session: false }),
	[
		body("id").isMongoId().withMessage("Valid note ID is required"),
		body("title").optional().isString().withMessage("Title must be a string"),
		body("content")
			.optional()
			.isString()
			.withMessage("Content must be a string"),
	],
	validateRequest,
	async (req, res) => {
		try {
			const { id, title, content } = req.body;

			const note = await NoteModel.findOne({ _id: id });
			if (!note) {
				return res.status(404).json({ error: "Note not found" });
			}

			if (note.owner.toString() !== req.user._id.toString()) {
				return res
					.status(403)
					.json({ error: "Unauthorized access to this note" });
			}

			const updatedNote = await NoteModel.findOneAndUpdate(
				{ _id: id },
				{ title, content },
				{ new: true }
			);

			return res.status(200).json(updatedNote);
		} catch (err) {
			console.log(err);
			return res.status(500).json({ error: "Failed to update note" });
		}
	}
);

noteCrud.delete(
	"/delete",
	passport.authenticate("jwt", { session: false }),
	[body("id").isMongoId().withMessage("Valid note ID is required")],
	validateRequest,
	async (req, res) => {
		try {
			const { id } = req.body;

			const note = await NoteModel.findOne({ _id: id });
			if (!note) {
				return res.status(404).json({ error: "Note not found" });
			}

			if (note.owner.toString() !== req.user._id.toString()) {
				return res
					.status(403)
					.json({ error: "Unauthorized access to this note" });
			}

			await FolderModel.updateMany(
				{ owner: req.user._id },
				{ $pull: { notes: { $in: [id] } } },
				{ multi: true }
			);

			await NoteModel.deleteOne({ _id: id });
			return res.status(200).json({ message: "Note deleted successfully" });
		} catch (err) {
			console.log(err);
			return res.status(500).json({ error: "Failed to delete note" });
		}
	}
);

export default noteCrud;
