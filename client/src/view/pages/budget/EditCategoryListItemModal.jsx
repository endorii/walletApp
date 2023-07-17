import { useState, useEffect } from "react";
import { fetchCategories } from "../../../store/reducers/categoriesSlice";
import { fetchTransactions } from "../../../store/reducers/transactionsSlice";
import IconButton from "@mui/material/IconButton";
import CloseIcon from '@mui/icons-material/Close';
import { TextField, Typography, Box, Button } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import {Autocomplete} from "@mui/material";
import { useDispatch } from "react-redux";

const EditCategoryListItemModal = ({activeCategory}) => {

    const [open, setOpen] = useState(false);
    const [categoryName, setCategoryName] = useState(activeCategory.label);
    const [limit, setLimit] = useState(activeCategory.limit);
    const [type, setType] = useState(activeCategory.type);

    const dispatch = useDispatch();

    useEffect(() => {
        setCategoryName(activeCategory.label);
        setLimit(activeCategory.limit);
    }, [activeCategory]);

    const editCategory = async (label) => {
        try {
            const obj = {
                id: `${label}`,
                label: `${categoryName}`,
                limit: Number(limit),
                type: type
            };
    
            await fetch(`http://localhost:3001/categories/${label}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(obj),
            });
    
            dispatch(fetchCategories());
            dispatch(fetchTransactions());

        } catch (error) {
            console.error('Помилка при виконанні PUT-запиту:', error);
        }
    };

    return (
            <Box>
                <IconButton aria-label="edit" color="success" onClick={() => setOpen(true)}>
                    <EditIcon />
                </IconButton>
            {open ? 
            
            <Box className="overlay"
                sx={{
                    position: "fixed",
                    zIndex: "2000",
                    paddingTop: "100px",
                    left: "0",
                    top: "0",
                    width: "100%",
                    height: "100%",
                    overflow: "auto",
                    backgroundColor: "rgba(0,0,0,0.4)",
                }}
            >
                <Box className="modal" 
                sx={{
                    p: 7,
                    pt: 3,
                    position: 'relative', 
                    borderRadius: "5px", 
                    backgroundColor: "#fefefe",
                    margin: "auto",
                    border: "1px solid #888",
                    width: "50%"
                }}>
                    <Typography className="modal_title" color='primary' sx={{fontSize: "30px", fontWeight: 'bold', textAlign: 'center'}}>
                        Змінити категорію
                    </Typography>
                                    
                    <Box 
                    component="form"
                    autoComplete="off"
                    sx={{
                        mt: 3,
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: 'center',
                        gap: "10px",
                    }}>

                        <TextField

                            error={categoryName.length <= 2 || !categoryName}
                            helperText={categoryName.length <= 2 ? 'Введіть більше 2-х символів' : null}
                            value={categoryName} 
                            onChange={e => setCategoryName(e.target.value)}
                            required
                            id="outlined-required"
                            label="Назва"
                        />

                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={["Витрати", "Прибуток"]}
                            sx={{ width: 250 }}
                            value={type}
                            onChange={(event, value) => {setType(value)}}
                            renderInput={(params) => <TextField {...params} error={!type}
                            helperText={!type ? 'Виберіть тип' : null}
                            label="Тип категорії" />}
                        />

                        <TextField
                        type="number"
                            error={limit < 0 || !limit}
                            helperText={!limit || limit < 0 ? 'Ліміт повинен бути більше 0' : null}
                            value={limit} 
                            onChange={e => setLimit(e.target.value)}
                            required
                            id="outlined-required"
                            label="Ліміт"
                        />

                        <Button 
                            disabled={categoryName.length <= 2 || !categoryName || limit < 0 || !limit}
                            color="success"
                            variant="contained"
                            type='submit' 
                            onClick={e => {
                            e.preventDefault();
                            editCategory(activeCategory.id);
                            setOpen(!open);
                            }
                        }>Редагувати</Button>   
                    
                    </Box>

                    <IconButton
                        size="large"
                        color="inherit"
                        aria-label="menu"
                        sx={{position: 'absolute', top: -5, right: -5}}
                        onClick={() => setOpen(!open)}>
                            
                        <CloseIcon color="primary" />
                    </IconButton>
                </Box>
            </Box> : null}
        </Box>
    )
};

export default EditCategoryListItemModal;