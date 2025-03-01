import { NavLink } from 'react-router-dom';

export default function BackToHomeButton() {
  return (
    <NavLink
      to="/"
      className="mt-5 px-3 py-1 text-white text-sm bg-[#569788] rounded-[20px] transition-all duration-300 hover:bg-[#84A59D]"
    >
      Volver al Inicio
    </NavLink>
  );
}