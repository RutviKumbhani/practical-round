import mongoose from "mongoose";

const ImportLogSchema = new mongoose.Schema({
  timestamp: Date,
  fileName: String,
  totalFetched: Number,
  totalImported: Number,
  newJobs: Number,
  updatedJobs: Number,
  failedJobs: Number,
  failureReasons: [String],
});

export default mongoose.model("ImportLog", ImportLogSchema);
