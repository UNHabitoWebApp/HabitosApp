export const fetchUserHabits = async () => {
    try {
        const accessToken = localStorage.getItem('accessToken');

        const response = await fetch("http://localhost:8080/events/user_habits", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
        });
    
        if (!response.ok) {
            throw new Error(`Error al obtener eventos: ${response.statusText}`);
        }
    
        const data = await response.json();

        return data.items;
    } catch (error) {
        console.error("Error en fetchHabitsRange:", error);
        return null;
    }
  };
  