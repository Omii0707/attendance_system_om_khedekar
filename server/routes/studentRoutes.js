const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Student = require("../models/Student");

const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    const { name, email, password, rollno } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const student = new Student({
      name,
      email,
      rollno,
      password: hashedPassword,
    });
    await student.save();
    res.status(201).json({ message: "Registration successful" });
  } catch (error) {
    res.status(400).json({ error: "Error during registration" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const student = await Student.findOne({ email });
    if (!student) return res.status(404).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: student._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(200).json({ token, student });
  } catch (error) {
    res.status(400).json({ error: "Error during login" });
  }
});

const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

router.post("/attendance", upload.single("selfie"), async (req, res) => {
  try {
    const studentId = req.user.id;
    const { date, punchInTime } = req.body;

    const student = await Student.findById(studentId);
    if (!student) return res.status(404).json({ error: "Student not found" });

    student.attendance.push({ date, punchInTime, selfie: req.file.path });
    await student.save();

    res.status(200).json({ message: "Attendance marked" });
  } catch (error) {
    res.status(400).json({ error: "Error marking attendance" });
  }
});

router.get("/attendance-history", async (req, res) => {
  try {
    const studentId = req.user.id;
    const student = await Student.findById(studentId);

    if (!student) return res.status(404).json({ error: "Student not found" });

    res.status(200).json(student.attendance);
  } catch (error) {
    res.status(400).json({ error: "Error fetching attendance history" });
  }
});

export default router;
