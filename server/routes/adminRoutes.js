// routes/adminRoutes.js

import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/user.model";

const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await UserModel.findOne({ email });
    if (!admin) return res.status(400).json({ message: "Admin not found" });

    const isMatch = bcrypt.compare(password, admin.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: admin._id, role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/add-teacher", async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const teacherExists = await Teacher.findOne({ email });
    if (teacherExists)
      return res.status(400).json({ message: "Teacher already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newTeacher = new Teacher({
      name,
      email,
      password: hashedPassword,
      role,
    });

    await newTeacher.save();
    res.status(201).json({ message: "Teacher added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error adding teacher" });
  }
});

router.get("/manage-users", async (req, res) => {
  const {
    type,
    page = 1,
    limit = 10,
    search = "",
    dateFrom,
    dateTo,
  } = req.query;
  const skip = (page - 1) * limit;
  const filters = { name: { $regex: search, $options: "i" } };

  if (dateFrom && dateTo) {
    filters.createdAt = { $gte: new Date(dateFrom), $lte: new Date(dateTo) };
  }

  try {
    let users = [];
    if (type === "teacher") {
      users = await Teacher.find(filters).skip(skip).limit(Number(limit));
    } else if (type === "student") {
      users = await Student.find(filters).skip(skip).limit(Number(limit));
    }

    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: "Error fetching users" });
  }
});

router.get("/user-profile/:id", async (req, res) => {
  const { id } = req.params;

  try {
    let user = null;
    if (req.query.type === "teacher") {
      user = await Teacher.findById(id).populate("attendance");
    } else if (req.query.type === "student") {
      user = await Student.findById(id).populate("attendance");
    }

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Error fetching user profile" });
  }
});

router.patch("/restrict-user/:id", async (req, res) => {
  const { id } = req.params;

  try {
    let user = null;
    if (req.body.type === "teacher") {
      user = await Teacher.findById(id);
    } else if (req.body.type === "student") {
      user = await Student.findById(id);
    }

    if (!user) return res.status(404).json({ message: "User not found" });

    user.status = "inactive"; // Set status to 'inactive'
    await user.save();

    res.status(200).json({ message: "User login access disabled" });
  } catch (error) {
    res.status(500).json({ message: "Error updating user status" });
  }
});

router.patch("/change-password", async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  try {
    const admin = await Admin.findById(req.user.id); // Assuming you're using JWT auth with `req.user`
    const isMatch = await bcrypt.compare(currentPassword, admin.password);
    if (!isMatch)
      return res.status(400).json({ message: "Current password is incorrect" });

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    admin.password = hashedNewPassword;
    await admin.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating password" });
  }
});

export default router;
