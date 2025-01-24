export const formatDayName = (day) => {
    const dayMap = {
        Monday: "Lunes",
        Tuesday: "Martes",
        Wednesday: "Miércoles",
        Thursday: "Jueves",
        Friday: "Viernes",
        Saturday: "Sábado",
        Sunday: "Domingo",
    };
    return dayMap[day] || day;
};

const monthMap = {
    January: '01',
    February: '02',
    March: '03',
    April: '04',
    May: '05',
    June: '06',
    July: '07',
    August: '08',
    September: '09',
    October: '10',
    November: '11',
    December: '12',
};

export const momentToObject = (moment) => {
    return {
        day: moment.format("dddd"),
        date: moment.format("DD"),
        month: moment.format("MMMM"),
        monthNumber: monthMap[moment.format("MMMM")],
        year: moment.format("YYYY"),
    };
}

export const areEqualDates = (date1, date2) => {
    return date1.date === date2.date && date1.month === date2.month && date1.year === date2.year;
}