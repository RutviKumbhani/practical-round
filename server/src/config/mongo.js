import mongoose from "mongoose";

// mongoose.connect(process.env.MONGO_URI, {
//   dbName: "jobsdb",
// });

// mongoose.connection.on("connected", () => {
//   console.log("MongoDB Connected");
// });

// mongoose.connection.on("error", (err) => {
//   console.log("MongoDB Error: ", err);
// });

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/jobsdb";

if (!MONGO_URI) {
  console.error("❌ MONGO_URI is not defined in your .env file!");
  process.exit(1);
}

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("🟢 MongoDB Connected"))
  .catch((err) => console.error("🔴 MongoDB Connection Error:", err));
