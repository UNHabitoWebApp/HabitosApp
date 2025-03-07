import { eventQueue } from "../queues/eventQueue.js";

export async function enqueueCreateEvent(info, options) {
    const { delay } = options;
    const { id } = info;
    if(!id) {
        throw new Error("Falta el id del evento.");
    }
    const prevJob = await eventQueue.getJob(id);
    if(prevJob) {
        await prevJob.remove();
    }
    if(!delay) {
        await eventQueue.add("createEvent", info, {...options, delay: 5000});
        return;
    }

    await eventQueue.add("createEvent", info, options);
}
