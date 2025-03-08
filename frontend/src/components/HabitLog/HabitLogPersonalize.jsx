import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BackToHomeButton from "../createHabbit/BackToHomeButton";
import postData from "../../service/post";
import getData from "../../service/get";
import stadisticIcon from "../../assets/icons/stadistic.svg";
import lapixIcon from "../../assets/icons/lapix.svg";

import { useNavigate } from "react-router-dom";

export default function PersonalizeLog() {
  const { id } = useParams();
  const [habitTemplate, setHabitTemplate] = useState(null);
  const navigate = useNavigate(); // Hook para la navegación

  const [formData, setFormData] = useState({});
  const [observations, setObservations] = useState("");

  useEffect(() => {
    async function fetchHabitTemplate() {
      try {
        const habit = await getData(`edit_habits/edit/${id}`);
        setHabitTemplate(habit);
        
        const initialFormState = Object.fromEntries(
          habit.variables.map((field) => [
            field.name,
            field.type === "boolean" ? false : "",
          ])
        );
        setFormData(initialFormState);
      } catch (error) {
        console.error("Error al obtener el template del hábito:", error);
      }
    }
    fetchHabitTemplate();
  }, [id]);

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    if (!habitTemplate) return;

    const getDateWithTime = (timeString) => {
      const [hours, minutes] = timeString.split(":").map(Number);
      const date = new Date();
      date.setHours(hours, minutes, 0, 0);
      return date;
    };

    const beginDate = getDateWithTime(habitTemplate.beginTime);
    const endDate = getDateWithTime(habitTemplate.endTime);
    const now = new Date();
    const durationMs = endDate - beginDate;
    const habitLogDate = new Date(now.getTime() - durationMs);

    const habitLog = {
      habit_id: id,
      date: habitLogDate.toISOString(),
      completionTime: now.toISOString(),
      done: true,
      observations,
      variables: habitTemplate.variables.map((field) => ({
        name: field.name,
        value: formData[field.name],
      })),
    };

    try {
      await postData("habitLog/habitLog/", habitLog);
      console.log("Habit log guardado:", habitLog);
      navigate("/feedback", {
        state: {
          title: "¡Hábito registrado con éxito!",
          description: "Tu hábito ha sido registrado correctamente.",
        },
      });
    } catch (error) {
      console.error("Error al guardar habit log:", error);
    }
  };
  const handleEditClick = () => {
    navigate(`/edit/routine/${id}`);
  };
  if (!habitTemplate) return <p>Cargando...</p>;

  return (
    <div className="flex flex-col items-center min-h-[80vh] bg-[#F0F7F5]">
      <div className="w-full flex justify-center px-4 pt-4">
        <div className="p-5 border-2 bg-[#ADD9C5] border-[#5F936C] rounded-[20px] shadow-lg w-full max-w-[450px]">
        <div className="flex items-center justify-between mb-4">
          <img src={stadisticIcon} alt="Statistics" className="w-5 h-5 sm:w-6 sm:h-6 cursor-pointer" onClick={() => navigate(`/statistics/${id}`)}/>
          <h2 className="text-lg font-bold text-center">{habitTemplate.name}</h2>
          <img
            src={lapixIcon}
            alt="Edit"
            className="w-5 h-5 flex-shrink-0 cursor-pointer"
            onClick={handleEditClick} // Navega a la ruta de edición
          />
        </div>
          <div className="flex flex-col gap-3">
            {habitTemplate.variables.map((field) => (
              <div key={field.name} className="flex flex-col">
                <label className="text-xs font-semibold">{field.name}</label>
                {field.type === "integer" && (
                  <input
                    type="number"
                    value={formData[field.name]}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                    className="p-1 border rounded text-sm w-full mt-1"
                  />
                )}
                {field.type === "enum" && (
                  <select
                    value={formData[field.name]}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                    className="p-1 border rounded text-sm w-full mt-1"
                  >
                    <option value="">Selecciona</option>
                    {field.config.allowedValues.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                )}
                {field.type === "boolean" && (
                  <input
                    type="checkbox"
                    checked={formData[field.name]}
                    onChange={(e) => handleChange(field.name, e.target.checked)}
                    className="w-4 h-4 border-2 border-[#5F936C] rounded cursor-pointer mt-2"
                  />
                )}
                {field.type === "open" && (
                  <textarea
                    value={formData[field.name]}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                    className="w-full p-2 border rounded resize-none h-20 mt-1"
                  ></textarea>
                )}
              </div>
            ))}
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
            className="mt-5 px-7 py-1 text-white text-sm bg-[#569788] rounded-[20px] hover:bg-[#84A59D] mr-5"
            onClick={handleSubmit}
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
}