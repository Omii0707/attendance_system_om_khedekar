import mongoose from "mongoose";

const url = "mongodb://127.0.0.1:27017/attendance";

const connectDB = async () => {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    mongoose.connection.on("connected", () => {
      console.log("Connected to DB");
    });

    mongoose.connection.on("disconnected", () => {
      console.log("Disconnected from DB");
    });

    mongoose.connection.on("error", (error) => {
      console.error("Error connecting to DB:", error);
    });

    console.log("MongoDB Connection Successful");
  } catch (error) {
    console.error("Error connecting to DB:", error);
    process.exit(1);
  }
};

export default connectDB;
