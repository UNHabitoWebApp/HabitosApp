import { eventQueue } from "../queues/eventQueue.js";

export async function removeEventByEventId(id) {
    const jobId = `job-correo-${id}`;
    const job = await eventQueue.getJob(jobId);

    if (job) {
        await job.remove();
        console.log(`✅ Job ${jobId} eliminado correctamente.`);
    } else {
        console.warn(`⚠️ Job ${jobId} no encontrado.`);
    }
}
