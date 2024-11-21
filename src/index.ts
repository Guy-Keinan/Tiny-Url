import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import urlRoutes from "./routes/urlRoutes";
import helmet from "helmet";
import compression from "compression";

dotenv.config();

const app = express();
app.use(express.json());
app.use(helmet());
app.use(compression());
app.use("/", urlRoutes);

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || "";
mongoose.connect(MONGO_URI).then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`Server is Running on port: ${PORT}`));
}).catch((err) => console.log("Falied to connect to MongoDB: ", err));

