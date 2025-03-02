import { useState } from "react";
import BackToHomeButton from "../createHabbit/BackToHomeButton";
import Plus from "../../assets/icons/plus.svg";

export default function ExerciseForm() {
  const exercise = { name: "Hip thrust", type: "cardio" }; // Cambia a "strength" para probar
  const [sets, setSets] = useState([{ reps: "", weight: "", time: "" }]);
  const [observations, setObservations] = useState("");
  const [isChecked, setIsChecked] = useState(false); // Estado del checkbox

  const addSet = () => {
    setSets([...sets, { reps: "", weight: "", time: "" }]);
  };

  const handleChange = (index, field, value) => {
    const newSets = sets.map((set, i) =>
      i === index ? { ...set, [field]: value } : set
    );
    setSets(newSets);
  };

  return (
    <div className="flex flex-col items-center min-h-[80vh] bg-[#F0F7F5]">
      {/* Contenedor Invisible */}
      <div className="w-full flex justify-center px-4 pt-4">
        {/* Contenedor del formulario */}
        <div className="p-5 border-2 bg-[#ADD9C5] border-[#5F936C] rounded-[20px] shadow-lg w-full max-w-[450px] transition-all duration-300">
          <h2 className="text-lg font-bold text-center mb-4">{exercise.name}</h2>

          {/* Contenedor dinámico de inputs */}
          <div className="w-full min-h-[50px] rounded-[15px] overflow-hidden transition-all duration-300 ease-in-out p-3 bg-[#ADD9C5] flex flex-col gap-2">
            {sets.map((set, index) => (
              <div key={index} className="w-full">
                {exercise.type === "strength" ? (
                  <div className="flex justify-between w-full">
                    {/* Repeticiones a la izquierda */}
                    <div className="flex flex-col w-24">
                      <label className="text-xs font-semibold">Reps</label>
                      <input
                        type="number"
                        value={set.reps}
                        onChange={(e) => handleChange(index, "reps", e.target.value)}
                        className="p-1 border rounded text-sm w-full mt-1"
                      />
                    </div>

                    {/* Kilogramos a la derecha */}
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
                    {/* Tiempo (ocupa toda la fila) */}
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

          {/* Botón para agregar más sets */}
          <button
            className="mt-3 w-full bg-[#569788] text-white text-[15px] p-1 rounded-[10px] flex items-center justify-center hover:bg-[#84A59D]"
            onClick={addSet}
          >
            <img src={Plus} alt="add" className="w-5 h-5" />
          </button>

          {/* Checkbox agregado */}
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

          {/* Observaciones */}
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

      {/* Contenedor Invisible para los Botones */}
      <div className="w-full flex justify-center mt-4 pb-4">
        <div className="flex justify-between w-full max-w-[450px]">
          <BackToHomeButton additionalClasses="ml-5" />
          <button
            className="mt-5 px-7 py-1 text-white text-sm bg-[#569788] rounded-[20px] transition-all duration-300 hover:bg-[#84A59D] mr-5"
            onClick={() => {
              console.log("Datos guardados:", isChecked);
            }}
          >
            Guardar
          </button>
        </div>
      </div>

    </div>
  );
}
