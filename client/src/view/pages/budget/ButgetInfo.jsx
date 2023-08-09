import { Typography, Box, Paper, Divider, Button, ListItem, ListItemText, ListItemAvatar, Avatar, IconButton } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import ImageIcon from '@mui/icons-material/Image';
import CloseIcon from '@mui/icons-material/Close';
import EditCategoryListItemModal from "./EditCategoryListItemModal";
import DeleteCategoryListItem from "./DeleteCategoryListItem";
import { fetchBudget } from "../../../store/reducers/budgetSlice";
import { fetchCategories } from "../../../store/reducers/categoriesSlice";
import Loader from "../../../modules/files/components/Loader/Loader";

const BudgetInfo = () => {

    const dispatch = useDispatch();
    const {categories} = useSelector(state => state.categories);
    const {isLoading} = useSelector(state => state.categories)
    const {budget} = useSelector(state => state.budget)
    const [openCategoryList, setOpenCategoryList] = useState(true);

    useEffect(() => {
        dispatch(fetchCategories());
        dispatch(fetchBudget());
    }, [fetchBudget])

    return (
        <Box
            sx={{
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                flexDirection: 'column'}}>

            <Paper 
                elevation={4}
                sx={{
                    p: 7,
                    pt: 3,
                    width: "45%"
            }}>

                <Typography 
                    sx={{
                        fontSize: '24px',
                        textAlign: 'center',
                        fontWeight: 400,
                        mb: 1

                    }}>Загальний стан бюджету</Typography>

                <Divider 
                    variant="middle" 
                    component="hr" />

                <Typography 
                    sx={{
                        mt: 3,
                        display: 'flex',
                        justifyContent: 'start',
                        alignItems: 'center',
                        fontSize: '24px',
                        textAlign: 'center',
                        fontWeight: 300,
                        mb: 3

                    }}>Загалом: {budget}
                </Typography>

                <Divider 
                    variant="middle" 
                    component="hr" />

                <Box 
                    sx={{
                        display: 'flex', 
                        justifyContent: 'center', 
                        mt: 3}}>

                    <Button 
                        sx={{ width: '60%'}} 
                        color='success' 
                        variant="outlined"
                        onClick={() => setOpenCategoryList(!openCategoryList)}

                    >Список категорій</Button>
                </Box>
            
            </Paper>
            {openCategoryList ? 
            
            <Paper 
                elevation={4} 
                sx={{
                    position: 'relative',  
                    p: 7,
                    pt: 3,
                    width: "45%",
                    mt: '1%'}}>

                { isLoading ? <Loader/> : 
                !categories || categories.length === 0 ? 

                <Typography 
                    sx={{
                        textAlign: 'center', 
                        fontSize: '40px', 
                        fontWeight: '300', 
                        mt: 3}}>

                Немає доступних категорій😢
                </Typography> : 

                <Box>
                    <Typography 
                        variant="h5" 
                        sx={{textAlign: 'center'}}>
                        
                        Список категорій</Typography>

                    <Box>
                        {categories.map((category) => (
                        <Box key={category._id}
                            
                        >
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar>
                                        <ImageIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText 
                                    primary={category.label} 
                                    secondary={category.limit} />

                                <Box 
                                    sx={{
                                        display: 'flex', 
                                        justifyContent: 'center', 
                                        gap: '10px'}}>

                                    <EditCategoryListItemModal activeCategory={category}/>

                                    <DeleteCategoryListItem activeCategory={category}/>
                                </Box>
                            </ListItem>
                            <Divider 
                                variant="middle" 
                                component="hr" />
                        </Box>
                        ))}
                    </Box>
                </Box>
                }
                <IconButton
                    size="large"
                    color="inherit"
                    aria-label="menu"
                    sx={{
                        position: 'absolute', 
                        top: 0, 
                        left: 0}}
                    onClick={() => {setOpenCategoryList(false)}}>
                        
                    <CloseIcon color="primary" />
                </IconButton>
            </Paper>
            
            : null}
        </Box>
    )
}

export default BudgetInfo;