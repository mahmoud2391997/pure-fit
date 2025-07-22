const Food = require("./food.model");
const Mongoose = require("mongoose");

const getFoods = async (req, res) => {
  try {
    const foods = await Food.find({});
    res.json(foods);
  } catch (error) {
    res.status(500).json("internal server error");
    return null;
  }
};
const addFood = async (req, res) => {
 const food = req.body
 console.log(food)
  try {
    const response = await Food.create({...food});
     console.log(response)

    res.json(response);
  } catch (error) {
    res.status(500).json("internal server error");
    return null;
  }
};
const editFood = async (req, res) => {
    const Id = req.params.id;

 const food = req.body
  try {
    const response = await Food.updateOne(
      { _id: new Mongoose.Types.ObjectId(Id) },
      { $set: food },
      { upsert: false }
    );
    console.log(res)
    res.json(response);
        return null;

  } catch (error) {
    res.status(500).json("internal server error");
    return null;
  }
};

module.exports = {
  getFoods,addFood,editFood
};
