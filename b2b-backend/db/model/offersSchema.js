const mongoose = require("mongoose");

const OffersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  details: String,
  duration: String,
  curriculum: String,
  brochure: String,
  circular: String,
  kit: Boolean,
  pricing: Array,
  status: {
    type: String,
    default:"UnApproved"
  }
});

const Offer = mongoose.model("offers", OffersSchema);
module.exports = Offer;
