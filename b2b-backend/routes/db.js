const express = require("express");
const db = express.Router();

const School = require("../db/model/schoolSchema");

db.get("/getSchools", async (req, res) => {
  var { handler, name } = req.query;

  if (!handler) {
    handler = "";
  }

  if (!name) {
    name = "";
  }

  let schools = await School.find({
    handlerName: { $regex: handler, $options: "i" },
    name: { $regex: handler, $options: "i" },
  });

  let schoolOriginal = await School.find();

  if (handler == "Vidushi") {
    schools = [...schoolOriginal];
  } else {
    schools = [...schools];
  }

  const objectOfSchools = schools.map((school) => {
    return {
      id: school.id,
      _id: school._id,
      address: school.address,
      category: school.category,
      city: school.city,
      coordinator: school.coordinator,
      email: school.email,
      name: school.name,
      noOfStudents: school.noOfStudents,
      phone: school.phone,
      board: school.board,
      principal: school.principal,
      schoolFee: school.schoolFee,
      schoolLink: school.schoolLink,
      state: school.state,
      trustee: school.trustee,
      type: school.type,
      website: school.website,
      handlerName: school.handlerName,
      logo: `data:${
        school?.logo?.contentType
      };base64,${school?.logo?.data?.toString("base64")}`,
      category: school.category,
    };
  });
  res.json({ schools: objectOfSchools });
});

module.exports = db;
