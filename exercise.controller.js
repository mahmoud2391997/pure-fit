const Exercise = require("./exercise.model");
const Mongoose = require("mongoose");

const getExercises = async (req, res) => {
  const categoryId = req.params.categoryId;
  try {
    const exercises = await Exercise.find({ categoryId: categoryId });
    res.json(exercises);
  } catch (error) {
    console.error(error);
    res.status(500).json("internal server error");
  }
};

const addExercise = async (req, res) => {
  const newExercise = req.body;
  console.log(newExercise);

  try {
    const exercise = await Exercise.create({ ...newExercise });
    console.log(exercise);
    res.json(exercise);
  } catch (error) {
    console.error(error);
    res.status(500).json("internal server error");
  }
};

const editExercise = async (req, res) => {
  const Id = req.params.exersiceId;
  console.log(Id);

  const exercise = req.body;
  console.log(exercise);

  try {
    const response = await Exercise.updateOne(
      { _id: new Mongoose.Types.ObjectId(Id) },
      { $set: exercise },
      { upsert: false }
    );
    console.log(response);
    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json("internal server error");
  }
};

// ✅ New: Delete Exercise by ID
const deleteExercise = async (req, res) => {
  const Id = req.params.exersiceId;
  console.log("Deleting exercise:", Id);

  try {
    const result = await Exercise.deleteOne({ _id: new Mongoose.Types.ObjectId(Id) });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Exercise not found" });
    }
    res.json({ message: "Exercise deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json("internal server error");
  }
};

module.exports = {
  getExercises,
  editExercise,
  addExercise,
  deleteExercise
};
