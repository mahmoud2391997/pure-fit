const Profile = require("./user.model");
const Mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const secretKey = process.env.SECRET_KEY;
const getProfile = (req, res) => {
  const token = req.headers["authorization"].substring(7);

  jwt.verify(token, secretKey, async (err, decoded) => {
    if (err) {
      // Token is invalid
      console.error("Invalid token");
    } else {
      // Token is valid
      const { email, role } = decoded.user;
      console.log("Email:", email);
      try {
        const profile = await Profile.findOne({ userEmail: email });

        res.json({id:profile._id,userEmail:profile.userEmail,userName:profile.userName,age:profile.age,userHeight:profile.userHeight,userWeight:profile.userWeight,gender:profile.gender,goalSteps:profile.goalSteps,image:profile.image,calender:profile.calender,activity:profile.activity,favourateCategories:profile.favourateCategories,goal:profile.goal});
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
      }
    }
  });
};
const editProfile = async (req, res) => {
  const Id = req.params.id;
  const editedProfile = req.body;
  console.log(editedProfile);

  try {
    await Profile.updateOne(
      { _id: new Mongoose.Types.ObjectId(Id) },
      { $set: editedProfile },
      { upsert: false }
    );

    res.json(editedProfile);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const deleteProfile = async (req, res) => {
  const Id = req.params.id;
  console.log(Id);

  try {
    const deleteProfile = await Profile.deleteOne({
      _id: new Mongoose.Types.ObjectId(Id),
    });

    res.json(deleteProfile);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { editProfile, deleteProfile, getProfile };
