const mongoose = require("mongoose");

const schoolSchema = new mongoose.Schema({
  id: Number,
  handlerName: {
    type: String,
    default: "Vidushi"
  },
  name: {
    type: String,
    required: true,
  },
  logo: {
    data: Buffer,
    contentType: String,
  },
  website: String,
  address: String,
  city: String,
  state: String,
  email: String,
  phone: Number,
  schoolLink: String,
  board: String,
  type: String,
  noOfStudents: Number,
  schoolFee: Number,
  category: String,
  principal: Object,
  trustee: Object,
  coordinator: Object,
});

const School = mongoose.model("schools", schoolSchema);
module.exports = School;
