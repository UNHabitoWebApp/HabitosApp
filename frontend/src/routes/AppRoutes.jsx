import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home'
import About from '../pages/About';
import AddHabbit from '../pages/AddHabbit'
import NotFound from '../pages/NotFound';
import Habits from '../pages/Habits';
import Login from '../pages/Login';
import Register from '../pages/Registro';
import ConfirmacionRegistro from '../pages/ConfirmacionRegistro';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path='/habits' element={<Habits />}></Route>
            <Route path="/add" element={<AddHabbit />} />
            {/* Ruta comodín para 404 */}
            <Route path="*" element={<NotFound />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register/>} />
            <Route path="/confirmacion" element={<ConfirmacionRegistro/>} />
        </Routes >
    );
};

export default AppRoutes;