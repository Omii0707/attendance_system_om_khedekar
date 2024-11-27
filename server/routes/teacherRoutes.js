import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/user.model";
// const Student = require('../models/Student');
// const Student = require('../models/Student');s

//add models like student and attendance
const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const teacher = await Teacher.findOne({ email });
    if (!teacher) return res.status(400).json({ message: "Teacher not found" });

    const isMatch = await bcrypt.compare(password, teacher.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: teacher._id, role: "teacher" },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/attendance", async (req, res) => {
  const { date, page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;

  try {
    const attendanceRecords = await Attendance.find({ date })
      .skip(skip)
      .limit(Number(limit))
      .populate("student", "name profilePicture");

    res.status(200).json({ attendanceRecords });
  } catch (error) {
    res.status(500).json({ message: "Error fetching attendance" });
  }
});

// Get Student List
router.get("/students", async (req, res) => {
  const { page = 1, limit = 10, search = "" } = req.query;
  const skip = (page - 1) * limit;

  try {
    const students = await Student.find({
      name: { $regex: search, $options: "i" },
    })
      .skip(skip)
      .limit(Number(limit));

    res.status(200).json({ students });
  } catch (error) {
    res.status(500).json({ message: "Error fetching students" });
  }
});

// View student profile
router.get("/student/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id).populate(
      "attendance"
    );
    if (!student) return res.status(404).json({ message: "Student not found" });

    res.status(200).json({ student });
  } catch (error) {
    res.status(500).json({ message: "Error fetching student profile" });
  }
});

module.exports = router;

export default router;
