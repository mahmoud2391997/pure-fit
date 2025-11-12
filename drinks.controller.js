const Drinks = require("./drinks.model");
const Mongoose = require("mongoose");

// Get all drinks
const getDrinks = async (req, res) => {
  try {
    const drinks = await Drinks.find({});
    res.json(drinks);
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal server error");
  }
};

// Add a new drink
const addDrink = async (req, res) => {
  const drink = req.body;
  try {
    const response = await Drinks.create(drink);
    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal server error");
  }
};

// Edit a drink by ID
const editDrink = async (req, res) => {
  const id = req.params.id;
  const drink = req.body;

  try {
    const response = await Drinks.updateOne(
      { _id: new Mongoose.Types.ObjectId(id) },
      { $set: drink },
      { upsert: false }
    );
    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal server error");
  }
};

// Delete a drink by ID
const deleteDrink = async (req, res) => {
  const id = req.params.id;

  try {
    const response = await Drinks.deleteOne({
      _id: new Mongoose.Types.ObjectId(id),
    });

    if (response.deletedCount === 0) {
      return res.status(404).json({ message: "Drink not found" });
    }

    res.json({ message: "Drink deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal server error");
  }
};

module.exports = {
  getDrinks,
  addDrink,
  editDrink,
  deleteDrink,
};
