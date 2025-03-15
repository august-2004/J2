import "dotenv/config";
import cors from "cors";
import express from "express";
import http from "http";
import mongoose from "mongoose";
import authRouter from "./Routes/AuthRouter.mjs";
import noteCrud from "./Routes/NoteCrud.mjs";
import folderCrud from "./Routes/FolderCrud.mjs";
import cookieParser from "cookie-parser";
const app = express();
const server = http.createServer(app);

app.use(
	cors({
		origin: "https://theskribe.vercel.app",
		credentials: true,
		methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
		allowedHeaders: ["Content-Type", "Authorization"],
	})
);

app.options("*", (req, res) => {
	res.setHeader("Access-Control-Allow-Origin", "https://theskribe.vercel.app");
	res.setHeader(
		"Access-Control-Allow-Methods",
		"GET, POST, PUT, DELETE, OPTIONS"
	);
	res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
	res.setHeader("Access-Control-Allow-Credentials", "true");
	res.status(204).end();
});

app.options("*", cors());
app.use(cookieParser());
app.use(express.json());
app.use(authRouter);
app.use(noteCrud);
app.use(folderCrud);
app.get("/", (req, res) => {
	res.send("Server is running");
});
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
