import express from "express";
import cors from "cors";
import "./models/db.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/students", require("./routes/studentRoutes"));
app.use("/api/teachers", require("./routes/teacherRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// http://localhost:8080/users
