import TransactionsList from "./TransactionsList";
import { useSelector, useDispatch } from "react-redux";
import { Box, AppBar, Toolbar, ListItemText, ListItem } from "@mui/material";
import AddTransaction from "../../../modules/files/components/AddTransaction/AddTransaction";
import { useEffect } from "react";
import { fetchTransactions } from "../../../store/reducers/transactionsSlice";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

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
                sx={{zIndex: 1000}}
                    position="fixed"
                    >
                    <Toolbar sx={{p: 0, flexGrow: 1}}>

                        <ListItem sx={{ ml: 12, flexGrow: 1}}>
                                <AccountCircleIcon sx={{ height: '30px', width: '30px' }}/>
                                <ListItemText sx={{ml: 1}}
                            primary={email}/>
                        </ListItem>
                        
                        
                        <AddTransaction />
                        
                    </Toolbar>
                </AppBar>
            </Box>
            <Box sx={{ml: 15, mt: 15}}>
                <TransactionsList />
            </Box>
        </Box>
    )
}

export default Transactions;