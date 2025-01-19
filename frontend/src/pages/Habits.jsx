import React from 'react';
import HabitList from '../components/HabitList';
import { NavLink } from 'react-router-dom';

const Habits = () => {
    return (
        <div className="p-6 bg-gray-100 min-h-screen space-y-6">
            {/* Lista de hábitos */}
            <HabitList />

            {/* Botón para volver a la página principal */}
            <NavLink
                to="/"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out block text-center mt-6"
            >
                Volver a la Home
            </NavLink>
        </div>
    );
};

export default Habits;
