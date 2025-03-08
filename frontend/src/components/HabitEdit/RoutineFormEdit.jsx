import { useState, useEffect } from "react";
import BackToHomeButton from "../createHabbit/BackToHomeButton";
import add from "../../assets/icons/add.svg";
import PropTypes from "prop-types";

export default function RoutineFormEdit({ onSave, initialData }) {
  const [isAddingRoutine, setIsAddingRoutine] = useState(true);
  const [routine, setRoutine] = useState({
    name: "",
    exercises: [{ type: "", name: "" }],
    days: [],
    startTime: "",
    endTime: "",
  });

  // Cargar los datos iniciales solo la primera vez
  useEffect(() => {
    if (initialData) {
      setRoutine((prev) => ({ ...prev, ...initialData }));
    }
  }, [initialData]);

  const addExercise = () => {
    setRoutine((prev) => ({
      ...prev,
      exercises: [...prev.exercises, { type: "", name: "" }],
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

  return (
    <>
      {/* Formulario de Rutina */}
      <div className="mt-2 p-2 bg-[#ADD9C5] border-2 border-[#5F936C] rounded-[20px] w-full max-w-md">
        <h2 className="text-black text-[15px] text-center">Rutina</h2>

        {!isAddingRoutine ? (
          <>
            <select className="mt-1 w-3/4 h-8 p-1 border border-[#5F936C] rounded-[10px] bg-white text-black text-sm block mx-auto">
              <option value="">Selecciona rutina</option>
              <option value="rutina1">Rutina 1</option>
              <option value="rutina2">Rutina 2</option>
              <option value="rutina3">Rutina 3</option>
            </select>
            <p
              className="mt-2 text-[13px] text-[#569788] cursor-pointer hover:underline text-center"
              onClick={() => setIsAddingRoutine(true)}
            >
              + Agregar nueva rutina
            </p>
          </>
        ) : (
          <input
            type="text"
            placeholder="Ingresa el nombre de la rutina"
            className="mt-1 w-3/4 h-8 p-1 border border-[#5F936C] bg-white text-black text-sm block mx-auto"
            value={routine.name}
            onChange={(e) => setRoutine((prev) => ({ ...prev, name: e.target.value }))}
          />
        )}
      </div>

      {/* Bloque Ejercicios */}
      {isAddingRoutine && (
        <div className="mt-2 p-3 bg-[#ADD9C5] border-2 border-[#5F936C] rounded-[20px] w-full max-w-md">
          <h2 className="text-black text-[15px] text-center">Ejercicios</h2>

          {routine.exercises.map((exercise, index) => (
            <div key={index} className="flex gap-4 mt-2">
              <div className="flex flex-col flex-1">
                <label className="text-[13px] text-black font-roboto">Tipo</label>
                <select
                  className="h-8 p-1 border border-[#5F936C] rounded-[10px] bg-white text-black text-sm w-full"
                  value={exercise.type}
                  onChange={(e) => updateExercise(index, "type", e.target.value)}
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
                  onChange={(e) => updateExercise(index, "name", e.target.value)}
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
      )}

      {/* Botón de acción */}
      {isAddingRoutine && (
        <div className="mt-1 mb-5 flex justify-center gap-4 w-full max-w-md">
          <BackToHomeButton />
          <button
            className="mt-5 px-7 py-1 text-white text-sm bg-[#569788] rounded-[20px] transition-all duration-300 hover:bg-[#84A59D]"
            onClick={() => onSave(routine)}
          >
            Guardar
          </button>
        </div>
      )}

      {/* Botón de volver al inicio */}
      {!isAddingRoutine && <BackToHomeButton />}
    </>
  );
}

RoutineFormEdit.propTypes = {
  onSave: PropTypes.func.isRequired,
  initialData: PropTypes.object,
};
