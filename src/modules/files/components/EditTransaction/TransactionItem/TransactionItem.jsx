import { useState } from "react";

import { useDispatch } from "react-redux";
import { fetchTransactions } from "../../../../../store/reducers/transactionsSlice";

const TransactionItem = ({transaction}) => {

    const [transactionName, setTransactionName] = useState(transaction.name);
    const [transactionValue, setTransactionValue] = useState(transaction.value);
    const [transactionCategory, setTransactionCategory] = useState(transaction.category);
    const [transactionDate, setTransactionDate] = useState(transaction.date);

    const dispatch = useDispatch();
  
    const editTransaction = async (transactionID) => {
        try {
            const obj = {
                "id": `${transactionID}`,
                "name": `${transactionName}`,
                "value": `${transactionValue}`,
                "category": `${transactionCategory}`,
                "date": `${transactionDate}`
            }
    
            await fetch(`http://localhost:3001/transactions/${transactionID}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(obj),
            });
    
            dispatch(fetchTransactions());
        } catch (error) {
            console.error('Помилка при виконанні PUT-запиту:', error);
        }
    };

    const deleteTransaction = async (transactionID) => {
        try{
            const obj = {
                "id": `${transactionID}`,
                "name": `${transactionName}`,
                "value": `${transactionValue}`,
                "category": `${transactionCategory}`,
                "date": `${transactionDate}`
            };

            await fetch(`http://localhost:3001/transactions/${transactionID}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(obj),
            });
    
            dispatch(fetchTransactions());

        } catch (error) {
            console.error('Помилка при виконанні DELETE-запиту:', error);
        }
    }

    return (
        <div className="transaction" key={transaction.id}>
            <div className="transaction_change-list">
                <input
                    type="text"
                    value={transactionName}
                    onChange={(e) => {
                        setTransactionName(e.target.value)
                    }}
                />

                <input
                    type="number"
                    value={transactionValue}
                    onChange={(e) => {
                        setTransactionValue(e.target.value)
                    }}
                />

                <input
                    type="text"
                    value={transactionCategory}
                    onChange={(e) => {
                        setTransactionCategory(e.target.value)
                    }}
                />

                <input
                    type="date"
                    value={transactionDate}
                    onChange={(e) => {
                        setTransactionDate(e.target.value)
                    }}
                />
                
            </div>

            <button
                type="submit"
                onClick={(e) => {
                    e.preventDefault();
                    editTransaction(transaction.id);
                }}>Редагувати</button>

            <button
                type="button"
                onClick={(e) => {
                    e.preventDefault();
                    deleteTransaction(transaction.id);
            }}>del</button>
            
            
        </div>
    )
};

export default TransactionItem;