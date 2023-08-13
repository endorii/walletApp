import TransactionsList from "./TransactionsList";
import { useSelector, useDispatch } from "react-redux";
import { Box, AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import AddTransaction from "../../../modules/files/components/AddTransaction/AddTransaction";
import { useEffect } from "react";
import { fetchTransactions } from "../../../store/reducers/transactionsSlice";

const Transactions = () => {

    const dispatch = useDispatch();
    const {email} = useSelector(state => state.user.user)

    useEffect(()=> {
        dispatch(fetchTransactions())
    }, [])

    return(
        <Box>
            <Box>
                <AppBar 
                sx={{zIndex: 1000}}
                    position="fixed"
                    >
                    <Toolbar sx={{p: 0, flexGrow: 1}}>
                        
                        <Typography
                            sx={{ ml: 12, flexGrow: 1}}>
                            {email}
                        </Typography>
                        
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