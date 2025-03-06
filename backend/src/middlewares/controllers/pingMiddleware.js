import Habit from "../../models/Habit.js";

const newHabit = {
  userId: "67a8e87031ef245fc552a151",
  name: "Entrenamiento Matutino",
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
      config: {
        min: 5,
        max: 100
      }
    },
    {
      name: "Dificultad",
      type: "enum",
      config: {
        allowedValues: ["Fácil", "Medio", "Difícil"]
      }
    },
    {
      name: "Comentario",
      type: "open",
      config: {
        maxLength: 200
      }
    }
  ]
};

const saveHabit = async () => {
  try {
    const habit = new Habit(newHabit);
    await habit.save();
    console.log("Hábito guardado:", habit);
  } catch (error) {
    console.error("Error al guardar el hábito:", error);
  }
};

const getPing = (request, response) => {
  saveHabit();
  response.status(200).json({ message: "pong" });
};

export { getPing };