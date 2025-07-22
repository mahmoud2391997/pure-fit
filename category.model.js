const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const CategorySchema = new Schema({
  thumbnail: { type: String, required: true },
  programName: { type: String, required: true },
  workoutName: { type: String, required: true },
  timeOf_FullProgram: { type: String, required: true }, // e.g., "60 minutes"
  level: { type: String, required: true }, // e.g., "Beginner", "Intermediate", "Advanced"
  burnedCalories: { type: Number, required: true },
});


// Create and export the model
const Category = mongoose.model('Categories', CategorySchema,'Categories');

module.exports = Category;
