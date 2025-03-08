import { enqueueCreateEvent } from "../BullMQ/producers/eventProducer.js";
import CreateHabitService from "../services/createHabitService.js";
import { getNextExecutionTime } from "../utils/nextEvent.js";

export const createHabit = async (request, response) => {
    const newHabit = request.body;
    newHabit.userId = request.user_id;
    const userEmail = request.email;
    const habit_service_obj = new CreateHabitService();
    const habit = await habit_service_obj.createHabit(newHabit);

    const baseDate = Date.now();
    const params = {
        days: habit.days,
        currentDate: baseDate,
        routineId: habit._id,
        beginTime: habit.beginTime,
    };

    const exotic = getNextExecutionTime(params);

    // Generamos un jobId basado en la ejecución
    const jobId = `job-correo-${habit._id}`;

    await enqueueCreateEvent(
        {
            habitId: habit._id,
            userEmail: userEmail,
            id: jobId,
            cont: 0,
        },
        {
            delay: Math.max(exotic.diffMs - 10 * 60 * 1000, 0),
            jobId: jobId,
        }
    );

    console.log("Hábito guardado:", habit);
    return response.status(201).json(habit);
};

export const createRoutine = async (request, response) => {
    const newRoutine = request.body;
    newRoutine.userId = request.user_id;
    const userEmail = request.email;
    const habit_service_obj = new CreateHabitService();
    const routine = await habit_service_obj.createRoutine(newRoutine);

    const baseDate = Date.now();
    const params = {
        days: routine.days,
        currentDate: baseDate,
        routineId: routine._id,
        beginTime: routine.beginTime,
    };

    const exotic = getNextExecutionTime(params);

    // Generamos un jobId basado en la ejecución
    const jobId = `job-correo-${routine._id}`;

    await enqueueCreateEvent(
        {
            routineId: routine._id,
            userEmail: userEmail,
            id: jobId,
            cont: 0,
        },
        {
            delay: Math.max(exotic.diffMs - 10 * 60 * 1000, 0),
            jobId: jobId,
        }
    );

    console.log("Rutina guardada:", routine);
    return response.status(201).json(routine);
};