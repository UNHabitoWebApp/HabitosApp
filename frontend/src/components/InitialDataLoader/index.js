import { useEffect } from "react";
import { useCurrentDateInfo, useDateActions } from "../../hooks/useDateActions";
import { useHabitsActions } from "../../hooks/useHabitsActions";
import { fetchHabitsRange } from "../../service/fetchHabitsRange";
import { useControlActions, useControlSelectors } from "../../hooks/useControlActions";

const InitialDataLoader = () => {
    const { startDate, endDate, needFetch } = useCurrentDateInfo();
    const { solicitarFetch } = useDateActions();
    const { addHabits } = useHabitsActions();
    const { loadCharge } = useControlSelectors();
    const { setVariable } = useControlActions();

    useEffect(() => {
        const fetchData = async () => {
            console.log(startDate, endDate, loadCharge)
            if (startDate && endDate && (!loadCharge || needFetch)) {
                const events = await fetchHabitsRange(startDate, endDate);
                if (events) {
                    setVariable("loadCharge", true);
                    addHabits({ events });
                }
            }
        };
        fetchData();
    }, [startDate, endDate, needFetch]); 

    return null;
};

export default InitialDataLoader;
