import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
	name: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	createdAt: { type: Date, default: Date.now },
	verfied: { type: Boolean, default: false },
});

const UserModel = mongoose.model("User", userSchema);

export default UserModel;
