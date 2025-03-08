export const fetchHabitsRange = async (startDate, endDate, userId="67c9b71329f00cd857d61949") => {
    try {
        const accessToken = localStorage.getItem('accessToken');

        const response = await fetch("http://localhost:8080/events/generate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({ startDate, endDate, userId }),
        });
    
        if (!response.ok) {
            throw new Error(`Error al obtener eventos: ${response.statusText}`);
        }
    
        const data = await response.json();

        return data.events;
    } catch (error) {
        console.error("Error en fetchHabitsRange:", error);
        return null;
    }
  };
  