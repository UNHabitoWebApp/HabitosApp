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

            {/* Menú desplegable para cambiar modo */}
            <div className="relative">
                <button
                    onClick={toggleDropdown}
                    className="px-3 py-1 bg-verdePrincipal text-white rounded hover:bg-verdePrincipalHover transition"
                >
                    Cambiar vista
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
                            {currentMode === 'week' ? 'Cambiar a Día' : 'Cambiar a Semana'}
                        </button>
                    </div>
                )}
            </div>
            {/* Contenedor de flechas */}
            <div className="flex items-center gap-2">
                <button
                    onClick={backwardAction}
                    className="text-verdePrincipal hover:text-verdePrincipalHover transition"
                >
                    &#8592; {/* Flecha izquierda */}
                </button>
                <button
                    onClick={forwardAction}
                    className="text-verdePrincipal hover:text-verdePrincipalHover transition"
                >
                    &#8594; {/* Flecha derecha */}
                </button>
            </div>
        </div>
    );
};

export default CalendarPanel;
