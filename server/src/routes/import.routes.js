import express from "express";
import {
  startImport,
  getImportLogs,
} from "../controllers/import.controller.js";

const router = express.Router();

router.get("/start", startImport);
router.get("/logs", getImportLogs);

export default router;
