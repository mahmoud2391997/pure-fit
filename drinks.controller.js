const Drinks = require("./drinks.model");
const Mongoose = require("mongoose");

const getDrinks = async (req, res) => {
  try {
    const drinks = await Drinks.find({});
    res.json(drinks);
  } catch (error) {
    res.status(500).json("internal server error");
    return null;
  }
};
const addDrink = async (req, res) => {
 const food = req.body
 console.log(food)
  try {
    const response = await Drinks.create({...food});
     console.log(response)

    res.json(response);
  } catch (error) {
    res.status(500).json("internal server error");
    return null;
  }
};
const editDrink= async (req, res) => {
    const Id = req.params.id;

 const drink = req.body
  try {
    const response = await Drinks.updateOne(
      { _id: new Mongoose.Types.ObjectId(Id) },
      { $set: drink },
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
getDrinks,editDrink,addDrink};
