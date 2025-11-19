import mongoose from "mongoose";

const JobSchema = new mongoose.Schema(
  {
    externalId: { type: String, unique: true, index: true },
    title: String,
    link: String,
    description: String,
    category: String,
    pubDate: String,
  },
  { timestamps: true }
);

export default mongoose.model("Job", JobSchema);
