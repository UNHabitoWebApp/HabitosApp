import { Queue } from "bullmq";
import { redisConfig } from "../../config/redisConfig.js";

export const mailerQueue = new Queue("mailer", { connection: redisConfig });
