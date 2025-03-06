import { eventQueue } from "../queues/eventQueue.js";

export async function enqueueCreateEvent(info,delay=5000) {
    await eventQueue.add("createEvent", info, { delay });
}
