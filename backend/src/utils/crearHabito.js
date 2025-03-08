import mongoose from "mongoose";
import Habit from "../models/Habit.js";
import Routine from "../models/Routine.js";

export async function createExample() {
    try {
        // 1️⃣ Crear el hábito "Leer"
        const leerHabit = new Habit({
            userId: new mongoose.Types.ObjectId(),
            name: "Leer",
            variables: [
                { name: "Páginas leídas", type: "integer", config: { min: 0, max: 500 } },
                { name: "Satisfacción", type: "integer", config: { min: 1, max: 10 } }
            ]
        });
        await leerHabit.save();
        console.log("📖 Hábito 'Leer' creado:", leerHabit);

        // 2️⃣ Crear el hábito "Ejercicio"
        const ejercicioHabit = new Habit({
            userId: new mongoose.Types.ObjectId(),
            name: "Ejercicio 1",
            exerciseType: "Fuerza",
            variables: [
                { name: "Repeticiones", type: "integer", config: { min: 0 , max: 50} },
                { name: "Kilogramos", type:"integer", config: {min:0 , max: 120 } }
            ]
        });

        const ejercicioHabit2 = new Habit({
            userId: new mongoose.Types.ObjectId(),
            name: "Ejercicio 2",
            exerciseType: "Cardio",
            variables: [
                { name: "Duración", type: "integer", config: { min: 0, max: 180 } },
            ]
        });

        await ejercicioHabit.save();
        await ejercicioHabit2.save();
        console.log("🏋️ Hábito 'Ejercicio' creado:", ejercicioHabit);

        // 3️⃣ Crear una rutina basada en estos hábitos
        const rutina = new Routine({
            userId: new mongoose.Types.ObjectId(),
            name: "Mi Rutina de Gym",
            beginTime: new Date(),
            endTime: new Date(new Date().getTime() + 60 * 60 * 1000),
            days: ["Monday", "Wednesday", "Friday"],
            notifyMe: true,
            exercises: [ejercicioHabit2._id, ejercicioHabit._id]
        });
        await rutina.save();
        console.log("📆 Rutina creada:", rutina);

        mongoose.connection.close();
        console.log("🔌 Conexión cerrada");

    } catch (error) {
        console.error("❌ Error:", error);
        mongoose.connection.close();
    }
}
