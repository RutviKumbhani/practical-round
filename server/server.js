// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";

// dotenv.config();

// import "./src/config/mongo.js"; // connect MongoDB
// import "./src/queue/job.consumer.js"; // start worker

// import importRoutes from "./src/routes/import.routes.js";

// const app = express();

// app.use(cors());
// app.use(express.json());

// app.use("/api/import", importRoutes);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

// import mongoose from "mongoose";
import importRoutes from "./src/routes/import.routes.js";
import "./src/queue/job.consumer.js"; // Start the worker

// ---- MongoDB connection ----

// ---- Express app ----
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/import", importRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
