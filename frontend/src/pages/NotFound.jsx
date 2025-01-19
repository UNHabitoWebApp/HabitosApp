// 404Page.jsx
import { NavLink } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
            <h1 className="text-6xl font-bold text-red-500">404</h1>
            <h2 className="text-3xl text-gray-700 mb-4">Página no encontrada</h2>
            <p className="text-lg text-gray-600">
                Lo sentimos, la página que buscas no existe. Vuelve a la{" "}
                <NavLink to="/" className="text-blue-500 hover:text-blue-600">
                    página principal
                </NavLink>.
            </p>
        </div>
    );
};

export default NotFound;
