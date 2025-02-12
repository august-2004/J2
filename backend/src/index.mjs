import "dotenv/config";
import express from "express";
import http from "http";
import mongoose from "mongoose";
import authRouter from "./Routes/AuthRouter.mjs";
const app = express();
const server = http.createServer(app);
app.use(express.json());
app.use(authRouter);

try {
	mongoose.connect(process.env.MONGO_URI).then(() => {
		console.log("Database connected");
	});
} catch (err) {
	console.log(`Error : ${err}`);
}

const port = process.env.port || 3100;
server.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
