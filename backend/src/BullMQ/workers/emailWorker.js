import { Worker } from "bullmq";
import { redisConfig } from "../../config/redisConfig.js";
import { enqueueEmail } from "../producers/emailProducer.js";

const mailerWorker = new Worker("mailer", async job => {
    console.log(`Procesando job ${job.id} después del delay`);
    console.log(job.data.to, job.data.subject);
    console.log(`Completado job ${job.id}`);
    console.log("-----------------------------------");
},
{
    connection: redisConfig,
    removeOnComplete: { age: 10 },
    removeOnFail: { age: 10 }
});

mailerWorker.on("completed", async job => {
    console.log(`✅ Job completado: ${job.id}`);
    console.log(job.data.cont);
    if(job.data.cont <= 2) await enqueueEmail({ to: job.data.to, subject: job.data.subject + "Padre"+job.id, cont: job.data.cont + 1 }, 5000);
});

mailerWorker.on("failed", (job, err) => {
    console.error(`❌ Job ${job?.id} falló:`, err);
});

export default mailerWorker;