import { Routes, Route } from "react-router-dom";
import { routesList } from "./routesList";
import LoggedWrapper from "../components/LoggedWrapper";

const AppRoutes = () => {
    return (
        <Routes>
            {routesList.map(({ path, element }) => (
                <Route key={path} path={path} element={
                    <LoggedWrapper path={path} element={element}
                    />
                } />
            ))}
        </Routes>
    );
};

export default AppRoutes;