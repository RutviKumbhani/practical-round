import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
import importRoutes from "./src/routes/import.routes.js";
import "./src/queue/job.consumer.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/import", importRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
