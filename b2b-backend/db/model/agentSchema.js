const mongoose = require("mongoose");

const agentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  phone: Number,
});

const Agent = mongoose.model("agents", agentSchema);
module.exports = Agent;
