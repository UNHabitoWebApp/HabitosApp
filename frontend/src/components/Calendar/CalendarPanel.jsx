import { useCurrentDateInfo, useDateActions } from '../../hooks/useDateActions';

const CalendarPanel = () => {

    const { backwardAction, forwardAction, toggleModeAction } = useDateActions();
    const { currentMode } = useCurrentDateInfo();

    return (
        <div className="flex justify-between items-center px-4 py-2 bg-gray-100 border-b border-gray-300">
            <button
                onClick={backwardAction}
                className="text-verdePrincipal hover:verdePrincipal transition"
            >
                &#8592; {/* Flecha izquierda */}
            </button>
            <h2 className="text-lg font-medium text-gray-700">
                {currentMode === 'week' ? 'Semana Actual' : 'Día Actual'}
            </h2>
            <div className="flex items-center gap-4">
                <button
                    onClick={toggleModeAction}
                    className="px-2 py-1 bg-verdePrincipal text-white rounded hover:verdePrincipal transition"
                >
                    Cambiar a {currentMode === 'week' ? 'Día' : 'Semana'}
                </button>
                <button
                    onClick={forwardAction}
                    className="text-verdePrincipal hover:verdePrincipal transition"
                >
                    &#8594; {/* Flecha derecha */}
                </button>
            </div>
        </div>
    )
}

export default CalendarPanel