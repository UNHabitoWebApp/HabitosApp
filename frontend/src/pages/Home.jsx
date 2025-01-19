import { NavLink } from 'react-router-dom';

const Home = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
            {/* Título Principal */}
            <h1 className="text-4xl font-bold text-blue-600 mb-6">
                Bienvenido a la aplicación de hábitos
            </h1>

            {/* Descripción */}
            <p className="text-xl text-gray-700 mb-8 text-center">
                Gestiona y realiza un seguimiento de tus hábitos de manera fácil y eficiente. Empieza ahora mismo y mantén el control de tu progreso.
            </p>

            {/* Botón de Acción con NavLink */}
            <div className="space-x-4">
                <NavLink
                    to="/habits"
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out"
                >
                    Ver Hábitos
                </NavLink>
                <NavLink
                    to="/add"
                    className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out"
                >
                    Agregar Hábito
                </NavLink>
            </div>
        </div>
    );
}

export default Home;
