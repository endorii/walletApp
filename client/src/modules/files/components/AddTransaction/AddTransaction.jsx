import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTransactions } from "../../../../store/reducers/transactionsSlice";
import { Button, Divider, TextField, IconButton, Typography, Box, Modal } from "@mui/material";
import {Autocomplete} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { addTransaction } from "../../actions/transaction";
// import { fetchBudget } from "../../../../store/reducers/budgetSlice";
// import { v4 as uuidv4 } from 'uuid';

const AddTransaction = () => {

    let today = new Date();
    let year = today.getFullYear();
    let month = ('0' + (today.getMonth() + 1)).slice(-2);
    let day = ('0' + today.getDate()).slice(-2);
    let formattedDate = year + '-' + month + '-' + day;

    const [transactionName, setTransactionName] = useState('');
    const [transactionValue, setTransactionValue] = useState(null);
    const [transactionCategory, setTransactionCategory] = useState('');
    const [transactionDate, setTransactionDate] = useState(formattedDate);

    const [touchedTransactionName, setTouchedTransactionName] = useState(false);
    const [touchedTransactionValue, setTouchedTransactionValue] = useState(false);
    const [touchedTransactionCategory, setTouchedTransactionCategory] = useState(false);
    const [touchedTransactionDate, setTouchedTransactionDate] = useState(false);

    const [fullTransactionCategory, setFullTransactionCategory] = useState('');
    
    const [open, setOpen] = useState(false);

    const dispatch = useDispatch();

    const {categories} = useSelector(state => state.categories);
    const {basicCategories} = useSelector(state => state.categories);
    const {budget} = useSelector(state => state.budget);

    const clearForm = () => {
        setTransactionName('');
        setTransactionValue(null);
        setTransactionCategory('');
        setTransactionDate(formattedDate);
        setOpen(false);
    }

    const createObj = async() => {
        try {
            await addTransaction(transactionName, transactionValue, transactionCategory, transactionDate);

            dispatch(fetchTransactions());

        } catch (error) {
            console.error('Помилка при виконанні POST-запиту:', error);
        }
    }
    
    return (
        <Box sx={{}}>
            <Button     
                onClick={() => setOpen(!open)}
                color="inherit" 
                variant='contained' 
                sx={{mr: 20, color: 'black'}}
                endIcon={<AddIcon />}

            >Додати транзакцію</Button>
            <Modal open={open}>
                <Box 
                    sx={{
                        paddingTop: "100px",
                    }}
                >
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

                            Додати транзакцію
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
                            }}>

                            <TextField
                                error={ touchedTransactionName && (transactionName.length <= 2 || !transactionName)}
                                helperText={touchedTransactionName && (transactionName.length <= 2) ? 'Введіть більше 2-х символів' : null}
                                value={transactionName} 
                                onChange={e => setTransactionName(e.target.value)}
                                onBlur={() => setTouchedTransactionName(true)}
                                required
                                id="outlined-required"
                                label="Назва"
                                />

                            <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                options={categories && basicCategories ? categories.concat(basicCategories) : []}
                                sx={{ width: 300 }}
                                value={transactionCategory}
                                onChange={(event, value) => {
                                    setTransactionCategory(value ? value.label : "");
                                    setFullTransactionCategory(value);
                                }}
                                renderInput={(params) => <TextField onBlur={() => setTouchedTransactionCategory(true)} {...params} error={touchedTransactionCategory && (!transactionCategory.toString())}
                                helperText={touchedTransactionCategory && !transactionCategory ? 'Виберіть категорію' : null}
                                label="Категорія" />}
                            />

                            <TextField
                                type="number"
                                error={touchedTransactionValue && !transactionValue}
                                disabled={!transactionCategory}
                                helperText={touchedTransactionValue && !transactionValue ? 'Введіть значення' : null}
                                value={fullTransactionCategory.type === "Прибуток" ? Math.abs(transactionValue) : -Math.abs(transactionValue)} 
                                onBlur={(e) => {setTouchedTransactionValue(true); setTransactionValue(e.target.value)}}
                                onChange={e => setTransactionValue(e.target.value)}
                                required
                                id="outlined-required"
                                label="Значення"
                                />

                            <TextField
                                error={touchedTransactionDate && (transactionDate.length <= 9 || !transactionDate)}
                                helperText={touchedTransactionDate && transactionDate.length <= 9 ? 'Введіть дату типу: "РРРР-ММ-ДД"' : null}
                                value={transactionDate} 
                                onBlur={() => transactionDate === '' ? setTouchedTransactionDate(formattedDate) : transactionDate}
                                onChange={e => setTransactionDate(e.target.value)}
                                required
                                id="outlined-required"
                                label="Дата"
                                />

                            <Button 
                                disabled={transactionName.length <= 2 || !transactionName || !transactionValue || !transactionCategory || transactionDate.length <= 9 || !transactionName}
                                color="primary"
                                variant="contained"
                                type='submit' 
                                onClick={e => {
                                e.preventDefault();
                                // minusBudget(budget);
                                createObj();
                                clearForm()}

                            }>Додати</Button>
                        </Box>

                        <IconButton
                            size="large"
                            color="inherit"
                            aria-label="menu"
                            sx={{position: 'absolute', top: -5, right: -5}}
                            onClick={() => {setOpen(!open); clearForm()}}>
                                
                            <CloseIcon color="primary" />
                        </IconButton>

                    </Box>
                </Box>
            </Modal>
        </Box>  
    )
}

export default AddTransaction;