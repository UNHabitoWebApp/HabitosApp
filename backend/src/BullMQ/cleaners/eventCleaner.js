import { eventQueue } from "../queues/eventQueue.js";

export async function removeEventByEventId(email) {
    const job = (await eventQueue.getDelayed()).filter(job => job.data.to === email)[0];
    if(job) await job.remove();
}