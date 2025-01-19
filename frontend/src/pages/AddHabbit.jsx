import { useState } from 'react';
import { useHabitsActions } from "../hooks/useHabitsActions";
import { NavLink } from 'react-router-dom';

const AddHabit = () => {
    const { addDefaultHabbit, addNewHabit } = useHabitsActions();

    // Estado local para el valor del nombre del hábito
    const [habitName, setHabitName] = useState('');

    // Función para manejar el envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault();
        if (habitName.trim() !== '') {
            addNewHabit({ name: habitName });
            setHabitName(''); // Limpiar el input después de agregar el hábito
        }
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen space-y-6">
            {/* Formulario para agregar un hábito */}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <input
                        type="text"
                        value={habitName}
                        onChange={(e) => setHabitName(e.target.value)}
                        className="w-full p-3 mb-4 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
                        placeholder="Nombre del hábito"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
                >
                    Agregar Hábito
                </button>
            </form>

            {/* Botón para agregar un hábito por defecto */}
            <button
                onClick={addDefaultHabbit}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
            >
                Agregar Hábito Default
            </button>

            {/* Enlace a la lista de hábitos creados */}
            <NavLink
                to="/"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out block text-center"
            >
                Volver al Inicio
            </NavLink>
        </div>
    );
};

export default AddHabit;
