const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  userEmail: { type: String, required: true },
  userName: { type: String, required: true },
  password: { type: String, required: true },
  age: { type: Number, required: true },
  userHeight: { type: Number, required: true },
  userWeight: { type: Number, required: true },
  gender: { type: String, required: true },
  goalSteps: { type: Number },
  image: { type: String },
  verificationCode: { type: String },
  codeExpirationTime: { type: String },
  goal:{type:String,required:false},
 favourateCategories:{
    type: [String],
    required: false,
  },
    activity:{type:String,required:false},


});

const Profile = mongoose.model("Profiles", userSchema, "Profiles");

module.exports = Profile;
