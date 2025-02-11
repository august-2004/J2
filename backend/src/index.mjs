import express from "express";
import http from "http";
import mongoose from "mongoose";
import authRouter from "./Routes/AuthRouter.mjs";

const app = express();
const server = http.createServer(app);
app.use(express.json());
app.use(authRouter);

const port = process.env.port || 3000;
server.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
