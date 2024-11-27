import { UserModel } from "./models/user.model.js";
import bcrypt from "bcryptjs";
import connectDB from "./models/db.js";

const userRegister = async () => {
  connectDB();
  try {
    const hashPassword = await bcrypt.hash("admin", 10);
    const newUser = new UserModel({
      name: "Admin",
      email: "admin@gmail.com",
      password: hashPassword,
      role: "admin",
    });

    await newUser.save();
  } catch (error) {
    console.log(error);
  }
};

userRegister();
