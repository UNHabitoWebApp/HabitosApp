import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home'
import About from '../pages/About';
//import AddHabbit from '../pages/AddHabbit'
import CreateHabbit from '../pages/CreateHabbit';
import NotFound from '../pages/NotFound';
import Habits from '../pages/Habits';
import ExerciseRoutine from '../components/FillHabit/ListRoutine';
import ExerciseForm from '../components/HabitLog/HabitLog';
import PersonalizeLog from '../components/HabitLog/HabitLogPersonalize';
import HabitSelectorEdit from '../components/HabitEdit/HabbitSelectorEdit';
const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path='/habits' element={<Habits />}></Route>
            <Route path="/add/" element={<CreateHabbit />} />
            <Route path='/routine_exercises_list/:id' element={<ExerciseRoutine />}></Route>
            <Route path='/routine_exercise/:routine_id/:exercise_id' element={<ExerciseForm />}></Route>
            <Route path='/personalize_habit/:id' element={<PersonalizeLog />}></Route>
            <Route path='/edit/routine/:id' element={<HabitSelectorEdit />}></Route>
            {/* Ruta comodín para 404 */}
            <Route path="*" element={<NotFound />} />
        </Routes >
    );
};

export default AppRoutes;