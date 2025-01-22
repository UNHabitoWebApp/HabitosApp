import classNames from "classnames";

export const generateDaysLayoytClasses = (id) => {
    return classNames(
        "flex-grow flex flex-col items-center justify-center w-[14.28%] min-w-[14.28%] border-t-2 border-r-2 border-b-2 text-center font-semibold py-4",
        {
            "border-l-2": id == 0
        }
    );
};


export const generateDayNumberClasses = (isToday) => {
    return classNames(
        "text-xs",
        {
            "flex items-center justify-center w-7 h-7 bg-verdePrincipal text-white rounded-full": isToday
        }
    );
}

export const generateDayNameClasses = (isToday) => {
    return classNames(
        "text-sm",
        {
            "text-verdePrincipal": isToday
        }
    );
}

export const generateDayFragmentContainerClasses = (first, last, unique) => {
    return classNames(
        "relative w-full h-[1440px] border-r-2",
        {
            "border-l-2": first | unique,
            "border-r-2": last | unique,
        }
    );
}