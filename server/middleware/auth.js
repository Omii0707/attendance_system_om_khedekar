import jwt from "jsonwebtoken";
import { UserModel } from "../models/user.model";

const verifyUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res
        .status(404)
        .json({ success: false, error: "Token not provided" });
    }

    const decoded = jwt.verify(token, process.env.KEY);
    if (!decoded) {
      return res.status(404).json({ success: false, error: "Token not valid" });
    }

    const user = await UserModel.findById({ _id: decoded._id }).select(
      "-password"
    );

    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    req.user = user;

    next();
  } catch (error) {
    return res.status(500).json({ success: false, error: "server error" });
  }
};

export default verifyUser;
