const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
  school: String,
  programId: String,
  reportId: String,
  offer: String,
  className: String,
  division: {
    type: Number,
    default: 1,
  },
  noOfStudents: String,
  price: String,
  batchDetails: {
    noOfStudents: String,
    location: String,
    days: Array,
    startDate: {
      type: Date,
      default: Date.now,
    },
    endDate: {
      type: Date,
      default: Date.now,
    },
    time: String,
    holidays: String,
    noOfSessions: String,
    completedSessions: String,
    educator: String,
    hrs: Number,
  },
  students: [
    {
      name: String,
      email: String,
      phone: String,
      amount: String,
      attend: String,
      status: {
        type: String,
        default: "Pending",
      },
    },
  ],
});

const Report = mongoose.model("report", reportSchema);
module.exports = Report;
