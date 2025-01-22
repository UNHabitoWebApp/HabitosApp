import classNames from "classnames";

export const generateDayClasses = (id) => {
    return classNames(
        "flex-grow border-r-2 border-t-2 border-[#F2F4F7] last:border-r-0 flex flex-col items-center w-[14.28%] min-w-[14.28%]",
        {
            "border-l-2": id === 0, 
            "border-r-2": id === 6,
        }
    );
};
