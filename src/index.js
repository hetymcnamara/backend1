import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import { userRouter } from "./routes/users.js";
import { mountainRouter } from "./routes/mountains.js";
import { dataSeedRouter } from "./routes/resortData.js";

const app = express();

// GLOBAL CONFIGURATION PULLED FROM ENV FILE
const mongoURI = process.env.MONGO_URI;
const db = mongoose.connection;
mongoose.connect(mongoURI);

// CONNECTION ERROR/SUCCESS - OPTIONAL BUT HELPFUL
// DEFINE CALLBACK FUNCTIONS FRO VARIOUS EVENTS
db.on("error", (err) => console.log(err.message + " is Mongod not running?"));
db.on("open", () => console.log("mongo connected: ")); // mongoURI
db.on("close", () => console.log("mongo disconnected"));

// MIDDLEWARE
app.use(express.json());
app.use(cors());

// AUTHENTICATION ROUTE
app.use("/auth", userRouter);
app.use("/mountain", mountainRouter);
app.use("/dataseed", dataSeedRouter);

app.listen(3001, () => console.log("listening"));
