import cors from "cors";
import morgan from "morgan";
import express from "express";
import initializeRoutes from "./routes/index.js";
import cookieParser from "cookie-parser";
import { mailerQueue } from "./BullMQ/queues/mailerQueue.js";
import { removeJobByEmail } from "./BullMQ/cleaners/emailCleaner.js";
import { eventQueue } from "./BullMQ/queues/eventQueue.js";
import { enqueueCreateEvent } from "./BullMQ/producers/eventProducer.js";

const app = express();

app.use(
    cors({
    	origin: true,
    	credentials: true,
    	allowedHeaders: "Content-Type, Authorization",
    	allowOrigin: "*",
    })
);

app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

app.post("/test", async (req, res) => {
    const { email, msg } = req.body;

    if(!email || !msg) {
        return res.status(400).json({ message: "Faltan datos." });
    }

    const job = await mailerQueue.getJob(email);

    if(job) job.remove();

    await mailerQueue.add("sendEmail", {
        to: email,
        subject: msg,
        cont: 0
    },
    { jobId: email, delay: 1000 * 60 * 2  });

    res.json({ message: "Job encolado con delay de 5 minutos." });
});

app.delete("/job",async (req, res) => {
    const { email } = req.body;

    if(!email) {
        return res.status(400).json({ message: "Faltan datos." });
    }

    await removeJobByEmail(email);

    res.json({message: `Job con ${email} eliminado.` });
});

app.put("/adelantar",
    async (req, res) => {
        const { email } = req.body;

        if(!email) {
            return res.status(400).json({ message: "Faltan datos." });
        }

        await mailerQueue.remove(email);

        await mailerQueue.add("sendEmail", {
            to: email,
            subject: "Adelantado",
            cont: 0
        },
        { jobId:email, delay: 1000 * 5 });


        res.json({ message: "Job encolado con delay de 5 segundos." });
    }
);

app.post("/test2", async (req, res) => {

    const routineId = "67c9b71329f00cd857d6194a";

    //await enqueueCreateEvent({ routineId: routineId }, 2000 );

    console.log(await eventQueue.getJobCounts("delayed"));
    console.log( (await eventQueue.getDelayed()));
    res.json({ message: "Job encolado con delay de 5 minutos." });
});

initializeRoutes(app);

export default app;