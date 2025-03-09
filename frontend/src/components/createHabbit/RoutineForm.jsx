import { useState } from "react";
import BackToHomeButton from "./BackToHomeButton";
import add from "../../assets/icons/add.svg";
import PropTypes from "prop-types";
import postData from "../../service/post";
import { useDateActions } from "../../hooks/useDateActions";

export default function RoutineForm({ onSave }) {
  const [isAddingRoutine, setIsAddingRoutine] = useState(true);
  const [routine, setRoutine] = useState({
    name: "",
    exercises: [{ exerciseType: "", name: "" }],
    days: [],
    beginTime: "",
    endTime: "",
    personalized: false,
    notifyMe: false,
  });
  const { setSearchParam } = useDateActions()

  const addExercise = () => {
    setRoutine((prev) => ({
      ...prev,
      exercises: [...prev.exercises, { exerciseType: "", name: "" }],
    }));
  };

  const updateExercise = (index, field, value) => {
    const updatedExercises = [...routine.exercises];
    updatedExercises[index][field] = value;
    setRoutine({ ...routine, exercises: updatedExercises });
  };

  // Mapeo de iniciales en español a nombres en inglés
  const daysMapping = {
    L: "Monday",
    M: "Tuesday",
    W: "Wednesday",
    J: "Thursday",
    V: "Friday",
    S: "Saturday",
    D: "Sunday",
  };

  const toggleDay = (dayInitial) => {
    const dayName = daysMapping[dayInitial]; // Obtener el nombre en inglés

    setRoutine((prev) => ({
      ...prev,
      days: prev.days.includes(dayName)
        ? prev.days.filter((d) => d !== dayName) // Eliminar si ya está
        : [...prev.days, dayName], // Agregar si no está
    }));
  };

  const handleSave = async () => {
    onSave();

    // Transformar la lista de ejercicios
    const separatedExercises = routine.exercises.map(exercise => ({
      name: exercise.name,
      exerciseType: exercise.exerciseType,
      days: routine.days,
      beginTime: routine.beginTime,
      endTime: routine.endTime,
      personalized: routine.personalized,
      notifyMe: routine.notifyMe
    }));

    try {
      // Enviar cada ejercicio y obtener sus IDs
      const responses = await Promise.all(
        separatedExercises.map(async (exercise) => {
          const data = await postData("create_habits/personalized", exercise);
          console.log("Hábito guardado exitosamente:", data);
          return data.id; //Almacenamos el ID
        })
      );

      console.log("IDs de los hábitos guardados:", responses);

      // Crear el nuevo objeto de rutina con la lista de IDs
      const updatedRoutine = {
        ...routine,
        exercises: responses // Reemplazamos exercises con los IDs obtenidos
      };

      // Enviar la rutina al backend
      const routineData = await postData("create_habits/routine", updatedRoutine);
      console.log("Rutina guardada exitosamente:", routineData);
      setSearchParam("regenerate");

    } catch (error) {
      console.error("Error al enviar los datos:", error);
    }
  };

  const isValidForm = () => {
    return (
      routine.name.trim() &&
      routine.days.length > 0 &&
      routine.exercises.every(
        (exercise) => exercise.exerciseType.trim() && exercise.name.trim()
      ) &&
      routine.beginTime &&
      routine.endTime
    );
  };

  return (
    <>
      {/* Formulario de Rutina */}
      <div className="mt-2 p-2 bg-[#ADD9C5] border-2 border-[#5F936C] rounded-[20px] w-full max-w-md">
        <h2 className="text-black text-[15px] text-center">Rutina</h2>

        {/* Modo Seleccionar o agregar rutina */}
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
            placeholder="Ingresa el nombre de la rutina a agregar"
            className="mt-1 w-3/4 h-8 p-1 border border-[#5F936C] bg-white text-black text-sm block mx-auto"
            value={routine.name}
            onChange={(e) => setRoutine({ ...routine, name: e.target.value })}
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
                {/* Select de tipo de ejercicio */}
                <select
                  className="h-8 p-1 border border-[#5F936C] rounded-[10px] bg-white text-black text-sm w-full"
                  value={exercise.exerciseType}
                  onChange={(e) => updateExercise(index, "exerciseType", e.target.value)}
                >
                  <option value="">Seleccione el tipo</option>
                  <option value="cardio">Cardio</option>
                  <option value="fuerza">Fuerza</option>
                  <option value="flexibilidad">Flexibilidad</option>
                </select>
              </div>
              <div className="flex flex-col flex-1">
                <label className="text-[13px] text-black font-roboto">Ejercicio</label>
                {/* Input de nombre de ejercicio */}
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

          {/* Botón de agregar ejercicio */}
          <button
            className="mt-3 w-full bg-[#569788] text-white text-[15px] p-1 rounded-[10px] flex items-center justify-center hover:bg-[#84A59D]"
            onClick={addExercise}
          >
            <img src={add} alt="add" className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Bloque Horario */}
      {isAddingRoutine && (
        <div className="mt-2 p-2 bg-[#ADD9C5] border-2 border-[#5F936C] rounded-[20px] w-full max-w-md">
          <h2 className="text-black text-[15px] text-center mb-2 flex items-center justify-center gap-2">Horario
            <span title="Formato 24 horas" className="cursor-pointer">
              ⓘ
            </span>
          </h2>

          <div className="md:flex lg:flex items-center justify-between gap-2">
            {/* Días de la semana */}
            <div className="flex flex-col items-center">
              <h2 className="text-[13px] text-black mb-1">Días de la semana</h2>
              <div className="flex gap-1">
                {["L", "M", "W", "J", "V", "S", "D"].map((day, index) => (
                  <button
                    key={index}
                    className={`w-6 h-6 flex items-center justify-center border border-[#5F936C] rounded-full text-black text-[12px] transition-all duration-200 ${routine.days.includes(daysMapping[day]) ? "bg-[#569788]" : ""
                      }`}
                    onClick={() => toggleDay(day)}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>

            {/* Hora de Inicio */}
            <div className="flex flex-col items-center">
              <h3 className="text-[13px] text-black mb-1">Hora de inicio</h3>
              <div className="flex items-center gap-1">
                <input
                  type="number"
                  placeholder="00"
                  className="w-10 h-10 text-center border border-[#5F936C] rounded-md text-black"
                  value={routine.beginTime.split(":")[0] || ""}
                  onChange={(e) => {
                    let value = e.target.value;
                    if (value === "" || (/^\d+$/.test(value) && value >= 0 && value <= 23)) {
                      setRoutine({
                        ...routine,
                        beginTime: `${value}:${routine.beginTime.split(":")[1] || "00"}`,
                      });
                    }
                  }}
                />
                <span className="text-black">:</span>
                <input
                  type="number"
                  placeholder="00"
                  className="w-10 h-10 text-center border border-[#5F936C] rounded-md text-black"
                  value={routine.beginTime.split(":")[1] || ""}
                  onChange={(e) => {
                    let value = e.target.value;
                    if (value === "" || (/^\d+$/.test(value) && value >= 0 && value <= 59)) {
                      setRoutine({
                        ...routine,
                        beginTime: `${routine.beginTime.split(":")[0] || "00"}:${value}`,
                      });
                    }
                  }}
                />
              </div>
            </div>

            {/* Hora de Fin */}
            <div className="flex flex-col items-center">
              <h3 className="text-[13px] text-black mb-1">Hora de fin</h3>
              <div className="flex items-center gap-1">
                <input
                  type="number"
                  placeholder="00"
                  className="w-10 h-10 text-center border border-[#5F936C] rounded-md text-black"
                  value={routine.endTime.split(":")[0] || ""}
                  onChange={(e) => {
                    let value = e.target.value;
                    if (value === "" || (/^\d+$/.test(value) && value >= 0 && value <= 23)) {
                      setRoutine({
                        ...routine,
                        endTime: `${value}:${routine.endTime.split(":")[1] || "00"}`,
                      });
                    }
                  }}
                />
                <span className="text-black">:</span>
                <input
                  type="number"
                  placeholder="00"
                  className="w-10 h-10 text-center border border-[#5F936C] rounded-md text-black"
                  value={routine.endTime.split(":")[1] || ""}
                  onChange={(e) => {
                    let value = e.target.value;
                    if (value === "" || (/^\d+$/.test(value) && value >= 0 && value <= 59)) {
                      setRoutine({
                        ...routine,
                        endTime: `${routine.endTime.split(":")[0] || "00"}:${value}`,
                      });
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Botones de acción */}
      {isAddingRoutine && (
        <div className="mt-1 mb-5 flex justify-center gap-4 w-full max-w-md">
          <BackToHomeButton />
          <button className="mt-5 px-7 py-1 text-white text-sm bg-[#569788] rounded-[20px] transition-all duration-300 hover:bg-[#84A59D] disabled:bg-[#84A59D] disabled:cursor-not-allowed"
            onClick={handleSave}
            disabled={!isValidForm()} // Desactiva el botón si el formulario no es válido
          >
            Guardar
          </button>
        </div>
      )}

      {/* Botón de volver al inicio */}
      {(!isAddingRoutine && <BackToHomeButton />)}
    </>
  );
}

RoutineForm.propTypes = {
  onSave: PropTypes.func.isRequired,
};