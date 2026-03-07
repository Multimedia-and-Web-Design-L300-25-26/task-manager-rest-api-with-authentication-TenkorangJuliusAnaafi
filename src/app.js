import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";

dotenv.config();

const app = express();

app.use(express.json());

await mongoose.connect(process.env.MONGO_URI);
console.log("MongoDB Connected");

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

export default app;