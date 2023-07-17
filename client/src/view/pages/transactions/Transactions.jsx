import TransactionsList from "./TransactionsList";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import AddTransaction from "../../../modules/files/components/AddTransaction/AddTransaction";
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';


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
                        Гаманець
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