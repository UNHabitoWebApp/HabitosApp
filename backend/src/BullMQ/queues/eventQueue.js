import { Queue } from "bullmq";
import { redisConfig } from "../../config/redisConfig.js";

export const eventQueue = new Queue("events", { connection: redisConfig });
