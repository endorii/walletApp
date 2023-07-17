import { Box, Button } from "@mui/material";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchTransactions } from "../../../store/reducers/transactionsSlice";

const DeleteTransactionsListItem = ({activeTransaction, activePaper, setActivePaper}) => {

    const [transactionName, setTransactionName] = useState(activeTransaction.name);
    const [transactionValue, setTransactionValue] = useState(activeTransaction.value);
    const [transactionCategory, setTransactionCategory] = useState(activeTransaction.category);
    const [transactionDate, setTransactionDate] = useState(activeTransaction.date);
    const [transactionID, setTransactionID] = useState(activeTransaction.id)

    const dispatch = useDispatch();

    useEffect(() => {
        setTransactionName(activeTransaction.name);
        setTransactionValue(activeTransaction.value);
        setTransactionCategory(activeTransaction.category);
        setTransactionDate(activeTransaction.date);
        setTransactionID(activeTransaction.id);
    }, [activeTransaction]);

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
        <Box>
            <Button variant='outlined' color='error' onClick={() => {deleteTransaction(transactionID); setActivePaper(!activePaper)}} >Видалити</Button>
        </Box>
    )
}

export default DeleteTransactionsListItem;