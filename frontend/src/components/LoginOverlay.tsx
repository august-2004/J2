"use client";

import React, { useState } from "react";
import LoginButton from "./LoginButton";
import { toast } from "sonner";
export default function LoginOverlay() {
	const [isLoginOpen, setIsLoginOpen] = useState(false);
	const [isSignup, setIsSignup] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [otppage, setOtpPage] = useState(false);
	const [otp, setOtp] = useState("");
	const [isLoggingIn, setIsLoggingIn] = useState(false);
	const [isSigningUp, setIsSigningUp] = useState(false);
	const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);

	const handleToggle = () => {
		setIsSignup(!isSignup);
	};

	const handleLogin = async () => {
		try {
			if (!email || !password) {
				toast.error("Please fill all fields");
				return;
			}
			setIsLoggingIn(true);
			const response = await fetch(
				"https://theskribe-backend.vercel.app/login",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ email, password }),
				}
			);
			const data = await response.json();

			if (data.success) {
				toast.success("Login successful");
				// window.location.reload();
			} else {
				console.log(data);
				toast.error("Login error");
				setIsLoggingIn(false);
			}
		} catch (error) {
			toast.error("Login error:");
			setIsLoggingIn(false);
		}
	};

	const handleSignup = async () => {
		try {
			if (!email || !password) {
				toast.error("Please fill all fields");
				return;
			}
			setIsSigningUp(true);
			const response = await fetch(
				"https://theskribe-backend.vercel.app/signup",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ email, password }),
				}
			);
			const data = await response.json();

			if (data.success) {
				toast.success("OTP Sent");
				setOtpPage(true);
				setIsSigningUp(false);
			} else {
				console.log(data);
				toast.error(data.message);
				setIsSigningUp(false);
			}
		} catch (error) {
			toast.error("Signup	error");
			setIsSigningUp(false);
		}
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (!isSignup) {
			handleLogin();
		} else {
			handleSignup();
		}
	};

	const handleVerifyOtp = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			if (!otp) {
				toast.error("Please enter the OTP");
				return;
			}

			setIsVerifyingOtp(true);

			const response = await fetch(
				"https://theskribe-backend.vercel.app/verify-otp",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ email, otp }),
				}
			);

			const data = await response.json();

			if (data.success) {
				toast.success("Account verified successfully");
				setOtpPage(false);
				setIsSignup(false);
				setOtp("");
			} else {
				toast.error(data.message || "OTP verification failed");
				setIsVerifyingOtp(false);
			}
		} catch (error) {
			toast.error("OTP verification error");
			setIsVerifyingOtp(false);
		}
	};

	// Shared button style with disabled state
	const getButtonStyle = (isDisabled: boolean) => ({
		width: "150px",
		backgroundColor: isDisabled ? "#6d3549" : "#360819",
		color: isDisabled ? "#cccccc" : "white",
		padding: "10px",
		borderRadius: "50px",
		border: "none",
		cursor: isDisabled ? "not-allowed" : "pointer",
		margin: "10px",
		opacity: isDisabled ? 0.7 : 1,
	});

	return (
		<>
			{<LoginButton setIsLoginOpen={setIsLoginOpen} />}
			{isLoginOpen && (
				<div
					style={{
						position: "fixed",
						top: 0,
						left: 0,
						width: "100%",
						height: "100%",
						backgroundColor: "rgba(0, 0, 0, 0.5)",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						zIndex: 99,
					}}
				>
					<div
						style={{
							backgroundColor: "#4C0B24",
							padding: "0px",
							borderRadius: "10px",
							boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
							width: "400px",
							textAlign: "center",
						}}
					>
						<h2
							style={{
								backgroundColor: "#360819",
								borderTopLeftRadius: "10px",
								borderTopRightRadius: "10px",
								height: "40px",
								textAlign: "center",
								paddingTop: "10px",
								fontWeight: "900",
							}}
						>
							{otppage ? "Verify OTP" : isSignup ? "Sign Up" : "Login"}
						</h2>

						{otppage ? (
							// OTP Form
							<form onSubmit={handleVerifyOtp}>
								<p style={{ padding: "10px", color: "white" }}>
									We've sent a verification code to {email}
								</p>
								<p>(Check spam folder if not received)</p>
								<input
									type="text"
									placeholder="Enter OTP"
									required
									style={{
										width: "80%",
										outline: "none",
										padding: "8px",
										margin: "10px",
										borderRadius: "10px",
										backgroundColor: "#360819",
									}}
									value={otp}
									onChange={(e) => setOtp(e.target.value)}
								/>
								<button
									type="submit"
									className="submit"
									disabled={isVerifyingOtp}
									style={getButtonStyle(isVerifyingOtp)}
								>
									{isVerifyingOtp ? "Verifying..." : "Verify"}
								</button>
							</form>
						) : (
							<>
								<form onSubmit={handleSubmit}>
									<input
										type="email"
										placeholder="Email"
										required
										style={{
											width: "80%",
											outline: "none",
											padding: "8px",
											margin: "10px ",
											borderRadius: "10px",
											backgroundColor: "#360819",
										}}
										value={email}
										onChange={(e) => setEmail(e.target.value)}
									/>
									<input
										type="password"
										placeholder="Password"
										required
										minLength={8}
										style={{
											width: "80%",
											outline: "none",
											padding: "8px",
											margin: "10px ",
											borderRadius: "10px",
											backgroundColor: "#360819",
										}}
										value={password}
										onChange={(e) => setPassword(e.target.value)}
									/>

									<button
										type="submit"
										className="submit"
										disabled={isLoggingIn || isSigningUp}
										style={getButtonStyle(isLoggingIn || isSigningUp)}
									>
										{isSignup
											? isSigningUp
												? "Signing up..."
												: "Sign Up"
											: isLoggingIn
											? "Logging in..."
											: "Login"}
									</button>
								</form>
								{/* {!isSignup && (
									<button
										style={{
											width: "100%",
											color: "white",
											fontSize: "14px",
											marginTop: "10px",
											background: "none",
											border: "none",
											cursor: isLoggingIn ? "not-allowed" : "pointer",
											opacity: isLoggingIn ? 0.7 : 1,
										}}
										disabled={isLoggingIn}
									>
										Forgot Password?
									</button>
								)} */}
								<p>
									{isSignup
										? "Already have an account? "
										: "Don't have an account?  "}
									<button
										onClick={handleToggle}
										disabled={isLoggingIn || isSigningUp}
										style={{
											color: "white",
											background: "none",
											border: "none",
											cursor:
												isLoggingIn || isSigningUp ? "not-allowed" : "pointer",
											textDecoration: "underline",
											opacity: isLoggingIn || isSigningUp ? 0.7 : 1,
										}}
									>
										{isSignup ? " Login" : " Sign Up"}
									</button>
								</p>
							</>
						)}

						{!otppage && (
							<button
								style={{
									width: "100px",
									backgroundColor: "#360819",
									padding: "10px",
									borderRadius: "50px",
									border: "none",
									cursor:
										isLoggingIn || isSigningUp ? "not-allowed" : "pointer",
									margin: "20px",
									opacity: isLoggingIn || isSigningUp ? 0.7 : 1,
								}}
								disabled={isLoggingIn || isSigningUp}
								onClick={() => setIsLoginOpen(false)}
							>
								Close
							</button>
						)}
					</div>
				</div>
			)}
		</>
	);
}
