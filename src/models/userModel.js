var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
       default: "",
    },
    email: {
      type: String,
      required: true,
       default: "",
    },
   password: {
      type: String,
      required: false
    },
    isActive:{
      type: Boolean,
      default: false,
      required: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      required: false,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", userSchema);
