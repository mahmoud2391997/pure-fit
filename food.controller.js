const Food = require("./food.model");
const Mongoose = require("mongoose");

// Get all foods
const getFoods = async (req, res) => {
  try {
    const foods = await Food.find({});
    res.json(foods);
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal server error");
  }
};

// Add new food
const addFood = async (req, res) => {
  const food = req.body;
  try {
    const response = await Food.create(food);
    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal server error");
  }
};

// Edit food by ID
const editFood = async (req, res) => {
  const id = req.params.id;
  const food = req.body;

  try {
    const response = await Food.updateOne(
      { _id: new Mongoose.Types.ObjectId(id) },
      { $set: food },
      { upsert: false }
    );

    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal server error");
  }
};

// Delete food by ID
const deleteFood = async (req, res) => {
  const id = req.params.id;

  try {
    const response = await Food.deleteOne({
      _id: new Mongoose.Types.ObjectId(id),
    });

    if (response.deletedCount === 0) {
      return res.status(404).json({ message: "Food not found" });
    }

    res.json({ message: "Food deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal server error");
  }
};

module.exports = {
  getFoods,
  addFood,
  editFood,
  deleteFood,
};
