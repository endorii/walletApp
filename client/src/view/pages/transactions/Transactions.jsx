import TransactionsList from "./TransactionsList";
import { useSelector, useDispatch } from "react-redux";
import { Box, AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import AddTransaction from "../../../modules/files/components/AddTransaction/AddTransaction";
import { useEffect } from "react";
import { fetchTransactions } from "../../../store/reducers/transactionsSlice";

const Transactions = () => {

    const {transactions} = useSelector(state => state.transactions);
    const dispatch = useDispatch();
    const {email} = useSelector(state => state.user.user)

    useEffect(()=> {
        dispatch(fetchTransactions())
    }, [])

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
        <Box>
        <Box>
            <AppBar 
                position="fixed">
                <Toolbar sx={{p: 0, flexGrow: 1}}>

                    <IconButton
                        size="large"
                        color="inherit"
                        aria-label="menu"
                        sx={{m: 0, p: 0.5}}
                        >
                            
                        <MenuIcon />
                    </IconButton>
                    
                    <Typography
                        sx={{ ml: 7, flexGrow: 1}}>
                        {email}
                    </Typography>
                    
                    <AddTransaction />
                    
                </Toolbar>
            </AppBar>
        </Box>
        <Box sx={{ml: 15, mt: 15}}>
            <TransactionsList transactions={filteredDataOnDate()}/>
        </Box>
        </Box>
    )
}

export default Transactions;