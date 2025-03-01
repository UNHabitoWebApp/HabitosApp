import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home'
import About from '../pages/About';
import AddHabbit from '../pages/AddHabbit'
import NotFound from '../pages/NotFound';
import Habits from '../pages/Habits';
import StatisticsScreen from '../pages/statistics';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path='/habits' element={<Habits />}></Route>
            <Route path="/add" element={<AddHabbit />} />

            <Route path="/statistics" element={<StatisticsScreen/>} />
            {/* Ruta comodín para 404 */}
            <Route path="*" element={<NotFound />} />
        </Routes >
    );
};

export default AppRoutes;