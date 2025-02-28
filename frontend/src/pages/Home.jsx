import { useState } from "react";
import Calendar from "../components/Calendar";
import HabitManager from "../components/HabitManager";

const Home = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="relative flex flex-col lg:flex-row items-center lg:items-start justify-center 
            w-full h-[90vh] pb-2 sm:pt-3 sm:pb-3 lg:pt-5 lg:pb-5 mt-5 sm:mt-8 lg:mt-10 
            gap-10 px-4 lg:px-8 overflow-hidden">

            {/* Botón para abrir menú en móviles */}
            <button
                onClick={() => setIsSidebarOpen(true)}
                className="absolute top-4 left-4 lg:hidden px-3 py-2 bg-green-500 text-white rounded-md shadow-md"
            >
                Hábitos
            </button>

            {/* Calendario ocupa más espacio en pantallas grandes */}
            <div className="w-full h-full lg:flex-[3] flex justify-center">
                <Calendar />
            </div>

            {/* HabitManager más pequeño en pantallas grandes */}
            <HabitManager isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        </div>
    );
};

export default Home;
