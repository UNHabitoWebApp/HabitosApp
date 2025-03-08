import { useState } from "react";
import BackToHomeButton from "./BackToHomeButton";
import add from "../../assets/icons/add.svg";
import PropTypes from "prop-types";
import postData from "../../service/post";

export default function PersonalizedForm({ onSave }) {

  const [personalized, setPersonalized] = useState({
    name: "",
    variables: [{ type: "", name: "" }],
    days: [],
    beginTime: "",
    endTime: "",
    notifyMe: false,
    personalized: true,
  });

  const addVariable = () => {
    setPersonalized((prev) => ({
      ...prev,
      variables: [...prev.variables, { type: "", name: "" }],
    }));
  };

  const updateVariable = (index, field, value) => {
    const updatedVariables = [...personalized.variables];
    updatedVariables[index][field] = value;
    setPersonalized({ ...personalized, variables: updatedVariables });
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

    setPersonalized((prev) => ({
      ...prev,
      days: prev.days.includes(dayName)
        ? prev.days.filter((d) => d !== dayName) // Eliminar si ya está
        : [...prev.days, dayName], // Agregar si no está
    }));
  };


  const handleSave = async () => {
    try {
      const data = await postData("create_habits/personalized", personalized);
      console.log("Hábito guardado exitosamente:", data);
      onSave(personalized.notifyMe);
    } catch (error) {
      console.error("Error al enviar los datos:", error);
    }
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
                <option value="integer">Número</option>
                <option value="enum">Valoración (1 -10)</option>
                <option value="boolean">Checkbox</option>
              </select>
            </div>
            <div className="flex flex-col flex-1">
              <label className="text-[13px] text-black font-roboto">Etiqueta</label>
              {/* Input de etiqueta de la variable*/}
              <input
                type="text"
                placeholder="Ej: Hojas leídas"
                className="h-8 p-1 border border-[#5F936C] bg-white text-black text-sm w-full"
                value={variable.name}
                onChange={(e) => updateVariable(index, "name", e.target.value)}
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
                        personalized.days.includes(daysMapping[day]) ? "bg-[#569788]" : ""
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
                      value={personalized.beginTime.split(":")[0] || ""}
                      onChange={(e) =>
                          setPersonalized({ ...personalized, beginTime: `${e.target.value}:${personalized.beginTime.split(":")[1] || "00"}` })
                      }
                  />
                  <span className="text-black">:</span>
                  <input
                      type="number"
                      placeholder="00"
                      className="w-10 h-10 text-center border border-[#5F936C] rounded-md text-black"
                      value={personalized.beginTime.split(":")[1] || ""}
                      onChange={(e) =>
                          setPersonalized({ ...personalized, beginTime: `${personalized.beginTime.split(":")[0] || "00"}:${e.target.value}` })
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
              <input 
                type="checkbox" 
                checked={personalized.notifyMe} 
                onChange={() => 
                  setPersonalized((prev) => ({
                    ...prev,
                    notifyMe: !prev.notifyMe,
                  }))
                } 
              />
              Notificarme
            </label>
          </div>
      </div>

      

      {/* Botones de acción */}
      <div className="mt-1 mb-5 flex justify-center gap-4 w-full max-w-md">
          <BackToHomeButton/>
          <button className="mt-5 px-7 py-1 text-white text-sm bg-[#569788] rounded-[20px] transition-all duration-300 hover:bg-[#84A59D]"
          onClick={handleSave}
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
