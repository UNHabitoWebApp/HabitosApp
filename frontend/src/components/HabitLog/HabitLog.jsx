import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BackToHomeButton from "../createHabbit/BackToHomeButton";
import Plus from "../../assets/icons/plus.svg";
import getData from "../../service/get";
import postData from "../../service/post";

export default function ExerciseForm() {
  const { routine_id, exercise_id } = useParams(); // Obtiene routine_id y exercise_id de la URL
  const navigate = useNavigate();

  const [exercise, setExercise] = useState(null);
  const [sets, setSets] = useState([]);
  const [observations, setObservations] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 🚀 Obtener la plantilla del hábito (ejercicio) desde el backend
  useEffect(() => {
    async function fetchExerciseTemplate() {
      try {
        const exerciseData = await getData(`edit_habits/edit/${exercise_id}`);
        setExercise(exerciseData);

        // Inicializar sets según las variables del ejercicio
        const initialSets = exerciseData.variables.map((variable) => ({
          name: variable.name,
          value: "",
        }));
        setSets(initialSets);
      } catch (err) {
        setError("Error al cargar la plantilla del ejercicio.");
      }
    }

    fetchExerciseTemplate();
  }, [exercise_id]);

  const addSet = () => {
    setSets([...sets, { name: "Nuevo set", value: "" }]);
  };

  const handleChange = (index, value) => {
    const newSets = sets.map((set, i) =>
      i === index ? { ...set, value } : set
    );
    setSets(newSets);
  };

  const handleSave = async () => {
    if (!exercise) return;

    setLoading(true);
    setError(null);

    const habitLog = {
      routineId: routine_id,
      habitId: exercise_id,
      exerciseName: exercise.name,
      exerciseType: exercise.exerciseType,
      sets: sets.map(set => ({
        name: set.name,
        value: set.value || null,
      })),
      observations,
      notifyMe: isChecked,
    };

    try {
      await postData("habitLog/habitLog/", habitLog);
      navigate(-1); // Regresa a la pantalla anterior después de guardar
    } catch (err) {
      setError("Error al guardar los datos.");
    } finally {
      setLoading(false);
    }
  };

  if (!exercise) {
    return <p className="text-center mt-10">Cargando ejercicio...</p>;
  }

  return (
    <div className="flex flex-col items-center min-h-[80vh] bg-[#F0F7F5]">
      <div className="w-full flex justify-center px-4 pt-4">
        <div className="p-5 border-2 bg-[#ADD9C5] border-[#5F936C] rounded-[20px] shadow-lg w-full max-w-[450px]">
          <h2 className="text-lg font-bold text-center mb-4">{exercise.name}</h2>

          <div className="w-full min-h-[50px] p-3 bg-[#ADD9C5] flex flex-col gap-2">
            {sets.map((set, index) => (
              <div key={index} className="w-full">
                <label className="text-xs font-semibold">{set.name}</label>
                <input
                  type="text"
                  value={set.value}
                  onChange={(e) => handleChange(index, e.target.value)}
                  className="p-1 border rounded text-sm w-full mt-1"
                />
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
            onClick={handleSave}
            disabled={loading}
          >
            {loading ? "Guardando..." : "Guardar"}
          </button>
        </div>
      </div>

      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
}
