import express, {Request, Response} from "express"
import roomsRouter from "./routes/rooms"
import mongoose from "mongoose";
import cors from "cors";
require('dotenv').config();


const app = express()
app.use(express.json());
const MONGO_URL: string=process.env.MONGO_URL ??""
app.use(cors());

app.use("/api", roomsRouter); // Use the router

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB");

    app.listen(4500, () => {
      console.log("App running at port 4500");
    });
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err);
  });