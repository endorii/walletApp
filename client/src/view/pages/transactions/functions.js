export const formattedDate = (transactionDate) => {
    const date = new Date(transactionDate);
    if (isNaN(date)) {
        return 'Invalid date';
    }
    const options = { day: 'numeric', weekday: 'long', month: 'long', year: 'numeric' };
    const formattedDate = new Intl.DateTimeFormat('uk-UA', options).format(date);
    const capitalizedDate = formattedDate.split(' ').map(word => word[0].toUpperCase() + word.slice(1)).join(' ');
    return capitalizedDate;
}

export const filteredDataOnMonthAndYear = (transactions, date) => {
    if (transactions) {
        const filteredTransactions = transactions.filter(transaction => {
            const transactionDate = new Date(transaction.date);
            const filterDate = new Date(date);
            return transactionDate.getMonth() === filterDate.getMonth() && transactionDate.getFullYear() === filterDate.getFullYear();
        });
        return filteredTransactions;
    } else {
        return [];
    }
}