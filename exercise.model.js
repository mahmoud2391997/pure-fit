const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define Exercise Schema
const exerciseSchema = new Schema({
  categoryId: {
    type: String,
    required: true,
  },
  equipment: {
    type: String,
    required: true,
  },
  gifUrl: {
    type: String,
    required: true,
  },
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  target: {
    type: String,
    required: true,
  },
  secondaryMuscles: {
    type: [String],
    required: true,
  },
  instructions: {
    type: [String],
    required: true,
  },
});

// Create Exercise model
const Exercise = mongoose.model("Exercises", exerciseSchema, "Exercises");

module.exports = Exercise;
