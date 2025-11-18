import { fetchJobsFromUrl } from "../services/apiFetcher.service.js";
import ImportLog from "../models/ImportLog.js";
import { enqueueJobs } from "../queue/job.producer.js";

const FEEDS = [
  "https://jobicy.com/?feed=job_feed",
  "https://jobicy.com/?feed=job_feed&job_categories=smm&job_types=full-time",
  "https://jobicy.com/?feed=job_feed&job_categories=seller&job_types=full-time&search_region=france",
  "https://jobicy.com/?feed=job_feed&job_categories=design-multimedia",
  "https://jobicy.com/?feed=job_feed&job_categories=data-science",
  "https://jobicy.com/?feed=job_feed&job_categories=copywriting",
  "https://jobicy.com/?feed=job_feed&job_categories=business",
  "https://jobicy.com/?feed=job_feed&job_categories=management",
  "https://www.higheredjobs.com/rss/articleFeed.cfm",
];

export async function startImport(req, res) {
  const logs = [];

  for (const url of FEEDS) {
    const importLog = await ImportLog.create({
      timestamp: new Date(),
      fileName: url,
      totalFetched: 0,
      totalImported: 0,
      newJobs: 0,
      updatedJobs: 0,
      failedJobs: 0,
      failureReasons: [],
    });

    const jobs = await fetchJobsFromUrl(url);

    await ImportLog.updateOne(
      { _id: importLog._id },
      { totalFetched: jobs.length }
    );

    await enqueueJobs(jobs, url, importLog._id);

    logs.push(importLog._id);
  }

  res.json({
    status: "Import started",
    importIds: logs,
  });
}

export async function getImportLogs(req, res) {
  const logs = await ImportLog.find().sort({ timestamp: -1 });
  res.json(logs);
}
