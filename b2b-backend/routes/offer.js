const express = require("express");
const offer = express.Router();
const Offer = require("../db/model/offersSchema");

offer.get("/getOffers", async (req, res) => {
  let { name } = req.query;

  if (!name) {
    name = "";
  }

  const offers = await Offer.find({
    name: { $regex: name, $options: "i" },
  });
  res.send(offers);
});

module.exports = offer;
