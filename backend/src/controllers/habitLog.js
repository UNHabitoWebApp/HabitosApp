export const patchHabitLog = async (request, response) => {
    const habitLog_service_obj = new HabitLogService();
    const habitLog_id = request.params.id;
    const habitLogData = request.body;
    const habitLogUpdate = await habitLog_service_obj.updateHabitLog(habitLog_id, habitLogData);
    if (!habitLogUpdate) {
        return response.status(404).json({ message: "Registro de hábito no encontrado" });
    }
    console.log("Registro de hábito actualizado:", habitLogUpdate);
    return response.status(200).json(habitLogUpdate);
}

export const createHabitLog = async (request, response) => {
    const newHabitLog = request.body;
    const habitLog_service_obj = new HabitLogService();
    const habitLog = await habitLog_service_obj.createHabitLog(newHabitLog);
    console.log("Registro de hábito guardado:", habitLog);
    return response.status(201).json(habitLog);
}

export const getHabitLogByHabit = async (request, response) => {
    const habitLog_service_obj = new HabitLogService();
    const habit_id = request.params.id;
    const date = request.query.date;
    if (date) {
        const habitLogs = await habitLog_service_obj.habitLogs_by_date(habit_id, date);
        console.log("Registros de hábito encontrados:", habitLogs);
        return response.status(200).json(habitLogs);
    }
    const habitLogs = await habitLog_service_obj.habitLogs_by_habit(habit_id);
    console.log("Registros de hábito encontrados:", habitLogs);
    return response.status(200).json(habitLogs);
}