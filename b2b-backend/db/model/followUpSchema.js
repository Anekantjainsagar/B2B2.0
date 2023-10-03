const mongoose = require("mongoose");

const followUpSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  schoolId: String,
  userId: String,
  startDate: {
    type: Date,
    default: Date.now,
  },
  time: String,
  done: {
    type: Boolean,
    default: false,
  },
  mode: String,
});

const Follow = mongoose.model("followUP", followUpSchema);
module.exports = Follow;
