import { useEffect } from "react";
import { useCurrentDateInfo } from "../../hooks/useDateActions";
import { useHabitsActions } from "../../hooks/useHabitsActions";
import { fetchHabitsRange } from "../../service/fetchHabitsRange";
import { useControlActions, useControlSelectors } from "../../hooks/useControlActions";
import moment from "moment";
import { useUserSelectors } from "../../hooks/useUserActions";

const InitialDataLoader = () => {
    const { startDate, endDate, needFetch, lastStartDate, lastEndDate, search } = useCurrentDateInfo();
    const { addHabits } = useHabitsActions();
    const { loadCharge } = useControlSelectors();
    const { setVariable } = useControlActions();
    const { isLoggedIn } = useUserSelectors();

    useEffect(() => {
        const fetchData = async () => {
            if (startDate && endDate && isLoggedIn) {
                if (needFetch) {
                    if (search === "forward") {
                        const events = await fetchHabitsRange(lastEndDate, endDate);
                        if (events) {
                            addHabits({ events });
                        }
                    } else if (search === "backward") {
                        const events = await fetchHabitsRange(startDate, lastStartDate);
                        if (events) {
                            addHabits({ events });
                        }
                    }
                    else if (search === "regenerate"){
                        const today = moment().format('YYYY-MM-DD')
                        const events = await fetchHabitsRange(today, endDate);
                        if (events) {
                            addHabits({ events });
                        }
                    }
                }
                if (!loadCharge) {
                    const events = await fetchHabitsRange(startDate, endDate);
                    if (events) {
                        setVariable("loadCharge", true);
                        addHabits({ events });
                    }
                }
            }
        };

        fetchData();
    }, [startDate, endDate, needFetch, search, isLoggedIn]);

    return null;
};

export default InitialDataLoader;
