import { Typography, Box, Paper, Divider, Button, ListItem, ListItemText, ListItemAvatar, Avatar, IconButton } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState, useRef } from "react";
import CloseIcon from '@mui/icons-material/Close';
import EditCategoryListItemModal from "./EditCategoryListItemModal";
import DeleteCategoryListItem from "./DeleteCategoryListItem";
import { fetchCategories } from "../../../store/reducers/categoriesSlice";
import Loader from "../../../modules/files/components/Loader/Loader";
import Transition from "react-transition-group/Transition";
import LinearProgressBar from "./LinearProgressBar";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import RemoveIcon from '@mui/icons-material/Remove';
import { BudgetInfoWrapperStyles, BudgetInfoPaperStyles, BudgetInfoTotalTextStyles, BudgetInfoTotalValueStyles, CategoriesListButtonWrapperStyles, CategoriesListButtonStyles, CategoriesListPaperStyles, CategoriesListTextStyles, CategoryAvatarSuccessStyles, CategoryAvatarErrorStyles, CategoryListItemTextStyles, CategoryButtonsWrapperStyles, basicCategoryAvatarStyles, basicCategoryIconStyles, basicCategoryListItemTextStyles, CategoriesListCloseButtonStyles, defaultStyle, transitionStyles } from "./styles";

const BudgetInfo = () => {
    const nodeRef = useRef(null)
    const dispatch = useDispatch();

    const {categories} = useSelector(state => state.categories);
    const {basicCategories} = useSelector(state => state.categories);
    const {isLoading} = useSelector(state => state.categories)
    const {budget} = useSelector(state => state.budget)

    const [openCategoryList, setOpenCategoryList] = useState(true);

    useEffect(() => {
        dispatch(fetchCategories());
    }, [])

    return (
        <Box sx={BudgetInfoWrapperStyles}>

            <Paper 
                elevation={4}
                sx={BudgetInfoPaperStyles}>

                <Typography sx={BudgetInfoTotalTextStyles}>
                    
                    Загальний стан бюджету
                </Typography>

                <Divider 
                    variant="middle" 
                    component="hr" />

                <Typography sx={BudgetInfoTotalValueStyles}> 
                    Загалом: {budget}
                </Typography>

                <Divider 
                    variant="middle" 
                    component="hr" />

                <Box sx={CategoriesListButtonWrapperStyles}>
                    <Button 
                        sx={CategoriesListButtonStyles} 
                        color='success' 
                        variant="outlined"
                        onClick={() => setOpenCategoryList(!openCategoryList)}> 

                        Список категорій
                    </Button>
                </Box>
            
            </Paper>
            
            <Transition nodeRef={nodeRef} in={openCategoryList} timeout={0}>
                {state => (
                    <Paper 
                    elevation={4} 
                    sx={CategoriesListPaperStyles}
                    style={{
                        ...defaultStyle,
                        ...transitionStyles[state]
                        }}>
                    <Typography 
                        variant="h5" 
                        sx={CategoriesListTextStyles}>
                    
                        Список категорій
                    </Typography>
    
                    { isLoading ? <Loader/> :  
    
                    <Box>
                        <Box>
                            {categories? categories.map((category) => (

                            <Box key={category._id}>
                                <ListItem>
                                    {category.type === 'Прибуток' ? 
                                        <Avatar sx={CategoryAvatarSuccessStyles}>
                                            <KeyboardArrowUpIcon color='success'/>
                                        </Avatar> : <Avatar sx={CategoryAvatarErrorStyles}>
                                            <KeyboardArrowDownIcon color='error'/>
                                        </Avatar>}
                                    <ListItemText sx={CategoryListItemTextStyles}
                                        primary={category.label.length > 50 ? `${category.label.slice(0, 50)}...` : category.label} 
                                        secondary={`Ліміт коштів: ${category.limit}`}/>
    
                                    <Box sx={CategoryButtonsWrapperStyles}>
    
                                        <EditCategoryListItemModal activeCategory={category}/>
    
                                        <DeleteCategoryListItem activeCategory={category}/>
                                    </Box>
                                </ListItem>

                                <LinearProgressBar category={category}/>

                                <Divider 
                                    variant="middle" 
                                    component="hr" />
                            </Box>
                            )) : null}
                            
                        </Box>
                    </Box>
                    }
    
                    {basicCategories ? (
                        <Box>
                        {basicCategories.map((category) => (
                        <Box key={category.id}>
                            <ListItem>
                                <ListItemAvatar>
                                <Avatar sx={basicCategoryAvatarStyles}>
                                    <RemoveIcon sx={basicCategoryIconStyles}/>
                                </Avatar>
                                </ListItemAvatar>
                                <ListItemText sx={basicCategoryListItemTextStyles}
                                    primary={category.label} 
                                    secondary={category.limit} />
                            </ListItem>

                            <Divider 
                                variant="middle" 
                                component="hr" />
                        </Box>
                        ))}
                        
                    </Box>
                    ) : null}
                    <IconButton
                        size="large"
                        color="inherit"
                        aria-label="menu"
                        sx={CategoriesListCloseButtonStyles}
                        onClick={() => {setOpenCategoryList(false)}}>
                            
                        <CloseIcon color="primary" />
                    </IconButton>
                </Paper>
                )}
            </Transition>
        </Box>
    )
}

export default BudgetInfo;