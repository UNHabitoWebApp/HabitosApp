import { useAppSelector } from "../hooks/store";

const HabitList = () => {
    const habits = useAppSelector((state) => state.habits);

    return (
        <div className="mt-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Lista de Hábitos</h1>
            {habits.length === 0 ? (
                <p className="text-gray-500">No hay hábitos aún. Agrega uno para empezar.</p>
            ) : (
                <ul className="space-y-4">
                    {habits.map((habit) => (
                        <li
                            key={habit.id}
                            className="flex items-center justify-between bg-white shadow-md rounded-lg p-4 hover:bg-gray-100 transition"
                        >
                            <div>
                                <p className="text-lg font-medium text-gray-900">{habit.name}</p>
                                {habit.description && (
                                    <p className="text-sm text-gray-600">{habit.description}</p>
                                )}
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default HabitList;
