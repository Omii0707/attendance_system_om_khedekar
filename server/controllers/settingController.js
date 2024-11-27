import { UserModel } from "../models/user.model";
import bcrypt from "bcryptjs";

const changePassword = async (req, res) => {
  try {
    const { userId, oldPassword, newPassword } = req.body;

    // Check if userId or passwords are missing
    if (!userId || !oldPassword || !newPassword) {
      return res.status(400).json({ success: false, error: "Missing fields" });
    }

    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    // Compare old password
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, error: "Incorrect old password" });
    }

    // Hash new password
    const hashPassword = await bcrypt.hash(newPassword, 10);

    // Update password
    await UserModel.findByIdAndUpdate(userId, { password: hashPassword });
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error in changePassword controller:", error.message);
    return res
      .status(500)
      .json({ success: false, error: "Internal server error" });
  }
};

export { changePassword };
