// Import required modules
const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const userRoute = require("../user.route")
const exerciseRoute = require("../exercise.route")
const profileRoute = require("../profile.route")
const categoryRoute = require("../category.route")
const favoritesRoute = require("../favorites.route")
const foodRoute = require("../food.route")
const drinksRoute = require("../drinks.route")
const calenderRoute = require("../calendar.route")
const { aiChat } = require("../gemini.controller")

// Create an Express application
const app = express()

require("dotenv").config()
const connectionString = process.env.DB_CONNECTION_STRING

// Connect to MongoDB
// Cache the connection to avoid reconnecting on every serverless function invocation
let cachedDb = null

async function connectToDatabase() {
  if (cachedDb) {
    return cachedDb
  }
  const client = await mongoose.connect(connectionString, { dbName: "Fit-Pro" })
  cachedDb = client.connection.db
  console.log("Connected to database!")
  return cachedDb
}

app.use(express.json())
app.use(cors()) // Apply CORS middleware globally

// Routes
app.use("/auth", userRoute)
app.use("/api/exercises", exerciseRoute)
app.use("/api/categories", categoryRoute)
app.use("/api/foods", foodRoute)
app.use("/api/drinks", drinksRoute)
app.use("/api/calendar", calenderRoute)
app.post("/api/gemini", aiChat)
app.use("/api/profile", profileRoute)
app.use("/api/favorites", favoritesRoute)

app.get("/", (req, res) => {
  res.send("Hello, World!")
})

// Middleware to ensure database connection for all API routes
app.use(async (req, res, next) => {
  try {
    await connectToDatabase()
    next()
  } catch (error) {
    console.error("Database connection failed:", error)
    res.status(500).json({ error: "Database connection failed" })
  }
})
if (require.main === module) {
  const port = process.env.PORT || 3000 // Use PORT environment variable or default to 3000
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`)
  })
}
// Export the app as a serverless function handler
module.exports = app
