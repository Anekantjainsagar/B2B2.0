const express = require("express");
const db = express.Router();
const path = require("path");
const multer = require("multer");
const csvtojson = require("csvtojson");

const School = require("../db/model/schoolSchema");

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "/uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

var uploads = multer({ storage });

db.get("/download-format", async (req, res) => {
  res.download(path.join(__dirname, "/uploads/SchoolsImport.csv"));
});

db.post("/upload", uploads.single("file"), async (req, res) => {
  const filePath = __dirname + "/uploads/" + req.file.filename;
  const schools = await School.find();
  var arrayToInsert = [];

  csvtojson()
    .fromFile(filePath)
    .then(async (source) => {
      var id = schools.length + 1;
      for (var i = 0; i < source.length; i++) {
        if (source[i]["name"]?.length > 0) {
          var singleRow = {
            name: source[i]["name"],
            id: ++id,
            email: source[i]["email"],
            address: source[i]["address"],
            category: source[i]["category"],
            city: source[i]["city"],
            noOfStudents: source[i]["noOfStudents"],
            phone: source[i]["phone"],
            board: source[i]["board"],
            schoolFee: source[i]["schoolFee"],
            schoolLink: source[i]["schoolLink"],
            state: source[i]["state"],
            type: source[i]["type"],
            website: source[i]["website"],
            principal: {
              name: source[i]["Principal Name"],
              role: source[i]["Principal Role"],
              phone: source[i]["Principal Phone"],
              email: source[i]["Principal Email"],
            },
            trustee: {
              name: source[i]["Trustee Name"],
              role: source[i]["Trustee Role"],
              phone: source[i]["Trustee Phone"],
              email: source[i]["Trustee Email"],
            },
            coordinator: {
              name: source[i]["Coordinator Name"],
              role: source[i]["Coordinator Role"],
              phone: source[i]["Coordinator Phone"],
              email: source[i]["Coordinator Email"],
            },
            handlerName: source[i]["Handler"],
          };
        }
        arrayToInsert.push(singleRow);
      }
      let result = await School.insertMany(arrayToInsert);
      res.send(result);
    });
});

db.get("/getSchools", async (req, res) => {
  var { handler, name } = req.query;

  if (!handler) {
    handler = "";
  }

  if (!name) {
    name = "";
  }

  let schools = await School.find({
    name: { $regex: name, $options: "i" },
    handlerName: { $regex: handler, $options: "i" },
  }).sort({ id: -1 });

  let schoolOriginal = await School.find({
    name: { $regex: name, $options: "i" },
  }).sort({ id: -1 });

  if (handler == "Vidushi") {
    schools = [...schoolOriginal];
  } else {
    schools = [...schools];
  }

  const objectOfSchools = schools.map((school) => {
    return {
      ...school._doc,
      logo: `data:${
        school?.logo?.contentType
      };base64,${school?.logo?.data?.toString("base64")}`,
    };
  });
  res.json({ schools: objectOfSchools });
});

db.delete("/deleteSchool", (req, res) => {
  const { id } = req.body;
  School.deleteOne({ _id: id }, (err, data) => {
    res.send(data);
  });
});

module.exports = db;
