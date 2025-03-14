import { Schema, model } from "mongoose";
const FolderSchema = new Schema({
	title: { type: String, required: true },
	owner: { type: String, required: true },
	notes: [{ type: Schema.Types.ObjectId, ref: "Notes", default: [] }],
});

const FolderModel = model("Folder", FolderSchema);
export default FolderModel;
