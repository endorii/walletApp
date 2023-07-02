import React from 'react';

const ExpenseList = ({ transactions }) => {
    
    if (!transactions || transactions.length === 0) {
        return <p>Немає доступних транзакцій.</p>;
    }

    return (
        <div>
        <h2>Витрати</h2>
        <ul>
            { transactions.map((transaction) => (
                <li key={transaction.id}>
                    <p>Назва: {transaction.name}</p>
                    <p>Сума: {transaction.value}</p>
                    <p>Категорія: {transaction.category}</p>
                    <p>Дата: {transaction.date}</p>
                </li>
            ))}
        </ul>
        </div>
    );
};




export default ExpenseList;
