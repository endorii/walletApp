const currentDate = new Date();
const currentYear = currentDate.getFullYear();
const currentMonth = currentDate.getMonth();

export const dateOptions = [
    {
        label: 'Цього місяця',
        startDate: new Date(currentYear, currentMonth, 1),
        endDate: new Date(currentYear, currentMonth + 1, 0)
    },
    {
        label: 'Минулого місяця',
        startDate: new Date(currentYear, currentMonth - 1, 1),
        endDate: new Date(currentYear, currentMonth, 0)
    },
    {
        label: 'Останні 3 місяці',
        startDate: new Date(currentYear, currentMonth - 2, 1),
        endDate: new Date(currentYear, currentMonth + 1, 0)
    },
    {
        label: 'Останні 6 місяців',
        startDate: new Date(currentYear, currentMonth - 5, 1),
        endDate: new Date(currentYear, currentMonth + 1, 0)
    },
    {
        label: 'Цього року',
        startDate: new Date(currentYear, 0, 1),
        endDate: new Date(currentYear + 1, 0, 0)
    },
    {
        label: 'Минулого року',
        startDate: new Date(currentYear - 1, 0, 1),
        endDate: new Date(currentYear, 0, 0)
    }
];