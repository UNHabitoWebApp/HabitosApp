import { useState } from "react";
import { HiX } from "react-icons/hi";
import PropTypes from "prop-types";
import { useControlActions, useControlSelectors } from "../../hooks/useControlActions";

const HabitManager = () => {
    const { openHabitManager: isOpen } = useControlSelectors();
    const { setVariable } = useControlActions();
    const onClose = () => setVariable("openHabitManager", false);

    const [scheduledHabits] = useState([
        "Pierna", "Journaling", "Tomar agua", "Hábito", "Hábito", "Hábito",
        "Pierna", "Journaling", "Tomar agua", "Hábito", "Hábito", "Hábito"
    ]);

    const [unscheduledHabits] = useState([
        "Hábito", "Hábito", "Hábito", "Hábito", "Hábito", "Hábito", "Hábito", "Hábito", "Hábito", "Hábito"
    ]);

    return (
        <div
            className={`fixed top-0 right-0 h-full w-72 bg-verdeTerciario shadow-lg border-2 border-verdePrincipal 
                p-4 transform ${isOpen ? "translate-x-0" : "translate-x-full"} 
                transition-transform duration-300 ease-in-out lg:relative lg:w-64 lg:translate-x-0 lg:h-full 
                flex flex-col rounded-l-2xl lg:rounded-2xl z-40`}
        >
            {/* Encabezado principal */}
            {/* Encabezado principal con botón de cierre */}
            <div className="flex items-center justify-between mb-1">
                <h2 className="text-lg font-semibold">Tus Hábitos</h2>
                <button onClick={onClose} className="lg:hidden text-black hover:text-gray-700 transition-colors duration-200">
                    <HiX className="w-5 h-5" />
                </button>
            </div>


            {/* Contenedor de listas de hábitos */}
            <div className="flex flex-col flex-1">
                <HabitList title="Programados" habits={scheduledHabits} />
                <HabitList title="No Programados" habits={unscheduledHabits} />

                {/* Botón para añadir hábito */}
                <div className="bg-verdePrincipal p-4 m-1 rounded-full shadow-md border-2 border-verdePrincipal flex items-center justify-center 
                    transition-all duration-200 hover:bg-verdeSecundario hover:border-verdeOscuro hover:shadow-lg cursor-pointer group">
                    <p className="text-white group-hover:text-black">Añadir Hábito</p>
                </div>

            </div>
        </div>
    );
};

const HabitList = ({ title, habits }) => (
    <div className="flex-1">
        <h3 className="text-md font-semibold mb-2">{title}</h3>
        <div className="h-[14rem] lg:h-[11.5rem] overflow-y-scroll p-2 border-2 bg-white border-verdePrincipal rounded-md shadow-md custom-scrollbar">
            <div className="flex flex-col gap-2">
                {habits.map((habit, index) => (
                    <HabitItem key={index} habit={habit} />
                ))}
            </div>
        </div>
    </div>
);

const HabitItem = ({ habit }) => (
    <div className="bg-white h-8 px-4 flex items-center border rounded-md shadow-sm relative">
        <div className="w-1 h-full bg-verdePrincipal absolute left-0 rounded-l-md"></div>
        <span className="text-verdeTerciario">{habit}</span>
    </div>
);

HabitList.propTypes = {
    title: PropTypes.string.isRequired,
    habits: PropTypes.arrayOf(PropTypes.string).isRequired,
};

HabitItem.propTypes = {
    habit: PropTypes.string.isRequired,
};

export default HabitManager;
