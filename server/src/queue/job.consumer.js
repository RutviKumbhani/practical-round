import { Worker } from "bullmq";
import Job from "../models/Job.js";
import ImportLog from "../models/ImportLog.js";
import { redisConnection } from "../config/redis.js";

export const jobWorker = new Worker(
  "job-import-queue",
  async ({ data }) => {
    const { job, importId } = data;

    try {
      const existing = await Job.findOne({ externalId: job.externalId });

      if (!existing) {
        await Job.create(job);

        await ImportLog.updateOne(
          { _id: importId },
          { $inc: { newJobs: 1, totalImported: 1 } }
        );
      } else {
        await Job.updateOne({ externalId: job.externalId }, job);

        await ImportLog.updateOne(
          { _id: importId },
          { $inc: { updatedJobs: 1, totalImported: 1 } }
        );
      }
    } catch (error) {
      await ImportLog.updateOne(
        { _id: importId },
        {
          $inc: { failedJobs: 1 },
          $push: { failureReasons: error.message },
        }
      );
    }
  },
  {
    connection: redisConnection,
    concurrency: +process.env.WORKER_CONCURRENCY || 10,
  }
);

console.log("Worker running…");
