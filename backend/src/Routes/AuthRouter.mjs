import { Router } from "express";
import UserModel from "../Schemas/UserSchema.mjs";
import OTPModel from "../Schemas/OTPModel.mjs";
import { hashSync, compareSync } from "bcrypt";
import passport from "passport";
import "../config/passport.mjs";
import jwt from "jsonwebtoken";
import {
	otpRequestLimiter,
	generateOTP,
	otpVerificationLimiter,
} from "../utilities/otpGenerator.mjs";
import { sendMail } from "../utilities/mailer.mjs";

const authRouter = new Router();

authRouter.post("/signup", async (req, res) => {
	const userExists = await UserModel.findOne({ email: req.body.email });
	if (userExists) {
		return res.status(200).send({
			success: false,
			message: "User already exists",
		});
	}
	const user = new UserModel({
		name: req.body.name,
		email: req.body.email,
		password: hashSync(req.body.password, 10),
	});
	user
		.save()
		.then((user) => {
			const otpValue = generateOTP();
			const otp = new OTPModel({
				email: req.body.email,
				otp: hashSync(otpValue, 10),
				otpExpiresAt: new Date(Date.now() + 10 * 60 * 1000),
			});
			otp
				.save()
				.then(() => {
					sendMail(
						req.body.email,
						"Verify your J2 Account",
						`To complete signing up for J2 | The Notetaking App, please enter the OTP.\n\n**Your OTP code is ${otpValue}**`
					)
						.then(() => {
							return res.status(200).send({
								success: true,
								message: "OTP sent to email",
							});
						})
						.catch((error) => {
							console.log(error);

							return res.status(500).send({
								success: false,
								message: "Failed to send OTP",
							});
						});
				})
				.catch((error) => {
					console.log(error);

					return res.status(500).send({
						success: false,
						message: "Failed to save OTP",
					});
				});
		})
		.catch((error) => {
			console.log(error);
			return res.status(500).send({
				success: false,
				message: "Failed to save user",
			});
		});
});

authRouter.post("/verify-otp", otpVerificationLimiter, async (req, res) => {
	const { email, otp } = req.body;
	const otpRecord = await OTPModel.findOne({ email });

	if (!otpRecord) {
		return res.status(400).send({
			success: false,
			message: "OTP not found",
		});
	}

	if (new Date() > otpRecord.otpExpiresAt) {
		await OTPModel.deleteOne({ email });
		return res.status(400).send({
			success: false,
			message: "OTP has expired",
		});
	}

	const isMatch = compareSync(otp, otpRecord.otp);

	if (!isMatch) {
		return res.status(400).send({
			success: false,
			message: "Invalid OTP",
		});
	}

	await OTPModel.deleteOne({ email });
	await UserModel.updateOne({ email }, { verified: true });
	return res.status(200).send({
		success: true,
		message: "OTP verified successfully",
	});
});

authRouter.post("/resend-otp", otpRequestLimiter, async (req, res) => {
	const { email } = req.body;
	const user = await UserModel.findOne({ email });

	if (!user) {
		return res.status(400).send({
			success: false,
			message: "User does not exist",
		});
	}

	if (user.verified) {
		return res.status(400).send({
			success: false,
			message: "User is already verified",
		});
	}

	const otpValue = generateOTP();
	const otp = new OTPModel({
		email: req.body.email,
		otp: hashSync(otpValue, 10),
		otpExpiresAt: new Date(Date.now() + 10 * 60 * 1000),
	});

	await OTPModel.deleteMany({ email });
	otp
		.save()
		.then(() => {
			sendMail(
				req.body.email,
				"Verify your J2 Account",
				`To complete signing up for J2 | The Notetaking App, Please Enter the Otp. \n Your OTP code is ${otpValue}`
			)
				.then(() => {
					return res.status(200).send({
						success: true,
						message: "New OTP sent to email",
					});
				})
				.catch((error) => {
					return res.status(500).send({
						success: false,
						message: "Failed to send OTP",
					});
				});
		})
		.catch((error) => {
			return res.status(500).send({
				success: false,
				message: "Failed to save OTP",
			});
		});
});

authRouter.post(
	"/request-password-reset",
	otpRequestLimiter,
	async (req, res) => {
		const { email } = req.body;
		const user = await UserModel.findOne({ email });

		if (!user) {
			return res.status(400).send({
				success: false,
				message: "User does not exist",
			});
		}

		const otpValue = generateOTP();
		const otp = new OTPModel({
			email: req.body.email,
			otp: hashSync(otpValue, 10),
			otpExpiresAt: new Date(Date.now() + 10 * 60 * 1000),
		});

		await OTPModel.deleteMany({ email });
		otp
			.save()
			.then(() => {
				sendMail(
					req.body.email,
					"Password Reset Request",
					`You requested a password reset. Your OTP code is ${otpValue}`
				)
					.then(() => {
						return res.status(200).send({
							success: true,
							message: "Password reset OTP sent to email",
						});
					})
					.catch((error) => {
						return res.status(500).send({
							success: false,
							message: "Failed to send password reset OTP",
						});
					});
			})
			.catch((error) => {
				return res.status(500).send({
					success: false,
					message: "Failed to save OTP",
				});
			});
	}
);

authRouter.post("/reset-password", otpVerificationLimiter, async (req, res) => {
	const { email, otp, newPassword } = req.body;
	const otpRecord = await OTPModel.findOne({ email });

	if (!otpRecord) {
		return res.status(400).send({
			success: false,
			message: "OTP not found",
		});
	}

	if (new Date() > otpRecord.otpExpiresAt) {
		await OTPModel.deleteOne({ email });
		return res.status(400).send({
			success: false,
			message: "OTP has expired",
		});
	}

	const isMatch = compareSync(otp, otpRecord.otp);

	if (!isMatch) {
		return res.status(400).send({
			success: false,
			message: "Invalid OTP",
		});
	}

	await OTPModel.deleteOne({ email });

	const hashedPassword = hashSync(newPassword, 10);
	await UserModel.updateOne({ email }, { password: hashedPassword });

	return res.status(200).send({
		success: true,
		message: "Password reset successfully",
	});
});

authRouter.post("/login", (req, res) => {
	UserModel.findOne({ email: req.body.email }).then((user) => {
		if (!user) {
			return res.status(200).send({
				success: false,
				message: "User does not exist",
			});
		}
		if (!user.verified) {
			return res.status(200).send({
				success: false,
				message: "User email not verified",
			});
		}

		if (!compareSync(req.body.password, user.password)) {
			return res.status(200).send({
				success: false,
				message: "Incorrect password",
			});
		}

		const payload = {
			name: user.name,
			id: user._id,
		};
		const token = jwt.sign(payload, process.env.sec, { expiresIn: "1d" });

		return res.status(200).send({
			success: true,
			message: user.name,
			token: "Bearer " + token,
		});
	});
});

authRouter.post(
	"/check",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		res.send({
			success: true,
			message: "You are logged in",
			user: req.user,
		});
	}
);

export default authRouter;
