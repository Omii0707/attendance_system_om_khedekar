import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    name: { type: String },
    mobile: { type: String, unique: true },
    email: { type: String, unique: true },
    password: String,
    class: String,
    role: { type: String, enums: ["student", "admin", "teacher"] },
  },
  { timestamps: true }
);

const UserModel = mongoose.model("User", userSchema);

export { UserModel };
