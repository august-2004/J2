import crypto from "crypto";
import rateLimit from "express-rate-limit";
//OTP GENERATOR
export const generateOTP = () => {
	return crypto.randomInt(100000, 999999).toString();
};
//OTP REQUEST LIMITER
export const otpRequestLimiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	max: 5,
	message: {
		success: false,
		message:
			"Too many verification attempts, please try again after 15 minutes.",
	},
});
//OTP VERIFICATION LIMITER
export const otpVerificationLimiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	max: 10,
	message: {
		success: false,
		message:
			"Too many verification attempts, please try again after 15 minutes.",
	},
});
