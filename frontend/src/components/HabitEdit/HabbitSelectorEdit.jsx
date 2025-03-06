import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Importar useParams para simular el id de la URL
import RoutineFormEdit from "./RoutineFormEdit";
import PersonalizedForm from "./PersonalizedFormEdit";
import FeedbackScreen from "../createHabbit/FeedbackScreen";
import BackToHomeButton from "../createHabbit/BackToHomeButton";

export default function HabitSelectorEdit() {
  const [screen, setScreen] = useState("select"); // Estado inicial
  const [feedbackData, setFeedbackData] = useState(null);
  const [routineData, setRoutineData] = useState(null);
  const { id } = useParams(); // Simular el id de la URL (aunque no se use en este caso)
  const [personalizedData, setPersonalizedData] = useState(null); // Estado para datos personalizados

  // Tipos de ejercicio válidos
  const validExerciseTypes = ["cardio", "fuerza", "flexibilidad"];

  useEffect(() => {
    const fakeRoutineData = {
      name: "Rutina de Ejemplo",
      type: "routinee", // Tipo de hábito: "routine" o "personalized"
      exercises: [
        { type: "cardio", name: "Correr" },
        { type: "fuerza", name: "Press de banca" },
        { type: "flexibilidad", name: "Estiramientos" },
        { type: "otro", name: "Saltar la cuerda" }, // Este tipo no es válido y será filtrado
      ],
      days: ["L", "M", "W"],
      startTime: "08:00",
      endTime: "09:00",
    };

    // Datos quemados para el hábito personalizado
    const fakePersonalizedData = {
      name: "Leer un libro",
      type: "personalized", // Tipo de hábito: "routine" o "personalized"
      variables: [
        { type: "numero", etiqueta: "Páginas leídas" },
        { type: "validacion", etiqueta: "Nivel de comprensión" },
      ],
      days: ["L", "J", "V"],
      startTime: "19:00",
      endTime: "20:00",
      notificarme: true, // Opción de notificación
    };

    // Filtrar los ejercicios para incluir solo los tipos válidos
    const filteredExercises = fakeRoutineData.exercises.filter(exercise =>
      validExerciseTypes.includes(exercise.type)
    );

    // Actualizar los datos de la rutina con los ejercicios filtrados
    setRoutineData({
      ...fakeRoutineData,
      exercises: filteredExercises,
    });

    // Actualizar los datos del hábito personalizado
    setPersonalizedData(fakePersonalizedData);

    // Determinar el screen inicial basado en el tipo de hábito
    if (fakeRoutineData.type === "routine") {
      setScreen("routineForm"); // Cargar el formulario de rutina
    } else if (fakePersonalizedData.type === "personalized") {
      setScreen("personalizedForm"); // Cargar el formulario personalizado
    }
  }, []); // Sin dependencias, se ejecuta solo una vez al montar el componente

  const handleRoutineSave = (updatedRoutine) => {
    console.log("Rutina actualizada:", updatedRoutine);
    setFeedbackData({
      title: "¡Rutina actualizada con éxito!",
      description: "Tu rutina ha sido modificada correctamente.",
    });
    setScreen("feedback");
  };

  const handlePersonalizedSave = (notificarme) => {
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
  };

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