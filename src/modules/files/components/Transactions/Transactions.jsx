import TransactionsList from "../TransactionsList/TransactionsList";
import EditTransaction from "../EditTransaction/EditTransaction";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";


const Transactions = () => {
    const {transactions} = useSelector(state => state.transactions);
    const date = useSelector(state => state.date)

    const filteredDataOnDate = () => {
        if (transactions) {
            const filteredTransactions = transactions.filter(transaction => transaction.date === date);
            return filteredTransactions;
        } else {
            return [];
        }
    }

    return(
        <Box sx={{ml: 15, mt: 15}}>
            
            <TransactionsList transactions={filteredDataOnDate()}/>
            {/* <EditTransaction /> */}
        </Box>
    )
}

export default Transactions;