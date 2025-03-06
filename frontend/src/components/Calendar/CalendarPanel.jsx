import { FaEllipsisV } from "react-icons/fa";
import { useControlActions } from '../../hooks/useControlActions';
import { useCurrentDateInfo, useDateActions, useDateSelectors } from '../../hooks/useDateActions';
import { useState } from 'react';
import { formatSmallDate } from "../../utils/dateUtils";

const CalendarPanel = () => {
    const { backwardAction, forwardAction, toggleModeAction, resetCurrent } = useDateActions();
    const { setVariable } = useControlActions();
    const { actualLabel } = useDateSelectors();
    const { currentMode } = useCurrentDateInfo();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

    return (
        <div className="flex justify-between items-center px-4 py-2 bg-gray-100 border-b border-gray-300">
            <div className="flex items-center gap-2">
                <button
                    onClick={resetCurrent}
                    className="px-3 py-1 bg-verdePrincipal text-white rounded hover:bg-verdePrincipalHover transition"
                >
                    Hoy
                </button>
                <h2 className="hidden sm:block sm:text-sm md:text-sm lg:text-md font-semibold  text-gray-700 ml-2">
                    {actualLabel}
                </h2>
                <h2 className="block sm:hidden font-semibold text-sm text-gray-700 ml-2">
                    {formatSmallDate(actualLabel)}
                </h2>

            </div>

            {/* Contenedor de flechas y modo */}
            <div className="flex items-center md:gap-2 lg:gap-4 ml-auto">
                <div className="relative">
                    <button
                        onClick={toggleDropdown}
                        className="px-3 py-1 bg-verdePrincipal text-white rounded hover:bg-verdePrincipalHover transition hidden lg:block"
                    >
                        Elegir modo
                    </button>
                    {dropdownOpen && (
                        <div className="absolute right-0 mt-2 bg-white border border-gray-200 rounded shadow-lg">
                            <button
                                onClick={() => {
                                    toggleModeAction();
                                    toggleDropdown();
                                }}
                                className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
                            >
                                {currentMode === 'week' ? 'Día' : 'Semana'}
                            </button>
                        </div>
                    )}
                </div>

                {/* Flechas agrupadas */}
                <div className="flex items-center ">
                    <button
                        onClick={backwardAction}
                        className="p-2 rounded-full md:hover:bg-gray-300 lg:hover:bg-gray-300 transition flex items-center justify-center"
                        aria-label="Retroceder"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="w-5 h-5 text-gray-700"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>

                    <button
                        onClick={forwardAction}
                        className="p-2 rounded-full md:hover:bg-gray-300 lg:hover:bg-gray-300 transition flex items-center justify-center"
                        aria-label="Avanzar"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="w-5 h-5 text-gray-700"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>

                {/* Botón de 3 puntos alineado a la derecha */}
                <div>
                    <button
                        onClick={() => setVariable("openHabitManager", true)}
                        className="lg:hidden p-2 rounded-full hover:bg-gray-300 transition flex items-center justify-center"
                        aria-label="Abrir menú"
                    >
                        <FaEllipsisV className="text-gray-700 text-xl" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CalendarPanel;
