import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { useDispatch } from "react-redux";
import { fetchCategories } from "../../../../store/reducers/categoriesSlice";
import { Button, Divider } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';
import IconButton from "@mui/material/IconButton";
import CloseIcon from '@mui/icons-material/Close';
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {Autocomplete} from "@mui/material";

const AddCategory = () => {
    const [open, setOpen] = useState(false);
    const [category, setCategory] = useState('');
    const [limit, setLimit] = useState(0);
    const [type, setType] = useState('');
    const dispatch = useDispatch();

    const clearForm = () => {
        setCategory('');
        setLimit('');
        setType('');
        setOpen(false);
    }

    const createObj = async() => {
        try {
            const obj = {
                "id": `${uuidv4()}`,
                "label": `${category}`,
                "limit": Number(limit),
                "type": type
            }

            await fetch('http://localhost:3001/categories', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(obj),
            });
            
            dispatch(fetchCategories())

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
                sx={{mr: 20, color: 'black'}}
                endIcon={<AddIcon />}
            >Додати категорію</Button>

            {open ? 
            
            <Box 
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
                }}>

                <Box 
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
                    
                    <Typography 
                        color='primary' 
                        sx={{
                            mb: 2, 
                            fontSize: "30px", 
                            fontWeight: 'bold', 
                            textAlign: 'center'}}>

                        Додати категорію
                    </Typography>

                    <Divider 
                        variant="middle" 
                        component="hr" />

                    <Box 
                        component="form"
                        autoComplete="off"
                        sx={{
                            mt: 3,
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: 'center',
                            gap: "10px",
                        }}
                    >
                        <TextField
                            error={category.length <= 2 || !category}
                            helperText={category.length <= 2 ? 'Введіть більше 2-х символів' : null}
                            value={category} 
                            onChange={e => setCategory(e.target.value)}
                            required
                            id="outlined-required"
                            label="Назва категорії"
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
                            value={limit} 
                            error={limit < 0 || !limit}
                            helperText={!limit || limit < 0 ? 'Ліміт повинен бути більше 0' : null}
                            onClick={() => setLimit('')}
                            onChange={e => setLimit(e.target.value)}
                            required
                            id="outlined-required"
                            label="Ліміт коштів"
                        />      

                        <Button 
                            disabled={category.length <= 2 || !category || limit < 0 || !limit}
                            color="primary"
                            variant="contained"
                            type='submit' 
                            onClick={e => {
                                e.preventDefault();
                                createObj();
                                clearForm();
                            }}>Додати
                        </Button>
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

export default AddCategory;