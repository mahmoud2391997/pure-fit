const mongoose = require('mongoose');

const drinksSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  calories: {
    type: Number,
    required: true,
  },
  protein: {
    type: Number,
    required: true,
  },
  fats: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const Food = mongoose.model('Drinks', drinksSchema,"Drinks");

module.exports = Food;
