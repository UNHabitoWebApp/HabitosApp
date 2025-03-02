import PropTypes from "prop-types";
import { useUserSelectors, useUserActions } from "../../hooks/useUserActions";
import { FiLogOut } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";

const Layout = ({ children }) => {
    const { nombre, isLoggedIn } = useUserSelectors();
    const { logout } = useUserActions();

    return (
        <div className="flex flex-col min-h-screen">
            <header className="bg-verdeLayout text-white p-2 flex justify-between items-center">
                <div className="text-lg font-bold">HabitosWEB</div>
                {isLoggedIn && (
                    <div className="flex items-center gap-4">
                        <FaUserCircle className="w-10 h-10" />
                        <span className="font-medium hidden lg:block">{nombre}</span>
                        <button
                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded flex items-center gap-2"
                            onClick={logout}
                        >
                            <FiLogOut />
                            Salir
                        </button>
                    </div>
                )}
            </header>

            {/* Contenido principal */}
            <main className="flex flex-col items-center justify-center flex-grow p-2 bg-[#F0F7F5]">
                {children}
            </main>

            <footer className="bg-verdeLayout text-white p-2 text-center font-bold">
                Footer
            </footer>
        </div>
    );
};

Layout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Layout;