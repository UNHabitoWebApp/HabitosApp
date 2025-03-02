// 404Page.jsx
import { NavLink } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] bg-gray-100 text-center">
            <h1 className="text-6xl font-bold text-verdePrincipal">404</h1>
            <h2 className="text-3xl text-gray-700 mb-4">Página no encontrada</h2>
            <p className="text-lg text-gray-600">
                Lo sentimos, la página que buscas no existe. Vuelve a la{" "}
                <NavLink to="/" className="text-verdeLayout hover:text-verdePrincipal">
                    página principal
                </NavLink>.
            </p>
        </div>
    );
};

export default NotFound;
