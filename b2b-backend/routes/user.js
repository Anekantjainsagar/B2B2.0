const express = require("express");
const user = express.Router();

const User = require("../db/model/usersSchema");

user.get("/getUsers", async (req, res) => {
  var { page, size, search, handler, stage, status, source, offer } = req.query;

  if (!page) {
    page = 1;
  }

  if (!size) {
    size = 10;
  }

  if (!search) {
    search = "";
  }

  if (handler == "Vidushi" || !handler) {
    handler = "";
  }

  if (!stage) {
    stage = "";
  }

  if (!status) {
    status = "";
  }

  if (!source) {
    source = "";
  }

  if (!offer) {
    offer = "";
  }

  const limit = parseInt(size);

  const noOfUsers = await User.find({
    schoolName: { $regex: search, $options: "i" },
    handler: { $regex: handler, $options: "i" },
    stage: { $regex: stage, $options: "i" },
    status: { $regex: status, $options: "i" },
    source: { $regex: source, $options: "i" },
    offer: { $regex: offer, $options: "i" },
  });
  const users = await User.find({
    schoolName: { $regex: search, $options: "i" },
    handler: { $regex: handler, $options: "i" },
    stage: { $regex: stage, $options: "i" },
    status: { $regex: status, $options: "i" },
    source: { $regex: source, $options: "i" },
    offer: { $regex: offer, $options: "i" },
  })
    .sort({ inqDate: -1 })
    .limit(limit);

  res.send({
    page,
    size,
    users: users,
    noOfUsers: noOfUsers.length,
  });
});

user.get("/getAllUsers", async (req, res) => {
  let { handler } = req.query;

  if (handler == "Vidushi" || !handler) {
    handler = "";
  }

  let users = await User.find({ handler: { $regex: handler, $options: "i" } });
  res.send(users);
});

user.delete("/deleteUser", (req, res) => {
  const { id } = req.body;
  User.deleteOne({ _id: id }, (err, data) => {
    res.send(data);
  });
});

module.exports = user;
