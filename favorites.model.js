const mongoose = require('mongoose');
const { Schema } = mongoose;

// Favorites Schema
const favoritesSchema = new Schema({
  profileId: {
    type: String,
    
    required: true
  },
  favoriteFoods: [{ type: String }],  
  favoriteDrinks: [{ type: String }], 
})

const Favorites = mongoose.model('Favorites', favoritesSchema,'Favorites');

module.exports = Favorites;
