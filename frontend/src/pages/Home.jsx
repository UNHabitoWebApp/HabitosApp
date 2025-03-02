import Calendar from "../components/Calendar";
import HabitManager from "../components/HabitManager";

const Home = () => {
    return (
        <div className="relative flex flex-col lg:flex-row items-center lg:items-start justify-center 
            w-full h-[80vh] gap-10 lg:gap-16 px-4 overflow-hidden">

            {/* Calendario ocupa más espacio en pantallas grandes */}
            <div className="w-full h-full lg:flex-[3] flex justify-center">
                <Calendar />
            </div>

            {/* HabitManager más pequeño en pantallas grandes */}
            <HabitManager />
        </div>
    );
};

export default Home;
