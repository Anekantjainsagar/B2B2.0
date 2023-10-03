const mongoose = require("mongoose");

const meetingsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  location: String,
  startDate: {
    type: Date,
    default: Date.now,
  },
  attendee: String,
  time: String,
  type: String,
  link: String,
  phone: Number,
});

const Meeting = mongoose.model("meetings", meetingsSchema);
module.exports = Meeting;
