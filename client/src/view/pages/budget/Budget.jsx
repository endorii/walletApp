import { Box, AppBar, Toolbar, ListItemText, ListItem } from "@mui/material";
import BudgetInfo from "./ButgetInfo";
import AddCategory from "../../../modules/files/components/AddCategory/AddCategory";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../../store/reducers/categoriesSlice";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Budget = () => {

    const {email} = useSelector(state => state.user.user)

    const dispatch = useDispatch();

    useEffect(()=> {
        dispatch(fetchCategories())
    }, [])

    return(
        <Box >
            <Box>
                <AppBar sx={{zIndex: 1000}}
                    position="fixed">

                    <Toolbar sx={{
                        p: 0, 
                        flexGrow: 1}}>
                        
                        <ListItem sx={{ ml: 12, flexGrow: 1}}>
                                <AccountCircleIcon sx={{ height: '30px', width: '30px' }}/>
                                <ListItemText sx={{ml: 1}}
                            primary={email}/>
                        </ListItem>
                        
                        <AddCategory />
                        
                    </Toolbar>
                </AppBar>
            </Box>
            <Box sx={{
                ml: 15, 
                mt: 15}}>
                    
                <BudgetInfo/>
            </Box>
        </Box>
    )
}

export default Budget;