export const fetchHabitsRange = async (startDate, endDate) => {
    try {
        const accessToken = localStorage.getItem('accessToken');

        const response = await fetch("http://localhost:8080/events/generate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({ startDate, endDate }),
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
  