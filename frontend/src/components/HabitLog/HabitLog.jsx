import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BackToHomeButton from "../createHabbit/BackToHomeButton";
import Plus from "../../assets/icons/plus.svg";
import postData from "../../service/post";
import getData from "../../service/get";
import { useDateActions } from "../../hooks/useDateActions";

export default function ExerciseForm() {
  const { routine_id, exercise_id } = useParams();
  const navigate = useNavigate();
  const [exercise, setExercise] = useState(null);
  const [sets, setSets] = useState([{ reps: "", weight: "", time: "" }]);
  const [observations, setObservations] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const { setSearchParam } = useDateActions()

  // Cargar los datos del ejercicio desde el backend
  useEffect(() => {
    async function fetchExercise() {
      try {
        const data = await getData(`edit_habits/edit/${exercise_id}`);
        const foundExercise = data
        if (foundExercise) {
          setExercise(foundExercise);
        } else {
          console.error("Ejercicio no encontrado");
        }
      } catch (error) {
        console.error("Error al cargar el ejercicio:", error);
      }
    }
    fetchExercise();
  }, [routine_id, exercise_id]);

  const addSet = () => {
    setSets([...sets, { reps: "", weight: "", time: "" }]);
  };

  const handleChange = (index, field, value) => {
    const newSets = sets.map((set, i) =>
      i === index ? { ...set, [field]: value } : set
    );
    setSets(newSets);
  };

  const handleSubmit = async () => {
    if (!exercise || !exercise.beginTime || !exercise.endTime) {
      console.error("Faltan datos en el ejercicio");
      return;
    }

    // Función para convertir "HH:MM" a una fecha con la hora correcta del día
    const getDateWithTime = (timeString) => {
      const [hours, minutes] = timeString.split(":").map(Number);
      const date = new Date(); // Fecha actual
      date.setHours(hours, minutes, 0, 0); // Ajustamos la hora y minutos
      return date;
    };

    const beginDate = getDateWithTime(exercise.beginTime);
    const endDate = getDateWithTime(exercise.endTime);

    // Fecha actual como CompletionTime
    const now = new Date();

    // Duración del ejercicio en milisegundos
    const durationMs = endDate - beginDate;
    console.log("Duración del ejercicio:", durationMs);

    // Fecha del HabitLog = ahora - duración del ejercicio
    const habitLogDate = new Date(now.getTime() - durationMs);
    console.log("Fecha del HabitLog:", habitLogDate);

    const habitLog = {
      routine_id, // Opcional, si aplica
      habit_id: exercise_id, // ID del ejercicio
      date: habitLogDate.toISOString(), // Fecha ajustada restando la duración
      completionTime: (new Date()).toISOString(), // Fecha actual como tiempo de finalización
      done: isChecked, // Si está marcado como hecho o no
      observations, // Observación general
      variables: sets.map((set, index) => ({
        name: exercise.name,
        value: isStrength ? `${set.reps} reps, ${set.weight} kg` : `${set.time} min`,
        set: index + 1,
        reps: isStrength ? Number(set.reps) : undefined,
        kilograms: isStrength ? Number(set.weight) : undefined,
        observation: observations || "", // Observación dentro de cada variable
      })),
    };

    try {
      await postData("habitLog/habitLog/", habitLog);
      console.log("Habit log enviado con éxito:", habitLog);
      setSearchParam("regenerate");
      navigate(-1); // Regresar a la página anterior
    } catch (error) {
      console.error("Error al enviar el habit log:", error);
    }
  };



  if (!exercise) return <p>Cargando...</p>;

  const isStrength = exercise.exerciseType.toLowerCase() === "fuerza";

  return (
    <div className="flex flex-col items-center min-h-[80vh] bg-[#F0F7F5]">
      <div className="w-full flex justify-center px-4 pt-4">
        <div className="p-5 border-2 bg-[#ADD9C5] border-[#5F936C] rounded-[20px] shadow-lg w-full max-w-[450px] transition-all duration-300">
          <h2 className="text-lg font-bold text-center mb-4">{exercise.name}</h2>

          <div className="w-full min-h-[50px] rounded-[15px] overflow-hidden transition-all duration-300 ease-in-out p-3 bg-[#ADD9C5] flex flex-col gap-2">
            {sets.map((set, index) => (
              <div key={index} className="w-full">
                {isStrength ? (
                  <div className="flex justify-between w-full">
                    <div className="flex flex-col w-24">
                      <label className="text-xs font-semibold">Reps</label>
                      <input
                        type="number"
                        value={set.reps}
                        onChange={(e) => handleChange(index, "reps", e.target.value)}
                        className="p-1 border rounded text-sm w-full mt-1"
                      />
                    </div>
                    <div className="flex flex-col w-24">
                      <label className="text-xs font-semibold">Kg</label>
                      <input
                        type="number"
                        value={set.weight}
                        onChange={(e) => handleChange(index, "weight", e.target.value)}
                        className="p-1 border rounded text-sm w-full mt-1"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="w-full flex flex-col w-24">
                    <label className="text-xs font-semibold">Tiempo (min)</label>
                    <input
                      type="text"
                      value={set.time}
                      onChange={(e) => handleChange(index, "time", e.target.value)}
                      className="p-1 border rounded text-sm w-full mt-1"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>

          <button
            className="mt-3 w-full bg-[#569788] text-white text-[15px] p-1 rounded-[10px] flex items-center justify-center hover:bg-[#84A59D]"
            onClick={addSet}
          >
            <img src={Plus} alt="add" className="w-5 h-5" />
          </button>

          <div className="mt-4 flex items-center">
            <input
              type="checkbox"
              id="customCheckbox"
              checked={isChecked}
              onChange={(e) => setIsChecked(e.target.checked)}
              className="w-4 h-4 border-2 border-[#5F936C] rounded focus:ring-2 focus:ring-[#5F936C] cursor-pointer"
            />
            <label htmlFor="customCheckbox" className="ml-2 text-sm font-semibold cursor-pointer">
              Activar opción
            </label>
          </div>

          <div className="mt-4">
            <label className="text-xs font-semibold">Observaciones</label>
            <textarea
              placeholder="Escribe aquí..."
              value={observations}
              onChange={(e) => setObservations(e.target.value)}
              className="w-full p-2 border rounded resize-none h-20 mt-1"
            ></textarea>
          </div>
        </div>
      </div>

      <div className="w-full flex justify-center mt-4 pb-4">
        <div className="flex justify-between w-full max-w-[450px]">
          <BackToHomeButton additionalClasses="ml-5" />
          <button
            className="mt-5 px-7 py-1 text-white text-sm bg-[#569788] rounded-[20px] transition-all duration-300 hover:bg-[#84A59D] mr-5"
            onClick={handleSubmit}
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
}
