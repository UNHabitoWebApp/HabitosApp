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

const monthNameMap = {
    Jan: 'Ene',
    Feb: 'Feb',
    Mar: 'Mar',
    Apr: 'Abr',
    May: 'May',
    Jun: 'Jun',
    Jul: 'Jul',
    Aug: 'Ago',
    Sep: 'Sep',
    Oct: 'Oct',
    Nov: 'Nov',
    Dec: 'Dic',
}

const monthNameFullMap = {
    January: 'enero',
    February: 'febrero',
    March: 'marzo',
    April: 'abril',
    May: 'mayo',
    June: 'junio',
    July: 'julio',
    August: 'agosto',
    September: 'septiembre',
    October: 'octubre',
    November: 'noviembre',
    December: 'diciembre',
}

const dayNameFullMap = {
    Monday: 'lunes',
    Tuesday: 'martes',
    Wednesday: 'miércoles',
    Thursday: 'jueves',
    Friday: 'viernes',
    Saturday: 'sábado',
    Sunday: 'domingo',
}

const meses = {
    enero: "01",
    febrero: "02",
    marzo: "03",
    abril: "04",
    mayo: "05",
    junio: "06",
    julio: "07",
    agosto: "08",
    septiembre: "09",
    octubre: "10",
    noviembre: "11",
    diciembre: "12",
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

export const getMonthName = (month) => {
    return monthNameMap[month] || monthNameFullMap[month] || month;
}

export const getDayName = (day) => {
    return dayNameFullMap[day] || day;
}

export const formatSmallDate = (date) => {
    return date.replace(/(\d{2}) de (\w+) de (\d{4})/, (_, d, m, y) => {
        return `${d}/${meses[m]}/${y.slice(-2)}`;}
    )
}