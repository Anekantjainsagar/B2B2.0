const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  schoolName: {
    type: String,
    required: true,
  },
  schoolId: String,
  description: String,
  status: String,
  id: Number,
  phone: Number,
  offer: String,
  source: String,
  handler: String,
  model: String,
  payment: String,
  mode: String,
  stage: String,
  paid:Boolean,
  file: {
    data: Buffer,
    contentType: String,
  },
  startDate: {
    type: Date,
    default: Date.now,
  },
  inqDate: { type: Date, default: Date.now },
  deadline: { type: Date, default: Date.now },
  comment: [
    {
      msg: String,
      user: {
        type: String,
        default: "Saman",
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

const User = mongoose.model("user", userSchema);
module.exports = User;
