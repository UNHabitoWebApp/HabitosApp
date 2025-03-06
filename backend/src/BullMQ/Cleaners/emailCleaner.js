import { mailerQueue } from "../queues/mailerQueue.js";

export async function removeJobByEmail(email) {
    const job = (await mailerQueue.getDelayed()).filter(job => job.data.to === email)[0];
    if(job) await job.remove();
}