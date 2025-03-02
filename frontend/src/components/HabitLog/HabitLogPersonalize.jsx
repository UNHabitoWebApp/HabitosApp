import { useState } from "react";
import BackToHomeButton from "../createHabbit/BackToHomeButton";

export default function ExerciseForm() {
  const exercise = { name: "Hip thrust" };

  // Variables dinámicas (ejemplo quemado)
  const fields = [
    { name: "Peso levantado", type: "number" },
    { name: "Dificultad percibida", type: "rating" },
    { name: "Dolor muscular", type: "checkbox" }
  ];

  // Estado dinámico para cada campo
  const [formData, setFormData] = useState(
    Object.fromEntries(fields.map((field) => [field.name, field.type === "checkbox" ? false : ""]))
  );
  const [observations, setObservations] = useState("");

  // Manejo de cambios
  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-[#F0F7F5]">
      {/* Header */}
      <div className="w-full h-16 bg-[#5F936C]"></div>

      {/* Contenedor Invisible */}
      <div className="w-full flex justify-center px-4 pt-4">
        {/* Contenedor del formulario */}
        <div className="p-5 border-2 bg-[#ADD9C5] border-[#5F936C] rounded-[20px] shadow-lg w-full max-w-[450px] transition-all duration-300">
          <h2 className="text-lg font-bold text-center mb-4">{exercise.name}</h2>

          {/* Contenedor dinámico de inputs */}
          <div className="w-full min-h-[50px] rounded-[15px] overflow-hidden transition-all duration-300 ease-in-out p-3 bg-[#ADD9C5] flex flex-col gap-3">
            {fields.map((field) => (
              <div key={field.name} className="flex flex-col w-24">
                <label className="text-xs font-semibold">{field.name}</label>
                {field.type === "number" && (
                  <input
                    type="number"
                    value={formData[field.name]}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                    className="p-1 border rounded text-sm w-full mt-1"
                  />
                )}
                {field.type === "rating" && (
                  <select
                    value={formData[field.name]}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                    className="p-1 border rounded text-sm w-full mt-1"
                  >
                    <option value="">Selecciona</option>
                    {[...Array(10)].map((_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </select>
                )}
                {field.type === "checkbox" && (
                  <div className="flex items-center mt-2">
                    <input
                      type="checkbox"
                      checked={formData[field.name]}
                      onChange={(e) => handleChange(field.name, e.target.checked)}
                      className="w-4 h-4 border-2 border-[#5F936C] rounded focus:ring-2 focus:ring-[#5F936C] cursor-pointer"
                    />
                  </div>
                )}
              </div>
            ))}
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
            onClick={() => console.log("Datos guardados:", formData, observations)}
          >
            Guardar
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="w-full h-[30px] bg-[#5F936C] mt-auto"></div>
    </div>
  );
}
