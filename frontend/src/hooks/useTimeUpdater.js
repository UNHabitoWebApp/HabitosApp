import { useEffect } from 'react';

export const useTimeUpdater = (remainingTime, remainingTimeForNextMinute, updateCurrentTimeAction, resetDateAction) => {
    useEffect(() => {
        // Actualizar la hora cada minuto
        const interval = setInterval(() => {
            updateCurrentTimeAction(); // Usar la acción del hook
        }, remainingTimeForNextMinute); // Cada minuto

        // Establecer un timeout para realizar la actualización al final del día
        const timeout = setTimeout(() => {
            resetDateAction(); // Usar la acción del hook
        }, remainingTime); // Timeout con el tiempo restante hasta medianoche

        // Limpiar los intervalos y timeouts al desmontar el componente
        return () => {
            clearInterval(interval);
            clearTimeout(timeout);
        };
    }, [remainingTime, remainingTimeForNextMinute, updateCurrentTimeAction, resetDateAction]);
};