import mongoose from "mongoose";

const UrlSchema = new mongoose.Schema({
    shortUrl: { type: String, required: true, unique: true },
    originalUrl: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Url", UrlSchema);