import { useState } from "react";
import RoutineForm from "./RoutineForm";
import BackToHomeButton from "./BackToHomeButton";
import personalized from "../../assets/icons/personalized.png"; 
import routine from "../../assets/icons/routine.png"; 


export default function HabitSelector() {
  const [selectedHabit, setSelectedHabit] = useState(null);

  return (
    <div className="flex flex-col items-center min-h-screen">
      {/* Header */}
      <div className="w-full h-16 bg-[#5F936C]"></div>

      {/* Contenedor tipo de hábito */}
      <div className="flex flex-col items-center mt-5 p-3 bg-[#ADD9C5] border-2 border-[#5F936C] rounded-[20px] w-full max-w-md">

        {/* Título tipo de hábito */}
        <h2 className="font-normal text-black text-[15px]">Tipo de hábito</h2>
        <div className="flex gap-10 mt-1">
          <button
            className={`flex items-center gap-1 min-w-[120px] px-3 py-1 text-white text-sm rounded-[20px] transition-all duration-300 ${
              selectedHabit === "personalized"
                ? "bg-[#569788]"
                : "bg-[#84A59D]"
            }`}
            onClick={() => setSelectedHabit("personalized")}
          >
            <img src={personalized} alt="personalized" className="w-4 h-4" />
            <span className="w-full text-center">Personalizado</span>
          </button>
          <button
            className={`flex items-center min-w-[120px] px-3 py-1 text-white text-sm rounded-[20px] transition-all duration-300 ${
              selectedHabit === "routine"
                ? "bg-[#569788]"
                : "bg-[#84A59D]"
            }`}
            onClick={() => setSelectedHabit("routine")}
          >
            <img src={routine} alt="routine" className="w-4 h-4" />
            <span className="w-full text-center">Rutina</span>
          </button>
        </div>
      </div>

      {/* Mostramos RoutineForm solo si se selecciona "Rutina" */}
      {selectedHabit === "routine" && <RoutineForm/>}    

      {/* Botón de volver al inicio, oculto si se selecciona "Personalizado" o "Rutina" */}
      {!selectedHabit && (
        <BackToHomeButton />
      )}

      {/* Footer */}
      <div className="w-full h-[30px] bg-[#5F936C] mt-auto"></div>
    </div>
  );
}
