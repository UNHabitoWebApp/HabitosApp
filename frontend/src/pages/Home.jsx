<<<<<<< HEAD
import React from 'react';
import Login from '../pages/Login'; // Asegúrate de que la ruta es correcta

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <Login /> {/* Aquí se renderiza el componente Login */}
    </div>
  );
=======
import Calendar from "../components/Calendar";
import HabitManager from "../components/HabitManager";

const Home = () => {
    return (
        <div className="relative flex flex-col lg:flex-row items-center lg:items-start justify-center 
            w-full h-[90vh] pb-2 sm:pt-3 sm:pb-3 lg:pt-5 lg:pb-5 mt-5 sm:mt-8 lg:mt-10 
            gap-10 px-4 lg:px-8 overflow-hidden">

            {/* Calendario ocupa más espacio en pantallas grandes */}
            <div className="w-full h-full lg:flex-[3] flex justify-center">
                <Calendar />
            </div>

            {/* HabitManager más pequeño en pantallas grandes */}
            <HabitManager />
        </div>
    );
>>>>>>> main
};

export default Home;
