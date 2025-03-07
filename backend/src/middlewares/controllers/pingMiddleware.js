import mongoose from "../../config/mongoConfig.js";
import Habit from "../../models/Habit.js";
import Routine from "../../models/Routine.js";
import HabitLog from "../../models/HabitLog.js";
// Conectar a MongoDB (asegúrate de que la conexión esté bien configurada en mongoConfig.js)

// Definir los IDs manualmente para mantener la congruencia
const habit1Id = new mongoose.Types.ObjectId();
const habit2Id = new mongoose.Types.ObjectId();
const habit3Id = new mongoose.Types.ObjectId();
const routineId = new mongoose.Types.ObjectId();
const habitLogId = new mongoose.Types.ObjectId();

const habits = [
  {
    _id: habit1Id,
    userId: "67a8e87031ef245fc552a151",
    name: "Entrenamiento de Fuerza",
    exerciseType: "Fuerza",
    beginTime: "07:00",
    endTime: "08:00",
    days: ["L", "M", "V"],
    notifyMe: true,
    personlized: true,
    variables: [
      {
        name: "Peso",
        type: "integer",
        config: { min: 5, max: 100 }
      },
      {
        name: "Repeticiones",
        type: "integer",
        config: { min: 1, max: 50 }
      }
    ]
  },
  {
    _id: habit2Id,
    userId: "67a8e87031ef245fc552a151",
    name: "Carrera Matutina",
    exerciseType: "Cardio",
    beginTime: "06:30",
    endTime: "07:00",
    days: ["L", "X", "V"],
    notifyMe: true,
    personlized: false,
    variables: [
      {
        name: "Distancia",
        type: "integer",
        config: { min: 1, max: 10 } // Kilómetros
      },
      {
        name: "Tiempo",
        type: "integer",
        config: { min: 5, max: 60 } // Minutos
      }
    ]
  },
  {
    _id: habit3Id,
    userId: "67a8e87031ef245fc552a151",
    name: "Yoga de Relajación",
    exerciseType: "Flexibilidad",
    beginTime: "08:00",
    endTime: "08:30",
    days: ["M", "J", "S"],
    notifyMe: false,
    personlized: false,
    variables: [
      {
        name: "Duración",
        type: "integer",
        config: { min: 10, max: 60 }
      },
      {
        name: "Nivel de Relajación",
        type: "enum",
        config: { allowedValues: ["Bajo", "Medio", "Alto"] }
      }
    ]
  }
];

const routine = {
  _id: routineId,
  userId: "67a8e87031ef245fc552a151",
  name: "Rutina Completa de Ejercicio",
  beginTime: "06:00",
  endTime: "08:30",
  days: ["L", "M", "J", "V"],
  notifyMe: true,
  exercises: [habit1Id, habit2Id, habit3Id] // Referencia a los hábitos
};

const habitLog = {
  _id: habitLogId,
  routine_id: routineId,
  habit_id: habit1Id,
  date: new Date(),
  completionTime: "08:00",
  variables: [
    {
      name: "Peso",
      value: 50,
      set: 3,
      reps: 10,
      kilograms: 50,
      observation: "Buen progreso en fuerza."
    }
  ]
};

const seedDatabase = async () => {
  try {
    await Habit.insertMany(habits);
    console.log("Hábitos guardados");

    await Routine.create(routine);
    console.log("Rutina guardada");

    await HabitLog.create(habitLog);
    console.log("Log de hábito guardado");

    mongoose.connection.close();
    console.log("Conexión cerrada");
  } catch (error) {
    console.error("Error al poblar la base de datos:", error);
    mongoose.connection.close();
  }
};

seedDatabase();


const getPing = (request, response) => {
  saveHabit();
  response.status(200).json({ message: "pong" });
};

export { getPing };