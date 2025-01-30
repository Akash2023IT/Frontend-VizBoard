const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config();

const { mongoURI } = require("./config");
const authRoutes = require("./routes/Auth");
const projectRoutes = require("./routes/Projects");
const taskRoutes = require("./routes/tasks");

const app = express();
const PORT = process.env.PORT || 5000;  

// Update CORS configuration to allow requests from your Vercel frontend
app.use(cors({
    origin: [
        'https://frontend-viz-board.vercel.app',
        'http://localhost:5175',  // Keep this for local development
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);

// Health check endpoint
app.get("/api/health", (req, res) => {
    res.status(200).json({ status: "ok" });
});

mongoose
    .connect(mongoURI) 
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch((err) => console.error("MongoDB connection error:", err)); 