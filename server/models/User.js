const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

  // NAME
  name: {
    type: String,
    required: true,
    trim: true,
  },

  // EMAIL
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },

  // PASSWORD
  password: {
    type: String,
    required: true,
  },

  // PROFILE PICTURE
  profilePic: {
    type: String,
    default: "",
  },

},
{
  timestamps: true,
});

module.exports = mongoose.model(
  "User",
  userSchema
);