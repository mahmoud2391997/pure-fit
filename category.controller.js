const Category = require("./category.model");
const Mongoose = require("mongoose");

const getCategories = async (req, res) => {
  try {
    const Categories = await Category.find({});
    res.json(Categories);
            return null;

  } catch (error) {
    res.status(500).json("internal server error");
    return null;
  }
};
const addCategory = async (req, res) => {
 const category = req.body
 console.log(category)
  try {
    const response = await Category.create({...category});
     console.log(response)

    res.json(response);
  } catch (error) {
    res.status(500).json("internal server error");
    return null;
  }
};
const editCategory = async (req, res) => {
    const Id = req.params.id;

 const category = req.body
  try {
    const response = await Category.updateOne(
      { _id: new Mongoose.Types.ObjectId(Id) },
      { $set: category },
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
  getCategories,addCategory,editCategory
};
