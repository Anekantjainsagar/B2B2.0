const mongoose = require("mongoose");
const DB = process.env.DB;

const connect = ()=>{
    mongoose
      .connect(DB)
      .then(() => {
        console.log("Connection successful...");
      })
      .catch((err) => {
        console.log(err);
      });
}

module.exports = connect