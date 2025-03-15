import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	createdAt: { type: Date, default: Date.now },
	verified: { type: Boolean, default: false },
});

const UserModel = mongoose.model("User", userSchema);

export default UserModel;
