import { Box, AppBar, Toolbar, ListItemText, ListItem } from "@mui/material";
import BudgetInfo from "./BudgetInfo";
import AddCategory from "../../../modules/files/components/AddCategory/AddCategory";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../../store/reducers/categoriesSlice";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import { BudgetAppBarStyles, BudgetToolbarStyles, BudgetAccountStyles, BudgetAccountIconStyles, BudgetAccountTextStyles, BudgetWrapperStyles } from "./styles";
import { fetchTransactions } from "../../../store/reducers/transactionsSlice";

const Budget = () => {

    const {email} = useSelector(state => state.user.user)

    const dispatch = useDispatch();

    useEffect(()=> {
        dispatch(fetchCategories())
        dispatch(fetchTransactions())
    }, [])

    return(
        <Box>
            <Box>
                <AppBar sx={BudgetAppBarStyles}
                    position="fixed">

                    <Toolbar sx={BudgetToolbarStyles}>
                        
                        <ListItem sx={BudgetAccountStyles}>
                                <AccountCircleIcon sx={BudgetAccountIconStyles}/>
                                <ListItemText sx={BudgetAccountTextStyles}
                            primary={email}/>
                        </ListItem>
                        
                        <AddCategory />
                        
                    </Toolbar>
                </AppBar>
            </Box>
            <Box sx={BudgetWrapperStyles}>
                    
                <BudgetInfo/>
            </Box>
        </Box>
    )
}

export default Budget;