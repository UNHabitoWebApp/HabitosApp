import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import RoutineFormEdit from "./RoutineFormEdit";
import PersonalizedForm from "./PersonalizedFormEdit";
import FeedbackScreen from "../createHabbit/FeedbackScreen";
import BackToHomeButton from "../createHabbit/BackToHomeButton";
import getData from "../../service/get";
import patchData from "../../service/patch";

export default function HabitSelectorEdit() {
  const [screen, setScreen] = useState("select");
  const [feedbackData, setFeedbackData] = useState(null);
  const [routineData, setRoutineData] = useState(null);
  const { id } = useParams();
  const [personalizedData, setPersonalizedData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const validExerciseTypes = ["cardio", "fuerza", "flexibilidad"];

  useEffect(() => {
    const fetchData = async () => {
      try {
        let data = await getData(`routine/routine/${id}`);
        if (!data || Object.keys(data).length === 0) {
          throw new Error("No encontrado");
        }
        console.log(data);
        if (data?.exercises?.length > 0) {
          const filteredExercises = data.exercises
            .map(ex => ({
              _id: ex._id,
              exerciseType: ex.exerciseType.toLowerCase(),
              name: ex.name || "",
            }));
  
          setRoutineData({
            name: data.name || "",
            exercises: filteredExercises,
            days: data.days || [],
            beginTime: data.beginTime || "",
            endTime: data.endTime || "",
          });
  
          setTimeout(() => setScreen("routineForm"), 50); // Forzar re-render
        } else {
          setPersonalizedData(data);
          setTimeout(() => setScreen("personalizedForm"), 50); // Forzar re-render
        }
        console.log(routineData);
      } catch (err) {
        try {
          const altData = await getData(`edit_habits/edit/${id}`);
          if (altData && Object.keys(altData).length > 0) {
            setPersonalizedData(altData);
            setTimeout(() => setScreen("personalizedForm"), 50);
          } else {
            throw new Error("No encontrado en ambos endpoints");
          }
        } catch (altErr) {
          setError("Error al cargar los datos");
          console.error(altErr);
        }
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, [id]);

  const handleRoutineSave = async (updatedRoutine) => {
    try {
      await patchData(`routine/routine/${id}`, updatedRoutine);
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

  const handlePersonalizedSave = async (notificarme) => {
    try {
      await patchData(`edit_habits/edit/${id}`, {
        ...personalizedData,
        notificarme,
      });
      setFeedbackData({
        title: notificarme
          ? "¡Hábito personalizado guardado con notificación!"
          : "¡Hábito personalizado guardado!",
        description: notificarme
          ? "Recibirás notificaciones para este hábito."
          : "Tu hábito personalizado ha sido registrado.",
      });
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
      {screen === "routineForm" && routineData && (
        <RoutineFormEdit onSave={handleRoutineSave} initialData={routineData} />
      )}
      {screen === "personalizedForm" && personalizedData && (
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
