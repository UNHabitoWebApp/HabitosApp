import { useState, useEffect } from "react";
import BackToHomeButton from "../createHabbit/BackToHomeButton";
import add from "../../assets/icons/add.svg";
import PropTypes from "prop-types";

export default function RoutineFormEdit({ onSave, initialData }) {
  const [routine, setRoutine] = useState({
    name: "",
    exercises: [{ exerciseType: "", name: "" }],
    days: [],
    startTime: "",
    endTime: "",
  });

  useEffect(() => {
    if (initialData) {
      setRoutine({
        name: initialData.name || "",
        exercises: initialData.exercises?.map((ex) => ({
          _id: ex._id || "",
          exerciseType: ex.exerciseType || "",
          name: ex.name || "",
        })) || [{ exerciseType: "", name: "" }],
        days: initialData.days || [],
        startTime: initialData.startTime || "",
        endTime: initialData.endTime || "",
      });
    }
  }, [initialData]);

  const addExercise = () => {
    setRoutine((prev) => ({
      ...prev,
      exercises: [...prev.exercises, { exerciseType: "", name: "" }],
    }));
  };

  const updateExercise = (index, field, value) => {
    setRoutine((prev) => ({
      ...prev,
      exercises: prev.exercises.map((exercise, i) =>
        i === index ? { ...exercise, [field]: value } : exercise
      ),
    }));
  };

  const toggleDay = (day) => {
    setRoutine((prev) => {
      const newDays = prev.days.includes(day)
        ? prev.days.filter((d) => d !== day)
        : [...prev.days, day];
      return { ...prev, days: newDays };
    });
  };

  return (
    <>
      <div className="mt-2 p-2 bg-[#ADD9C5] border-2 border-[#5F936C] rounded-[20px] w-full max-w-md">
        <h2 className="text-black text-[15px] text-center">Rutina</h2>
        <input
          type="text"
          placeholder="Ingresa el nombre de la rutina"
          className="mt-1 w-3/4 h-8 p-1 border border-[#5F936C] bg-white text-black text-sm block mx-auto"
          value={routine.name}
          onChange={(e) => setRoutine({ ...routine, name: e.target.value })}
        />
      </div>

      <div className="mt-2 p-3 bg-[#ADD9C5] border-2 border-[#5F936C] rounded-[20px] w-full max-w-md">
        <h2 className="text-black text-[15px] text-center">Ejercicios</h2>
        {routine.exercises.map((exercise, index) => (
          <div key={index} className="flex gap-4 mt-2">
            <div className="flex flex-col flex-1">
              <label className="text-[13px] text-black font-roboto">Tipo</label>
              <select
                className="h-8 p-1 border border-[#5F936C] rounded-[10px] bg-white text-black text-sm w-full"
                value={exercise.exerciseType}
                onChange={(e) =>
                  updateExercise(index, "exerciseType", e.target.value)
                }
              >
                <option value="">Seleccione el tipo</option>
                <option value="cardio">Cardio</option>
                <option value="fuerza">Fuerza</option>
                <option value="flexibilidad">Flexibilidad</option>
              </select>
            </div>
            <div className="flex flex-col flex-1">
              <label className="text-[13px] text-black font-roboto">Ejercicio</label>
              <input
                type="text"
                placeholder="Ej: Sentadilla"
                className="h-8 p-1 border border-[#5F936C] bg-white text-black text-sm w-full"
                value={exercise.name}
                onChange={(e) =>
                  updateExercise(index, "name", e.target.value)
                }
              />
            </div>
          </div>
        ))}
        <button
          className="mt-3 w-full bg-[#569788] text-white text-[15px] p-1 rounded-[10px] flex items-center justify-center hover:bg-[#84A59D]"
          onClick={addExercise}
        >
          <img src={add} alt="add" className="w-5 h-5" />
        </button>
      </div>

      <div className="mt-2 p-2 bg-[#ADD9C5] border-2 border-[#5F936C] rounded-[20px] w-full max-w-md">
        <h2 className="text-black text-[15px] text-center mb-2">Horario</h2>
        <div className="flex items-center justify-between">
          <div className="flex flex-col items-center">
            <h2 className="text-[13px] text-black mb-1">Días de la semana</h2>
            <div className="flex gap-1">
              {["L", "M", "W", "J", "V", "S", "D"].map((day, index) => (
                <button
                  key={index}
                  className={`w-6 h-6 flex items-center justify-center border border-[#5F936C] rounded-full text-black text-[12px] transition-all duration-200 ${routine.days.includes(day) ? "bg-[#569788]" : ""}`}
                  onClick={() => toggleDay(day)}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>
          <div className="flex flex-col items-center">
            <h3 className="text-[13px] text-black mb-1">Hora de inicio</h3>
            <input type="time" className="w-24 h-8 text-center border border-[#5F936C] rounded-md text-black" value={routine.startTime} onChange={(e) => setRoutine({ ...routine, startTime: e.target.value })} />
          </div>
          <div className="flex flex-col items-center">
            <h3 className="text-[13px] text-black mb-1">Hora de fin</h3>
            <input type="time" className="w-24 h-8 text-center border border-[#5F936C] rounded-md text-black" value={routine.endTime} onChange={(e) => setRoutine({ ...routine, endTime: e.target.value })} />
          </div>
        </div>
      </div>

      <div className="mt-1 mb-5 flex justify-center gap-4 w-full max-w-md">
        <BackToHomeButton />
        <button className="mt-5 px-7 py-1 text-white text-sm bg-[#569788] rounded-[20px] hover:bg-[#84A59D]" onClick={() => onSave(routine)}>Guardar</button>
      </div>
    </>
  );
}

RoutineFormEdit.propTypes = {
  onSave: PropTypes.func.isRequired,
  initialData: PropTypes.object,
};
