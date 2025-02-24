import { useState } from "react";
import BackToHomeButton from "./BackToHomeButton";
import add from "../../assets/icons/add.png";
import PropTypes from "prop-types";

export default function PersonalizedForm({ onSave }) {
  const [notificarme, setNotificarme] = useState(false);

  const [personalized, setPersonalized] = useState({
    name: "",
    variables: [{ type: "", etiqueta: "" }],
    days: [],
    startTime: "",
    endTime: "",
  });

  const addVariable = () => {
    setPersonalized((prev) => ({
      ...prev,
      variables: [...prev.variables, { type: "", etiqueta: "" }],
    }));
  };

  const updateVariable = (index, field, value) => {
    const updatedVariables = [...personalized.variables];
    updatedVariables[index][field] = value;
    setPersonalized({ ...personalized, variables: updatedVariables });
  };

  return (
    <>
      {/* Bloque nombre */}
      <div className="mt-2 p-2 bg-[#ADD9C5] border-2 border-[#5F936C] rounded-[20px] w-full max-w-md">
        <h2 className="text-black text-[15px] text-center">Nombre del hábito</h2>
        {/* Input para el nombre del hábito */}
        <input
            type="text"
            placeholder="Ingresa el nombre del hábito a agregar"
            className="mt-1 w-3/4 h-8 p-1 border border-[#5F936C] bg-white text-black text-sm block mx-auto"
            value={personalized.name}
            onChange={(e) => setPersonalized({ ...personalized, name: e.target.value })}
         />     
      </div>

      {/* Bloque variables personalizadas */}
      <div className="mt-2 p-3 bg-[#ADD9C5] border-2 border-[#5F936C] rounded-[20px] w-full max-w-md">
        <h2 className="text-black text-[15px] text-center mb-2 flex items-center justify-center gap-2">Variables personalizadas
          <span title="Si eliges una variable numérica como valoración, número o checkbox, podemos darte estadísticas personalizadas sobre este aspecto de tu hábito." className="cursor-pointer">
                ⓘ
          </span>
        </h2>

        {personalized.variables.map((variable, index) => (
          <div key={index} className="flex gap-4 mt-2">
            <div className="flex flex-col flex-1">
              <label className="text-[13px] text-black font-roboto">Tipo</label>
              {/* Select de tipo de variable */}
              <select
                className="h-8 p-1 border border-[#5F936C] rounded-[10px] bg-white text-black text-sm w-full"
                value={variable.type}
                onChange={(e) => updateVariable(index, "type", e.target.value)}
              >
                <option value="">Seleccione el tipo</option>
                <option value="numero">Número</option>
                <option value="validacion">Valoración (1 -10)</option>
                <option value="checkbox">Checkbox</option>
              </select>
            </div>
            <div className="flex flex-col flex-1">
              <label className="text-[13px] text-black font-roboto">Etiqueta</label>
              {/* Input de etiqueta de la variable*/}
              <input
                type="text"
                placeholder="Ej: Hojas leídas"
                className="h-8 p-1 border border-[#5F936C] bg-white text-black text-sm w-full"
                value={variable.etiqueta}
                onChange={(e) => updateVariable(index, "etiqueta", e.target.value)}
              />
            </div>
          </div>
        ))}

        {/* Botón de agregar variable */}
        <button
          className="mt-3 w-full bg-[#569788] text-white text-[15px] p-1 rounded-[10px] flex items-center justify-center hover:bg-[#84A59D]"
          onClick={addVariable}
        >
          <img src={add} alt="add" className="w-5 h-5" />
        </button>
      </div>
      
      {/* Bloque Horario */}
      <div className="mt-2 p-2 bg-[#ADD9C5] border-2 border-[#5F936C] rounded-[20px] w-full max-w-md">
          <h2 className="text-black text-[15px] text-center mb-2 flex items-center justify-center gap-2">Horario 
            <span title="Si al hábito no se le ingresa día y hora, el hábito quedará como no programado" className="cursor-pointer">
                ⓘ
            </span>
          </h2>
      
          <div className="flex items-center justify-between">
              {/* Días de la semana */}
              <div className="flex flex-col items-center">
                  <h2 className="text-[13px] text-black mb-1">Días de la semana</h2>
                  <div className="flex gap-1">
                      {["L", "M", "W", "J", "V", "S", "D"].map((day, index) => (
                      <button
                          key={index}
                          className={`w-6 h-6 flex items-center justify-center border border-[#5F936C] rounded-full text-black text-[12px] transition-all duration-200 ${
                          personalized.days.includes(day) ? "bg-[#569788]" : ""
                          }`}
                          onClick={() => {
                          setPersonalized((prev) => ({
                              ...prev,
                              days: prev.days.includes(day)
                              ? prev.days.filter((d) => d !== day)
                              : [...prev.days, day],
                          }));
                          }}
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
                      value={personalized.startTime.split(":")[0] || ""}
                      onChange={(e) =>
                          setPersonalized({ ...personalized, startTime: `${e.target.value}:${personalized.startTime.split(":")[1] || "00"}` })
                      }
                  />
                  <span className="text-black">:</span>
                  <input
                      type="number"
                      placeholder="00"
                      className="w-10 h-10 text-center border border-[#5F936C] rounded-md text-black"
                      value={personalized.startTime.split(":")[1] || ""}
                      onChange={(e) =>
                          setPersonalized({ ...personalized, startTime: `${personalized.startTime.split(":")[0] || "00"}:${e.target.value}` })
                      }
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
                          value={personalized.endTime.split(":")[0] || ""}
                          onChange={(e) =>
                              setPersonalized({ ...personalized, endTime: `${e.target.value}:${personalized.endTime.split(":")[1] || "00"}` })
                          }
                      />
                      <span className="text-black">:</span>
                      <input
                          type="number"
                          placeholder="00"
                          className="w-10 h-10 text-center border border-[#5F936C] rounded-md text-black"
                          value={personalized.endTime.split(":")[1] || ""}
                          onChange={(e) =>
                              setPersonalized({ ...personalized, endTime: `${personalized.endTime.split(":")[0] || "00"}:${e.target.value}` })
                          }
                      />
                  </div>
              </div>
          </div>
          {/* Notificarme */}
          <div className="flex justify-center items-center w-full mt-2">
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={notificarme} onChange={() => setNotificarme(!notificarme)} />
              Notificarme
            </label>
          </div>
      </div>

      

      {/* Botones de acción */}
      <div className="mt-1 mb-5 flex justify-center gap-4 w-full max-w-md">
          <BackToHomeButton/>
          <button className="mt-5 px-7 py-1 text-white text-sm bg-[#569788] rounded-[20px] transition-all duration-300 hover:bg-[#84A59D]"
          onClick={() => {
            console.log("Datos guardados:", personalized);
            onSave(notificarme);
          }}
          >
          Guardar
          </button>
      </div>
    </>
  );
}

PersonalizedForm.propTypes = {
  onSave: PropTypes.func.isRequired,
};
