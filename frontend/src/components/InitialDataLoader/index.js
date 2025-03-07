import { useEffect } from "react";
import { useCurrentDateInfo } from "../../hooks/useDateActions";
import { useHabitsActions } from "../../hooks/useHabitsActions";
import { fetchHabitsRange } from "../../service/fetchHabitsRange";

const InitialDataLoader = () => {
    const { startDate, endDate } = useCurrentDateInfo();
    const { addHabits } = useHabitsActions();

    console.log("startDate", startDate);
    console.log("endDate", endDate);

    useEffect(() => {
        const fetchData = async () => {
            if (startDate && endDate) {
                const events = await fetchHabitsRange(startDate, endDate);
                if (events) {

                    addHabits({ events });
                }
            }
        };

        fetchData();
    }, [addHabits]); 

    return null;
};

export default InitialDataLoader;
