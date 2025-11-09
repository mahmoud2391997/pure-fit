// server.js or index.js

require("dotenv").config(); // Load .env variables
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

// Import routes
const userRoute = require("../user.route");
const exerciseRoute = require("../exercise.route");
const profileRoute = require("../profile.route");
const categoryRoute = require("../category.route");
const favoritesRoute = require("../favorites.route");
const foodRoute = require("../food.route");
const drinksRoute = require("../drinks.route");
const calendarRoute = require("../calendar.route");
const { aiChat } = require("../controllers/gemini.controller");

// MongoDB connection string from .env
const connectionString = process.env.DB_CONNECTION_STRING ;

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

let cachedDb = null;

// Database connection function
async function connectToDatabase() {
  if (cachedDb) return cachedDb;

  try {
    const client = await mongoose.connect(connectionString, {
      dbName: "Fit-Pro",
    });

    mongoose.connection.on("error", (err) => {
      console.error("Mongoose connection error:", err);
    });

    mongoose.connection.once("open", () => {
      console.log("MongoDB connection opened!");
    });

    cachedDb = client.connection.db;
    console.log("Connected to MongoDB Atlas");
    return cachedDb;
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    throw error;
  }
}

// 🔁 Connect to DB on startup (optional but recommended)
connectToDatabase().catch((err) => console.error("Startup DB connection failed:", err));

// Middleware to ensure DB is connected before handling requests
app.use(async (req, res, next) => {
  try {
    await connectToDatabase();
    console.log("connecting"); // You should now see this on every request
    next();
  } catch (error) {
    console.error("Database connection error on request:", error);
    res.status(500).json({ error: "Database connection failed" });
  }
});

// Routes
app.use("/auth", userRoute);
app.use("/api/exercises", exerciseRoute);
app.use("/api/categories", categoryRoute);
app.use("/api/foods", foodRoute);
app.use("/api/drinks", drinksRoute);
app.use("/api/calendar", calendarRoute);
app.use("/api/profile", profileRoute);
app.use("/api/favorites", favoritesRoute);
app.post("/api/gemini", aiChat);

// Base route
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// Start server
if (require.main === module) {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`🚀 Server running at http://localhost:${port}`);
  });
}

// Export app for testing or serverless
module.exports = app;
