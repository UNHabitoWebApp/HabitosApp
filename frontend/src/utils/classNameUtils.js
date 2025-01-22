import classNames from "classnames";

export const generateDayClasses = (id) => {
    return classNames(
        "flex-grow flex flex-col items-center w-[14.28%] min-w-[14.28%]",
        {
            "border-l-2": id == 0
        }
    );
};

