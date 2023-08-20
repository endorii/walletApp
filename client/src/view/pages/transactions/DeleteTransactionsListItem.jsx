import { Box, Button } from "@mui/material";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchTransactions } from "../../../store/reducers/transactionsSlice";
import { deleteTransactionsItem } from "../../../modules/files/actions/transaction";

const DeleteTransactionsListItem = ({activeTransaction, activePaper, setActivePaper}) => {

    const [transactionID, setTransactionID] = useState(activeTransaction._id)
    const dispatch = useDispatch();

    const deleteTransaction = async (transactionID) => {
        try{
            await deleteTransactionsItem(transactionID);

            dispatch(fetchTransactions());

        } catch (error) {
            console.error('Помилка при виконанні DELETE-запиту:', error);
        }
    }

    useEffect(() => {
        setTransactionID(activeTransaction._id);
    }, [activeTransaction]);

    return (
        <Box>
            <Button variant='outlined' color='error' onClick={() => {deleteTransaction(transactionID); setActivePaper(!activePaper)}} >Видалити</Button>
        </Box>
    )
}

export default DeleteTransactionsListItem;