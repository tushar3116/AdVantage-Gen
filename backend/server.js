import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import rateLimit from "express-rate-limit";
import imageRoutes from "./routes/image.routes.js";
import campaignRoutes from "./routes/campaign.routes.js";

dotenv.config();

const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ad-creative-generator')
.then(() => console.log('📊 Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: {
    error: "Too many requests from this IP, please try again later."
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Apply rate limiting to API routes
app.use("/api/", limiter);

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json({ limit: '50mb' })); // Increase limit for image data
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Routes
app.use("/api", imageRoutes);
app.use("/api/campaigns", campaignRoutes);

// Health check
app.get("/health", (req, res) => {
  res.json({
    status: "Server Running",
    timestamp: new Date().toISOString(),
    version: "1.0.0",
    database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'
  });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Server error:', error);
  res.status(500).json({
    success: false,
    error: 'Internal server error'
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 AdVantage Gen API Server running on port ${PORT}`);
  console.log(`📊 Health check available at http://localhost:${PORT}/health`);
});
