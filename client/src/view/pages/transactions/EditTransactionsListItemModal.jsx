import { Autocomplete, TextField, Typography, Box, Button, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTransactions } from "../../../store/reducers/transactionsSlice";
import CloseIcon from '@mui/icons-material/Close';
import { editTransactionItem } from "../../../modules/files/actions/transaction";

const EditTransactionListItemModal = ({activeTransaction, activePaper, setActivePaper}) => {

    const [open, setOpen] = useState(false);
    const [transactionName, setTransactionName] = useState(activeTransaction.name);
    const [transactionValue, setTransactionValue] = useState(activeTransaction.value);
    const [transactionCategory, setTransactionCategory] = useState(activeTransaction.category);
    const [transactionDate, setTransactionDate] = useState(activeTransaction.date);
    const {categories} = useSelector(state => state.categories)
    const dispatch = useDispatch();

    useEffect(() => {
        setTransactionName(activeTransaction.name);
        setTransactionValue(activeTransaction.value);
        setTransactionCategory(activeTransaction.category);
        setTransactionDate(activeTransaction.date);
    }, [activeTransaction]);

    const editTransaction = async (transactionID) => {
        try {

            await editTransactionItem(transactionID, transactionName, transactionValue, transactionCategory, transactionDate);

            dispatch(fetchTransactions());
        } catch (error) {
            console.error('Помилка при виконанні PUT-запиту:', error);
        }
    };

    return (
        <Box>
            <Button variant='outlined' color='success' onClick={() => setOpen(true)}>Змінити</Button>
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
                    <Typography color='primary' sx={{fontSize: "30px", fontWeight: 'bold', textAlign: 'center'}}>
                        Змінити транзакцію
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

                        <Autocomplete
                            
                            disablePortal
                            id="combo-box-demo"
                            options={categories}
                            sx={{ width: 300 }}
                            value={transactionCategory}
                            onChange={(event, value) => {
                                setTransactionCategory(value ? value.label : "");
                                if (value && value.type === "Витрати") {
                                  setTransactionValue(-Math.abs(transactionValue));
                                } else {
                                  setTransactionValue(Math.abs(transactionValue));
                                }
                            }}
                            renderInput={(params) => <TextField {...params} error={!transactionCategory.toString()} helperText={!transactionCategory ? 'Виберіть категорію' : null}
                            label="Категорія" />}
                        />

                        <TextField
                            type="number"
                            error={!transactionValue}
                            helperText={!transactionValue ? 'Введіть значення' : null}
                            value={transactionValue} 
                            onChange={e => setTransactionValue(e.target.value)}
                            required
                            id="outlined-required"
                            label="Занчення"
                        />

                        <TextField
                            error={transactionDate.length <= 9 || !transactionName}
                            helperText={transactionDate.length <= 9 ? 'Введіть дату типу: "РРРР-ММ-ДД"' : null}
                            value={transactionDate} 
                            onChange={e => setTransactionDate(e.target.value)}
                            required
                            id="outlined-required"
                            label="Дата"
                            />

                        <TextField
                            error={transactionName.length <= 2 || !transactionName}
                            helperText={transactionName.length <= 2 ? 'Введіть більше 2-х символів' : null}
                            value={transactionName} 
                            onChange={e => setTransactionName(e.target.value)}
                            required
                            id="outlined-required"
                            label="Назва"
                            />

                        <Button 
                            disabled={transactionName.length <= 2 || !transactionName || !transactionValue || !transactionCategory || transactionDate.length <= 9 || !transactionName}
                            color="success"
                            variant="contained"
                            type='submit' 
                            onClick={e => {
                            e.preventDefault();
                            editTransaction(activeTransaction._id);
                            setOpen(!open);
                            setActivePaper(!activePaper);
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
}

export default EditTransactionListItemModal