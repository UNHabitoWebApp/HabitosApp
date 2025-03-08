import { useLocation } from "react-router-dom";
import BackToHomeButton from "../components/createHabbit/BackToHomeButton";
import saved from "../assets/icons/saved.svg"; // Asegúrate de importar la imagen correcta

export default function FeedbackScreen() {
  const location = useLocation();
  const { title, description } = location.state || {};

  return (
    <div className="flex flex-col items-center min-h-[80vh]">
      <div className="mt-7 p-2 bg-[#ADD9C5] border-2 border-[#5F936C] rounded-[20px] w-full max-w-md">
        <div className="flex flex-col items-center justify-center flex-grow text-center">
          <h2 className="text-black text-[15px] text-center">{title}</h2>
          <img src={saved} alt="Feedback" className="w-1/2 max-w-xs mb-4" />
          <p className="text-black text-[15px] text-center">{description}</p>
        </div>
      </div>
      <BackToHomeButton />
    </div>
  );
}