import { mailerQueue } from "../queues/mailerQueue.js";

export async function enqueueEmail(info,delay=5000) {
    await mailerQueue.add("sendEmail", info, { delay });
}
