var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var messageSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
       default: "",
    },
    sender: {
      type: String,
      required: true,
       default: "",
    },
    senderid: {
      type: String,
      required: true,
      default: "",
    },
    timestamp:{
      type: String,
      required: false,
      default: "",
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

module.exports = mongoose.model("message", messageSchema);
