import { useState, useEffect } from "react";
import { HiX } from "react-icons/hi";
import PropTypes from "prop-types";
import { useControlActions, useControlSelectors } from "../../hooks/useControlActions";
import { useNavigate } from "react-router-dom";
import { fetchUserHabits } from "../../service/fetchUserHabits";

const HabitManager = () => {
    const { openHabitManager: isOpen } = useControlSelectors();
    const { setVariable } = useControlActions();
    const navigate = useNavigate();
    const onClose = () => setVariable("openHabitManager", false);

    const [scheduledHabits, setScheduledHabits] = useState([]);

    useEffect(() => {
        const fetchHabits = async () => {
            try {
                const data = await fetchUserHabits(); // Ajusta la ruta según tu backend
                setScheduledHabits(data);
            } catch (error) {
                console.error("Error fetching habits:", error);
            }
        };
        fetchHabits();
    }, []);

    return (
        <div
            className={`fixed top-0 right-0 h-full w-72 bg-verdeTerciario shadow-lg border-2 border-verdePrincipal 
                p-4 transform ${isOpen ? "translate-x-0" : "translate-x-full"} 
                transition-transform duration-300 ease-in-out lg:relative lg:w-64 lg:translate-x-0 lg:h-full 
                flex flex-col rounded-l-2xl lg:rounded-2xl z-40`}
        >
            {/* Encabezado */}
            <div className="flex items-center justify-between mb-1">
                <h2 className="text-lg font-semibold">Tus Hábitos</h2>
                <button onClick={onClose} className="lg:hidden text-black hover:text-gray-700 transition-colors duration-200">
                    <HiX className="w-5 h-5" />
                </button>
            </div>

            {/* Lista de hábitos y botón */}
            <div className="flex flex-col flex-1">
                <HabitList title="Programados" habits={scheduledHabits} />
                <button
                    className="bg-verdePrincipal p-4 m-1 rounded-full shadow-md border-2 border-verdePrincipal flex items-center justify-center 
                    transition-all duration-200 hover:bg-verdeSecundario hover:border-verdeOscuro hover:shadow-lg cursor-pointer group"
                    onClick={() => navigate("/add")}
                >
                    <p className="text-white group-hover:text-black">Añadir Hábito</p>
                </button>
            </div>
        </div>
    );
};

const HabitList = ({ title, habits }) => (
    <div className="flex flex-col flex-1">
        <h3 className="text-md font-semibold mb-2">{title}</h3>
        <div className="flex-1 overflow-y-auto p-2 border-2 bg-white border-verdePrincipal rounded-md shadow-md custom-scrollbar">
            <div className="flex flex-col gap-2">
                {habits.length > 0 ? (
                    habits.map((habit, index) => <HabitItem key={index} habit={habit} />)
                ) : (
                    <p className="text-gray-500 text-center">No hay hábitos programados</p>
                )}
            </div>
        </div>
    </div>
);

const HabitItem = ({ habit }) => (
    <div className="bg-white h-8 px-4 flex items-center border rounded-md shadow-sm relative">
        <div className="w-1 h-full bg-verdePrincipal absolute left-0 rounded-l-md"></div>
        <span className="text-verdeTerciario">{habit.name}</span> {/* ← Aquí accedemos a `name` */}
    </div>
);

HabitList.propTypes = {
    title: PropTypes.string.isRequired,
    habits: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
        })
    ).isRequired,
};

HabitItem.propTypes = {
    habit: PropTypes.shape({
        name: PropTypes.string.isRequired,
    }).isRequired,
};

export default HabitManager;
