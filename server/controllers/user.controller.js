import userService from "../services/user.service.js";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/user.model.js";

const userController = {
  handleLogin(req, res) {
    const { email, password, role } = req.body;

    UserModel.findOne({ email, role: role })
      .then(async (user) => {
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign(
          { id: user._id, role: user.role },
          process.env.JWT_SECRET,
          {
            expiresIn: "1h",
          }
        );

        res.status(200).json({ token, message: "Login successful" });
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ message: "Server error", error: err });
      });
  },

  handleCreateUser(req, res) {
    const user = req?.body;
    userService
      .createUser(user)
      .then((result) => {
        if (!result) throw new Error("not creted");
        res?.status(201).send({ data: result, message: "User created" });
      })
      .catch((error) => {
        res
          ?.status(500)
          ?.send({ error, message: "Could not created the user" });
      });
  },

  handleGetAllUsers(req, res) {
    userService
      ?.getAllUsers()
      .then((data) => {
        res.status(200).send({ data, message: "User list" });
      })
      .catch((err) => {
        console.error(err);
        res.status(404).send({ error: err, message: "users not available" });
      });
  },
};

export default userController;
