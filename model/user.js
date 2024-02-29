const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let userSchema = new Schema({
    firstName: {
      type: String
    },
    lastName: {
      type: String
    },
    email: {
      type: String,
      lowercase: true
    },
  }, {
    timestamps: true,
   });
  let User = mongoose.model("User", userSchema);
  module.exports = User;