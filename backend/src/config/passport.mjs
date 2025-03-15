import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import UserModel from "../Schemas/UserSchema.mjs";

const opts = {
	jwtFromRequest: (req) => {
		let token = null;
		if (
			req.headers.authorization &&
			req.headers.authorization.startsWith("Bearer ")
		) {
			token = req.headers.authorization.split(" ")[1];
		}

		if (!token && req.cookies) {
			token = req.cookies.token;
		}

		return token;
	},
	secretOrKey: process.env.sec,
};

passport.use(
	new JwtStrategy(opts, async (jwt_payload, done) => {
		console.log("JWT Payload:", jwt_payload);

		try {
			const user = await UserModel.findById(jwt_payload.id);

			if (user) {
				console.log("User found:", user);
				return done(null, user);
			} else {
				console.log("User not found with this id");
				return done(null, false);
			}
		} catch (err) {
			console.log("Error finding user:", err);
			return done(err, false);
		}
	})
);
