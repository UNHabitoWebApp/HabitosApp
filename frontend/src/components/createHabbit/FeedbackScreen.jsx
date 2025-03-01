import PropTypes from "prop-types";
import saved from "../../assets/icons/saved.svg";


const FeedbackScreen = ({ title, description }) => {
  return (
    <div className="mt-7 p-2 bg-[#ADD9C5] border-2 border-[#5F936C] rounded-[20px] w-full max-w-md">
      <div className="flex flex-col items-center justify-center flex-grow text-center">
        <h2 className="text-black text-[15px] text-center">{title}</h2>
        <img src={saved} alt="Feedback" className="w-1/2 max-w-xs mb-4" />
        <p className="text-black text-[15px] text-center">{description}</p>
      </div>
    </div>
  );
};

FeedbackScreen.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};


export default FeedbackScreen;
