import mongoose from "mongoose";

const OTPSchema = new mongoose.Schema({
	email: { type: String, required: true },
	otp: { type: String, required: true },
	otpExpiresAt: { type: Date, required: true, index: { expires: "10m" } }, // TTL index
});

export default mongoose.model("OTP", OTPSchema);
