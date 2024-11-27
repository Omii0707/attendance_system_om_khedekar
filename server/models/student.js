import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  punchInTime: { type: String },
  selfie: { type: String },
});

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  rollno: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilePicture: { type: String },
  attendance: [attendanceSchema],
});

module.exports = mongoose.model("Student", studentSchema);
