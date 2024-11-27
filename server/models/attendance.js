import mongoose from "mongoose";

const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  punchInTime: {
    type: String,
    required: true,
  },
  selfie: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Attendance", attendanceSchema);
