import routineIcon from "../../assets/icons/person.svg";
import strengthIcon from "../../assets/icons/pesa.svg";
import cardioIcon from "../../assets/icons/cardio.svg";
import stadisticIcon from "../../assets/icons/stadistic.svg";
import lapixIcon from "../../assets/icons/lapix.svg";
import BackToHomeButton from "../createHabbit/BackToHomeButton";

export default function ExerciseRoutine() {
  const exercises = [
    { name: "Hip thrust", type: "strength" },
    { name: "Leg extension", type: "strength" },
    { name: "Zumba con la profe Karol G", type: "cardio" },
    { name: "Estirar para mi marido", type: "flexibility" },
  ];

  const getTypeIcon = (type) => {
    switch (type) {
      case "strength":
        return strengthIcon;
      case "cardio":
        return cardioIcon;
      default:
        return routineIcon;
    }
  };

  return (
    <div className="flex flex-col items-center min-h-[80vh] bg-[#F0F7F5]">
      {/* Main Content */}
      <div className="flex items-center justify-center flex-1 w-full px-4">
        <div className="bg-white p-5 border-2 border-[#5F936C] rounded-[20px] shadow-lg w-full max-w-[450px]">
          {/* Rutina Header */}
          <div className="bg-[#ADD9C5] p-3 sm:p-4 rounded-[20px] w-full flex items-center border-[#5F936C] border-2">
            <img src={routineIcon} alt="Routine" className="w-6 h-6 sm:w-7 sm:h-8 flex-shrink-0" />
            <h2 className="text-sm sm:text-base font-bold text-black text-center w-full mx-2">
              Rutina de pierna para ponerme culona
            </h2>
            <img src={lapixIcon} alt="Edit" className="w-5 h-5 flex-shrink-0" />
          </div>

          {/* Lista de ejercicios */}
          <div className="space-y-3 sm:space-y-4 mt-4 w-full max-w-md mx-auto">
            {exercises.map((exercise, index) => (
              <div key={index} className="flex items-center bg-[#ADD9C5] p-4  rounded-[20px] border-2 border-[#5F936C]">
                <button className="w-4/5 bg-white text-black border rounded-[10px] p-2 text-xs sm:text-sm text-left border-[#5F936C]">
                  {exercise.name}
                </button>
                <img src={stadisticIcon} alt="Statistics" className="ml-2 w-5 h-5 sm:w-6 sm:h-6" />
                <img src={getTypeIcon(exercise.type)} alt="Exercise Type" className="w-5 h-5 sm:w-6 sm:h-6 ml-2" />
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
