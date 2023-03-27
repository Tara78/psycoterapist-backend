import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import userRouth from "./routes/user.js";
import loginRouth from "./routes/login.js";
import bookingRouth from "./routes/booking.js";
import * as dotenv from "dotenv";

dotenv.config();

const mongoUrl =
  process.env.MONGO_URL || "mongodb://127.0.0.1/final-project-user";

mongoose.set("strictQuery", false);
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.Promise = Promise;

mongoose.connection.on("disconnected", () => {
  console.log("mongoDB Disconnected!");
});

mongoose.connection.on("connected", () => {
  console.log("mongoDB Connected!");
});

const port = 8000;
const app = express();

app.use(cors());
app.use(bodyParser.json());

/** Middleware */
app.get("/", (req, res) => {
  res.send("Hello Client!");
});

app.use(express.json());
app.use("/user", userRouth);
app.use("/login", loginRouth);
app.use("/booking", bookingRouth);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong";
  return res.status(errorStatus).json({
    success: false,
    statuse: err.status,
    message: errorMessage,
    stack: err.stack,
  });
  
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
