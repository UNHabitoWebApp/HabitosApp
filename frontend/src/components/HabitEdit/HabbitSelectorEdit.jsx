import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import RoutineFormEdit from "./RoutineFormEdit";
import PersonalizedForm from "./PersonalizedFormEdit";
import FeedbackScreen from "../createHabbit/FeedbackScreen";
import BackToHomeButton from "../createHabbit/BackToHomeButton";
import getData from "../../service/get"; // Importar getData para obtener datos de la API
import patchData from "../../service/patch"; // Importar patchData para actualizar datos

export default function HabitSelectorEdit() {
  const [screen, setScreen] = useState("select"); // Estado inicial
  const [feedbackData, setFeedbackData] = useState(null);
  const [routineData, setRoutineData] = useState(null);
  const { id } = useParams(); // Obtener el id de la URL
  const [personalizedData, setPersonalizedData] = useState(null); // Estado para datos personalizados
  const [loading, setLoading] = useState(true); // Estado para manejar la carga
  const [error, setError] = useState(null); // Estado para manejar errores

  // Tipos de ejercicio válidos
  const validExerciseTypes = ["cardio", "fuerza", "flexibilidad"];

  // Obtener los datos de la API al montar el componente
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getData(`routine/routine/${id}`); // Obtener datos de la API
        if (data.type === "routine") {
          // Filtrar los ejercicios para incluir solo los tipos válidos
          const filteredExercises = data.exercises.filter(exercise =>
            validExerciseTypes.includes(exercise.type)
          );
          setRoutineData({
            ...data,
            exercises: filteredExercises,
          });
          setScreen("routineForm"); // Mostrar el formulario de rutina
        } else if (data.type === "personalized") {
          setPersonalizedData(data);
          setScreen("personalizedForm"); // Mostrar el formulario personalizado
        }
      } catch (err) {
        setError("Error al cargar los datos");
        console.error(err);
      } finally {
        setLoading(false); // Finalizar la carga
      }
    };

    fetchData();
  }, [id]); // Dependencia: id de la URL

  // Guardar la rutina actualizada
  const handleRoutineSave = async (updatedRoutine) => {
    try {
      await patchData(`routine/routine/${id}`, updatedRoutine); // Actualizar datos en la API
      setFeedbackData({
        title: "¡Rutina actualizada con éxito!",
        description: "Tu rutina ha sido modificada correctamente.",
      });
      setScreen("feedback");
    } catch (err) {
      setError("Error al guardar la rutina");
      console.error(err);
    }
  };

  // Guardar el hábito personalizado
  const handlePersonalizedSave = async (notificarme) => {
    try {
      await patchData(`routine/routine/${id}`, {
        ...personalizedData,
        notificarme,
      }); // Actualizar datos en la API
      if (notificarme) {
        setFeedbackData({
          title: "¡Hábito personalizado guardado con notificación!",
          description: "Recibirás notificaciones para este hábito.",
        });
      } else {
        setFeedbackData({
          title: "¡Hábito personalizado guardado!",
          description: "Tu hábito personalizado ha sido registrado.",
        });
      }
      setScreen("feedback");
    } catch (err) {
      setError("Error al guardar el hábito personalizado");
      console.error(err);
    }
  };

  if (loading) return <p className="text-center">Cargando...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="flex flex-col items-center min-h-[80vh]">
      {/* Mostrar el formulario correspondiente */}
      {screen === "routineForm" && (
        <RoutineFormEdit onSave={handleRoutineSave} initialData={routineData} />
      )}
      {screen === "personalizedForm" && (
        <PersonalizedForm onSave={handlePersonalizedSave} initialData={personalizedData} />
      )}
      {screen === "feedback" && (
        <>
          <FeedbackScreen
            title={feedbackData?.title}
            description={feedbackData?.description}
          />
          <BackToHomeButton />
        </>
      )}

      {screen === "select" && <BackToHomeButton />}
    </div>
  );
}