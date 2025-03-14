import { Schema, model } from "mongoose";

const NoteSchema = new Schema({
	title: { type: String },
	content: { type: String },
	titleColor: { type: String, required: true },
	contentColor: { type: String, required: true },
	// fontColor: { type: String, required: true },
	// owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
	owner: { type: String, required: true },
	sharedWith: [{ type: Schema.Types.ObjectId, ref: "User", default: [] }],
	createdAt: { type: Date, default: Date.now, required: true },
	updatedAt: { type: Date, default: Date.now, required: true },
	isPinned: { type: Boolean, default: false },
	folders: [{ type: Schema.Types.ObjectId, ref: "Folder", default: [] }],
});

NoteSchema.pre("save", function (next) {
	this.updatedAt = Date.now();
	next();
});

NoteSchema.pre("findOneAndUpdate", function (next) {
	this._update.updatedAt = Date.now();
	next();
});

const NoteModel = model("Notes", NoteSchema);
export default NoteModel;
