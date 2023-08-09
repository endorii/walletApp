import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTransactions } from "../../../../store/reducers/transactionsSlice";
import { Button, Divider, TextField,Autocomplete, IconButton, Typography, Box } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { addTransaction } from "../../actions/transaction";
// import { fetchBudget } from "../../../../store/reducers/budgetSlice";
// import { v4 as uuidv4 } from 'uuid';

const AddTransaction = () => {

    const [transactionName, setTransactionName] = useState('');
    const [transactionValue, setTransactionValue] = useState('');
    const [transactionCategory, setTransactionCategory] = useState('');
    const [transactionDate, setTransactionDate] = useState('');
    
    const [open, setOpen] = useState(false);
    const [touched, setTouched] = useState(false);

    const dispatch = useDispatch();

    const {categories} = useSelector(state => state.categories);
    const {budget} = useSelector(state => state.budget);

    let today = new Date();
    let year = today.getFullYear();
    let month = ('0' + (today.getMonth() + 1)).slice(-2);
    let day = ('0' + today.getDate()).slice(-2);
    let formattedDate = year + '-' + month + '-' + day;

    const clearForm = () => {
        setTransactionName('');
        setTransactionValue('');
        setTransactionCategory('');
        setTransactionDate('');
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

    // const minusBudget = async(budget) => {
    //     try {
    //         const obj = {
    //             "value": Number(budget) + Number(transactionValue),
    //         }

    //         await fetch('http://localhost:3001/budget', {
    //           method: 'PUT',
    //           headers: {
    //             'Content-Type': 'application/json',
    //           },
    //           body: JSON.stringify(obj),
    //         });
            
    //         dispatch(fetchBudget());

    //     } catch (error) {
    //     console.error('Помилка при виконанні PUT-запиту:', error);
    //     }
    // }
    
    return (
        <Box>
            <Button     
                onClick={() => setOpen(!open)}
                color="inherit" 
                variant='contained' 
                sx={{mr: 20, color: 'black'}}
                endIcon={<AddIcon />}

            >Додати транзакцію</Button>
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
                            error={ touched && (transactionName.length <= 2 || !transactionName)}
                            helperText={touched && (transactionName.length <= 2) ? 'Введіть більше 2-х символів' : null}
                            value={transactionName} 
                            onChange={e => setTransactionName(e.target.value)}
                            onClick={() => setTouched(true)}
                            required
                            id="outlined-required"
                            label="Назва"
                            />

                        <TextField
                            type="number"
                            error={touched && !transactionValue}
                            helperText={touched && !transactionValue ? 'Введіть значення' : null}
                            value={transactionValue} 
                            onClick={() => setTouched(true)}
                            onChange={e => setTransactionValue(e.target.value)}
                            required
                            id="outlined-required"
                            label="Значення"
                            />

                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={categories}
                            sx={{ width: 300 }}
                            value={transactionCategory}
                            onChange={(event, value) => {
                                setTransactionCategory(value ? value.label : "");
                                if (value && value.type === "Витрати") {
                                  setTransactionValue(-transactionValue);
                                } else {
                                  setTransactionValue(transactionValue);
                                }
                            }}
                            renderInput={(params) => <TextField onClick={() => setTouched(true)} {...params} error={touched && (!transactionCategory.toString())}
                            helperText={touched && !transactionCategory ? 'Виберіть категорію' : null}
                            label="Категорія" />}
                        />

                        <TextField
                            error={touched && (transactionDate.length <= 9 || !transactionDate)}
                            helperText={touched && transactionDate.length <= 9 ? 'Введіть дату типу: "РРРР-ММ-ДД"' : null}
                            value={transactionDate} 
                            onClick={() => transactionDate === '' ? setTransactionDate(formattedDate) : transactionDate}
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
                        onClick={() => setOpen(!open)}>
                            
                        <CloseIcon color="primary" />
                    </IconButton>

                </Box>
            </Box> : null}
        </Box>  
    )
}

export default AddTransaction;