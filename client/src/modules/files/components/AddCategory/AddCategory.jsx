import { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchCategories } from "../../../../store/reducers/categoriesSlice";
import { Button, Divider, Autocomplete, Box, TextField, IconButton, Typography, Modal } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { addCategory } from "../../actions/category";

import { AddCategoryMainButtonStyles, AddCategoryWrapperStyles, AddCategorySubWrapperStyles, AddCategoryTextStyles, AddCategoryFormStyles, AddCategoryAutocompleteStyles, AddCategoryCloseIconStyles } from "./styles";

const AddCategory = () => {
    const [open, setOpen] = useState(false);
    const [category, setCategory] = useState('');
    const [limit, setLimit] = useState(0);
    const [type, setType] = useState('');

    const [touchedCategory, setTouchedCategory] = useState(false);
    const [touchedLimit, setTouchedLimit] = useState(false);
    const [touchedType, setTouchedType] = useState(false);

    const dispatch = useDispatch();

    const clearForm = () => {
        setCategory('');
        setLimit('');
        setType('');
        setOpen(false);
    }

    const createObj = async() => {
        try {
            await addCategory(category, limit, type);

            dispatch(fetchCategories());
            clearForm();

        } catch (error) {
        console.error('Помилка при виконанні POST-запиту:', error);
        }
    }
    
    return (
        <Box>
            <Button     
                onClick={() => setOpen(!open)}
                color="inherit" 
                variant='contained' 
                sx={AddCategoryMainButtonStyles}
                endIcon={<AddIcon />}
            >Додати категорію</Button>

        <Modal open={open}>
            <Box 
                sx={AddCategoryWrapperStyles}>

                <Box 
                    sx={AddCategorySubWrapperStyles}>
                    
                    <Typography 
                        color='primary' 
                        sx={AddCategoryTextStyles}>

                        Додати категорію
                    </Typography>

                    <Divider 
                        variant="middle" 
                        component="hr" />

                    <Box 
                        component="form"
                        autoComplete="off"
                        sx={AddCategoryFormStyles}
                    >
                        <TextField
                            error={touchedCategory && (category.length <= 2 || !category)}
                            helperText={touchedCategory && category.length <= 2 ? 'Введіть більше 2-х символів' : null}
                            value={category} 
                            onBlur={() => setTouchedCategory(true)}
                            onChange={e => setCategory(e.target.value)}
                            required
                            id="outlined-required"
                            label="Назва категорії"
                        />

                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={["Витрати", "Прибуток"]}
                            sx={AddCategoryAutocompleteStyles}
                            value={type}
                            onChange={(event, value) => {setType(value)}}
                            renderInput={(params) => <TextField onBlur={() => setTouchedType(true)} {...params} error={touchedType && !type}
                            helperText={touchedType && !type ? 'Виберіть тип' : null}
                            label="Тип категорії" />}
                        />

                        <TextField
                            type="number"
                            value={limit} 
                            error={touchedLimit && (limit < 0 || !limit)}
                            helperText={touchedLimit && (!limit || limit) < 0 ? 'Ліміт повинен бути більше 0' : null}
                            onClick={() => setLimit('')}
                            onBlur={() => {setTouchedLimit(true)}}
                            onChange={e => setLimit(e.target.value)}
                            required
                            id="outlined-required"
                            label="Ліміт коштів"
                        />      

                        <Button 
                            disabled={category.length <= 2 || !category || limit < 0 || !limit || !type}
                            color="primary"
                            variant="contained"
                            type='submit' 
                            onClick={() => {createObj()}}>

                                Додати
                        </Button>
                    </Box>

                    <IconButton
                        size="large"
                        color="inherit"
                        aria-label="menu"
                        sx={AddCategoryCloseIconStyles}
                        onClick={() => setOpen(!open)}>
                            
                        <CloseIcon color="primary" />
                    </IconButton>   
                </Box>
            </Box>
        </Modal>
        </Box>  
    )
};

export default AddCategory;