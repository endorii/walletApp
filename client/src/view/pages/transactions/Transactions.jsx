import TransactionsList from "./TransactionsList";
import { useSelector, useDispatch } from "react-redux";
import { Box, AppBar, Toolbar, ListItemText, ListItem } from "@mui/material";
import AddTransaction from "../../../modules/files/components/AddTransaction/AddTransaction";
import { useEffect } from "react";
import { fetchTransactions } from "../../../store/reducers/transactionsSlice";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { TransactionsAppBarStyles, TransactionsListItemIconStyles, TransactionsListItemStyles, TransactionsToolbarStyles } from "./styles";

const Transactions = () => {

    const dispatch = useDispatch();
    const {email} = useSelector(state => state.user.user)

    useEffect(()=> {
        dispatch(fetchTransactions());
    }, [])

    return(
        <Box>
            <Box>
                <AppBar 
                sx={TransactionsAppBarStyles}
                    position="fixed"
                    >
                    <Toolbar sx={TransactionsToolbarStyles}>

                        <ListItem sx={TransactionsListItemStyles}>
                                <AccountCircleIcon sx={TransactionsListItemIconStyles}/>
                                <ListItemText ml={1}
                            primary={email}/>
                        </ListItem>
                        
                        
                        <AddTransaction />
                        
                    </Toolbar>
                </AppBar>
            </Box>
            <Box ml={15} mt={15}>
                <TransactionsList />
            </Box>
        </Box>
    )
}

export default Transactions;