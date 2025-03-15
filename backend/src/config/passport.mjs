import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import UserModel from "../Schemas/UserSchema.mjs";

const opts = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
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
