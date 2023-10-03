const mongoose = require("mongoose");

const loginSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  type: {
    type: String,
  },
});

const Login = mongoose.model("registrations", loginSchema);
module.exports = Login;
