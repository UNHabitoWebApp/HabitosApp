import { useCurrentDateInfo, useDateActions } from '../../hooks/useDateActions';
import { useState } from 'react';

const CalendarPanel = () => {
    const { backwardAction, forwardAction, toggleModeAction, resetCurrent } = useDateActions();
    const { currentMode } = useCurrentDateInfo();
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

    return (
        <div className="flex justify-between items-center px-4 py-2 bg-gray-100 border-b border-gray-300">
            {/* Botón "Hoy" */}
            <button
                onClick={resetCurrent}
                className="px-3 py-1 bg-verdePrincipal text-white rounded hover:bg-verdePrincipalHover transition"
            >
                Hoy
            </button>


            {/* Contenedor de flechas */}
            <div className="flex items-center gap-4">
                {/* Flecha izquierda */}
                {/* Menú desplegable para cambiar modo */}
                <div className="relative">
                    <button
                        onClick={toggleDropdown}
                        className="px-3 py-1 bg-verdePrincipal text-white rounded hover:bg-verdePrincipalHover transition"
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
                <button
                    onClick={backwardAction}
                    className="p-2 rounded-full hover:bg-gray-300 transition flex items-center justify-center"
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

                {/* Flecha derecha */}
                <button
                    onClick={forwardAction}
                    className="p-2 rounded-full hover:bg-gray-300 transition flex items-center justify-center"
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

        </div>
    );
};

export default CalendarPanel;
