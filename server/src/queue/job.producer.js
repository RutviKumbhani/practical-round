import { Queue } from "bullmq";
import { redisConnection } from "../config/redis.js";

export const jobQueue = new Queue("job-import-queue", {
  connection: redisConnection,
});

export async function enqueueJobs(jobs, sourceUrl, importId) {
  for (const job of jobs) {
    await jobQueue.add(
      "import-job",
      { job, sourceUrl, importId },
      {
        attempts: 3,
        backoff: { type: "exponential", delay: 5000 },
      }
    );
  }
}
