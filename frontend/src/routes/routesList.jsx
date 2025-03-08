import Home from "../pages/Home";
import About from "../pages/About";
import CreateHabbit from "../pages/CreateHabbit";
import NotFound from "../pages/NotFound";
import Habits from "../pages/Habits";
import ExerciseRoutine from "../components/FillHabit/ListRoutine";
import ExerciseForm from "../components/HabitLog/HabitLog";
import PersonalizeLog from "../components/HabitLog/HabitLogPersonalize";
import HabitSelectorEdit from "../components/HabitEdit/HabbitSelectorEdit";
import Login from "../pages/Login";
import Register from "../pages/Registro";
import ConfirmacionRegistro from "../pages/ConfirmacionRegistro";
import StatisticsScreen from "../pages/statistics";

export const routesList = [
    { path: "/", element: <Home /> },
    { path: "/about", element: <About /> },
    { path: "/habits", element: <Habits /> },
    { path: "/add", element: <CreateHabbit /> },
    { path: "/routine_exercises_list/:id", element: <ExerciseRoutine /> },
    { path: "/routine_exercise/:routine_id/:exercise_id", element: <ExerciseForm /> },
    { path: "/personalize_habit/:id", element: <PersonalizeLog /> },
    { path: "/edit/routine/:id", element: <HabitSelectorEdit /> },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
    { path: "/confirmacion", element: <ConfirmacionRegistro /> },
    { path: "/statistics", element: <StatisticsScreen /> },
    { path: "*", element: <NotFound /> },
];
