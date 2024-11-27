import express from "express";
import bcrypt from "bcryptjs";
const router = express.Router();
import { User } from "../models/User.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { login, verify } from "../controllers/authController.js";
import verifyUser from "../middleware/auth.js";

router.post("/signup", async (req, res) => {
  const { username, email, password, userType } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    return res.json({ message: "user already existed" });
  }

  const hashpassword = await bcrypt.hash(password, 10);
  const newUser = new User({
    username,
    email,
    password: hashpassword,
    userType,
  });

  await newUser.save();
  return res.json({ status: true, message: "record registed" });
});

router.post("/login", login, async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.json({ message: "User is not registered" });
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.json({ message: "Password is incorrect" });
  }

  const token = jwt.sign(
    { username: user.username, email: user.email, id: user._id },
    process.env.KEY,
    {
      expiresIn: "1h",
    }
  );

  return res.json({
    success: true,
    message: "Login successfully",
    token,
    user,
  });
});

router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ message: "user not registered" });
    }
    const token = jwt.sign({ id: user._id }, process.env.KEY, {
      expiresIn: "5m",
    });

    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "your email@gmail.com",
        pass: "your pass key",
      },
    });
    const encodedToken = encodeURIComponent(token).replace(/\./g, "%2E");
    var mailOptions = {
      from: "your email@gmail.com",
      to: email,
      subject: "Reset Password",
      text: `http://localhost:5173/resetPassword/${encodedToken}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        return res.json({ message: "error sending email" });
      } else {
        return res.json({ status: true, message: "email sent" });
      }
    });
  } catch (err) {
    console.log(err);
  }
});
router.post("/reset-password/:token", async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  try {
    const decoded = await jwt.verify(token, process.env.KEY);
    const id = decoded.id;
    const hashPassword = await bcrypt.hash(password, 10);
    await User.findByIdAndUpdate({ _id: id }, { password: hashPassword });
    return res.json({ status: true, message: "updated password" });
  } catch (err) {
    return res.json("invalid token");
  }
});

router.get("/verify", verifyUser, verify);

router.get("/logout", (req, res) => {
  // Logout logic should be handled client-side.
  // You could optionally clear a cookie or token-related data on the server here.
  res.json({ success: true, message: "Logout successful" });
});

router.post("/userData", async (req, res) => {
  const { token } = req.body;
  try {
    const user = jwt.verify(token, process.env.KEY, (err, decoded) => {
      if (err) {
        return "token expired";
      }
      return decoded;
    });

    if (user === "token expired") {
      return res.status(401).json({ status: "error", data: "Token expired" });
    }

    const useremail = user.email;
    const foundUser = await User.findOne({ email: useremail });

    if (foundUser) {
      res.json({ status: "ok", data: foundUser });
    } else {
      res.status(404).json({ status: "error", message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: "Server error" });
  }
});

// Super Admin dashboard route
router.get("/superadmin", verifyUser, async (req, res) => {
  if (req.user.userType !== "SuperAdmin") {
    return res.status(403).json({ message: "Unauthorized" });
  }

  try {
    const allUsers = await User.find(); // Example: Fetch all users for Super Admin
    res.json({ success: true, users: allUsers });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

export { router as UserRouter };
