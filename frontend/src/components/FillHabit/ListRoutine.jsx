import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import getData from "../../service/get";

import routineIcon from "../../assets/icons/person.svg";
import strengthIcon from "../../assets/icons/pesa.svg";
import cardioIcon from "../../assets/icons/cardio.svg";
import stadisticIcon from "../../assets/icons/stadistic.svg";
import lapixIcon from "../../assets/icons/lapix.svg";
import BackToHomeButton from "../createHabbit/BackToHomeButton";

export default function ExerciseRoutine() {
  const { id } = useParams(); // Obtiene el ID de la rutina desde la URL
  const navigate = useNavigate(); // Hook para la navegación
  const [routine, setRoutine] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRoutine = async () => {
      try {
        const response = await getData(`routine/routine/${id}`);
        setRoutine(response);
      } catch (err) {
        setError("Error al cargar la rutina");
      } finally {
        setLoading(false);
      }
    };

    fetchRoutine();
  }, [id]);

  const getTypeIcon = (type) => {
    switch (type) {
      case "Fuerza":
        return strengthIcon;
      case "Cardio":
        return cardioIcon;
      default:
        return routineIcon;
    }
  };
  const handleEditClick = () => {
    navigate(`/edit/routine/${id}`);
  };
  if (loading) return <p className="text-center">Cargando rutina...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="flex flex-col items-center min-h-[80vh] bg-[#F0F7F5]">
      <div className="flex items-center justify-center flex-1 w-full px-4">
        <div className="bg-white p-5 border-2 border-[#5F936C] rounded-[20px] shadow-lg w-full max-w-[450px]">
          {/* Rutina Header */}
          <div className="bg-[#ADD9C5] p-3 sm:p-4 rounded-[20px] w-full flex items-center border-[#5F936C] border-2">
            <img
              src={routineIcon}
              alt="Routine"
              className="w-6 h-6 sm:w-7 sm:h-8 flex-shrink-0"
            />
            <h2 className="text-sm sm:text-base font-bold text-black text-center w-full mx-2">
              {routine.name}
            </h2>
            <img
              src={lapixIcon}
              alt="Edit"
              className="w-5 h-5 flex-shrink-0 cursor-pointer"
              onClick={handleEditClick} // Navega a la ruta de edición
            />
          </div>

          {/* Lista de ejercicios */}
          <div className="space-y-3 sm:space-y-4 mt-4 w-full max-w-md mx-auto">
            {routine.exercises.map((exercise) => (
              <div
                key={exercise._id}
                className="flex items-center bg-[#ADD9C5] p-4 rounded-[20px] border-2 border-[#5F936C]"
              >
                <button
                  className="w-4/5 bg-white text-black border rounded-[10px] p-2 text-xs sm:text-sm text-left border-[#5F936C]"
                  onClick={() =>
                    navigate(`/routine_exercise/${routine._id}/${exercise._id}`)
                  }
                >
                  {exercise.name}
                </button>
                <img src={getTypeIcon(exercise.exerciseType)} alt="Exercise Type" className="w-5 h-5 sm:w-6 sm:h-6 ml-2" />
              </div>
            ))}
          </div>

          {/* Botón Volver */}
          <div className="flex justify-center mt-2 sm:mt-1">
            <BackToHomeButton />
          </div>
        </div>
      </div>
    </div>
  );
}
