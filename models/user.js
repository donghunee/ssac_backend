const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: { type: String, unique: true, required: true },
  nickName: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  type: { type: String, default: null },
  age: { type: Number, default: null },
  gender: { type: String, enum: ["male", "female"], default: "male" },
  degree: { type: Number, default: 0 },
  inoDate: { type: Date, default: null },
  verified: { type: Boolean, default: false },
  profileImage: { type: String, default: null },
});

module.exports = mongoose.model("user", userSchema);
