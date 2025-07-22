const Exercise = require("./exercise.model");
const Mongoose = require("mongoose");

const getExercises = async (req, res) => {
  const categoryId = req.params.categoryId;
  try {
    const exercises = await Exercise.find({ categoryId: categoryId });
    res.json(exercises);
  } catch (error) {
    res.status(500).json("internal server error");
    return null;
  }
};
const addExercise = async (req, res) => {
 const newExercise = req.body
   console.log(newExercise)

  try {
    const exercise = await Exercise.create({...newExercise});
  console.log(exercise)
    res.json(exercise);
  } catch (error) {
    res.status(500).json("internal server error");
    return null;
  }
};
const editExercise = async (req, res) => {
  const Id = req.params.exersiceId;
      console.log(Id)

 const exercise = req.body
 console.log(exercise)
  try {
const response = await Exercise.updateOne(
      { _id: new Mongoose.Types.ObjectId(Id) },
      { $set: exercise },
      { upsert: false }
    );  
    console.log(response)
    res.json(response);
  } catch (error) {
    res.status(500).json("internal server error");
    return null;
  }
};
module.exports = {
  getExercises,editExercise,addExercise
};
