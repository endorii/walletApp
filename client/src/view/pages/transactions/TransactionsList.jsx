import { Box, Typography, Paper, ListItem, ListItemText, ListItemAvatar, Avatar, Divider, IconButton, TextField, Modal, Button, Autocomplete } from '@mui/material';
import { useState, useEffect, useRef } from 'react';
import { setDate } from '../../../store/reducers/dateSlice';
import { useDispatch, useSelector } from 'react-redux';
import ImageIcon from '@mui/icons-material/Image';
import CloseIcon from '@mui/icons-material/Close';
import DeleteTransactionsListItem from './DeleteTransactionsListItem';
import Loader from '../../../modules/files/components/Loader/Loader';
import { fetchTransactions } from "../../../store/reducers/transactionsSlice";
import Transition from 'react-transition-group/Transition';
import { editTransactionItem } from '../../../modules/files/actions/transaction';

const TransactionsList = () => {
    const nodeRef = useRef(null)
    const duration = 450;

    const defaultStyle = {
        transition: `all ${duration}ms ease-in-out`,
        opacity: 0,
        display: "none",
        transform: 'translateX(-100%)',
    }

    const transitionStyles = {
        entering: { display: "block", opacity: 0, transform: 'translateX(-100%)' },
        entered:  { display: "block", opacity: 1, transform: 'translateX(0)' },
        exiting:  { display: "none", opacity: 1, transform: 'translateX(-100%)' },
        exited:  { display: "none", opacity: 0, transform: 'translateX(-100%)' },
    };

    const {transactions} = useSelector(state => state.transactions);
    const isLoading = useSelector(state => state.transactions.isLoading);
    const dispatch = useDispatch();
    const {date} = useSelector(state => state.date);
    const [activePaper, setActivePaper] = useState(false);
    const [activeTransaction, setActiveTransaction] = useState({});

    const [open, setOpen] = useState(false);
    const [transactionName, setTransactionName] = useState(activeTransaction.name);
    const [transactionValue, setTransactionValue] = useState(activeTransaction.value);
    const [transactionCategory, setTransactionCategory] = useState(activeTransaction.category);
    const [transactionDate, setTransactionDate] = useState(activeTransaction.date);
    const {categories} = useSelector(state => state.categories)
    const {basicCategories} = useSelector(state => state.categories);

    const formattedDate = (transactionDate) => {
        const date = new Date(transactionDate);
        if (isNaN(date)) {
            return 'Invalid date';
        }
        const options = { day: 'numeric', weekday: 'long', month: 'long', year: 'numeric' };
        const formattedDate = new Intl.DateTimeFormat('uk-UA', options).format(date);
        const capitalizedDate = formattedDate.split(' ').map(word => word[0].toUpperCase() + word.slice(1)).join(' ');
        return capitalizedDate;
    }

    const filteredDataOnMonthAndYear = () => {
        if (transactions) {
            const filteredTransactions = transactions.filter(transaction => {
                const transactionDate = new Date(transaction.date);
                const filterDate = new Date(date);
                return transactionDate.getMonth() === filterDate.getMonth() && transactionDate.getFullYear() === filterDate.getFullYear();
            });
            return filteredTransactions;
        } else {
            return [];
        }
    }

    const editTransaction = async (transactionID) => {
        try {

            await editTransactionItem(transactionID, transactionName, transactionValue, transactionCategory, transactionDate);

            dispatch(fetchTransactions());
        } catch (error) {
            console.error('Помилка при виконанні PUT-запиту:', error);
        }
    };

    useEffect(() => {
        dispatch(fetchTransactions());
        setTransactionName(activeTransaction.name);
        setTransactionValue(activeTransaction.value);
        setTransactionCategory(activeTransaction.category);
        setTransactionDate(activeTransaction.date);
    }, [activeTransaction]);

    return (
        <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'flex-start', gap: '2%'}}>
            <Paper 
                elevation={4}
                sx={{
                    p: 7,
                    pt: 3,
                    width: "45%",
                    zIndex: 2
                }}    
        >
            <h1>тут має бути контейнер з вибором дати</h1>

            {isLoading ? <Loader/> : !transactions || transactions.length === 0 ? 
            <Typography sx={{textAlign: 'center', fontSize: '40px', fontWeight: '300', mt: 3}}>
                Немає доступних транзакцій 😢
            </Typography> : 
            
            <Box>
                <Typography sx={{fontWeight: 700, fontSize: '24px', mb: 3, textAlign: 'center'}}>{date}</Typography>
                <Divider variant="middle" component="hr" />
                
                {filteredDataOnMonthAndYear().map((transaction) => (

                    <Box key={transaction._id} 
                    onClick={() => {setActivePaper(true); setActiveTransaction(transaction)}}
                    >
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <ImageIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText sx={{
                                    wordWrap: 'break-word'
                                }} 
                                primary={transaction.category.length > 21 ? `${transaction.category.slice(0, 21)}...` : transaction.category} 
                                secondary={transaction.name.length > 50 ? `${transaction.name.slice(0, 50)}...` : transaction.name} />
                            <Typography sx={{p: 2, textAlign: "center"}}>
                                {transaction.value} UAH
                            </Typography>
                        </ListItem>
                        <Typography sx={{
                            ml: 2, mb: 1, fontSize: "14px", color: "grey", fontWeight: 300
                        }}>
                            {formattedDate(transaction.date)}
                        </Typography>
                        <Divider variant="middle" component="hr" />
                    </Box>
                ))}
            </Box>}
        </Paper>

        <Transition nodeRef={nodeRef} in={activePaper} timeout={0}>
            {state => (
                <Paper
                elevation={4}
                sx={{
                    p: 7,
                    pt: 3,
                    width: "45%",
                    zIndex: 1
                }}  
                style={{
                    ...defaultStyle,
                    ...transitionStyles[state]
                  }}
            >
                <Box
                    sx={{display: 'flex', justifyContent: 'space-between', mb: 2}}
                >
                    <Typography 
                        sx={{fontSize: '24px', fontWeight: 400}}
                    >Інформація про транзакцію</Typography>
                    <Box sx={{display: 'flex', justifyContent: 'center', gap: '10px'}}>

                    <Button variant='outlined' color='success' onClick={() => setOpen(true)}>Змінити</Button>

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
                            <Typography color='primary' sx={{fontSize: "30px", fontWeight: 'bold', textAlign: 'center'}}>
                                Змінити транзакцію
                            </Typography>
                                            
                            <Box 
                            component="form"
                            autoComplete="off"
                            sx={{
                                position: "relative",
                                mt: 3,
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: 'center',
                                gap: "10px",
                            }}>

                                <TextField
                                    error={!transactionName || transactionName.length <= 2}
                                    helperText={!transactionName || transactionName.length <= 2 ? 'Введіть більше 2-х символів' : null}
                                    value={transactionName} 
                                    onChange={e => setTransactionName(e.target.value)}
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
                                        if (value && value.type === "Витрати") {
                                          setTransactionValue(-Math.abs(transactionValue));
                                        } else {
                                          setTransactionValue(Math.abs(transactionValue));
                                        }
                                    }}
                                    renderInput={(params) => <TextField {...params} error={!transactionCategory || !transactionCategory.toString()} helperText={!transactionCategory ? 'Виберіть категорію' : null}
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
                                    error={!transactionDate || transactionDate.length <= 9}
                                    helperText={!transactionDate || transactionDate.length <= 9 ? 'Введіть дату типу: "РРРР-ММ-ДД"' : null}
                                    value={transactionDate} 
                                    onChange={e => setTransactionDate(e.target.value)}
                                    required
                                    id="outlined-required"
                                    label="Дата"
                                    />
        
                                <Button 
                                    disabled={!transactionName || !transactionValue || !transactionCategory || transactionName.length <= 2 || transactionDate.length <= 9}
                                    color="success"
                                    variant="contained"
                                    type='submit' 
                                    onClick={e => {
                                    e.preventDefault();
                                    editTransaction(activeTransaction._id);
                                    setOpen(!open);
                                    setActivePaper(false);
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
                    </Box>
                        </Modal>
                        

                        {/* <EditTransactionListItemModal activeTransaction={activeTransaction} activePaper={activePaper} setActivePaper={setActivePaper}/> */}

                        <DeleteTransactionsListItem activeTransaction={activeTransaction} activePaper={activePaper} setActivePaper={setActivePaper}/>
                    </Box>

                    <IconButton
                        size="large"
                        color="inherit"
                        aria-label="menu"
                        sx={{position: 'absolute', top: 0, left: 0}}
                        onClick={() => {setActivePaper(!activePaper); setActiveTransaction("")}}>
                            
                        <CloseIcon color="primary" />
                    </IconButton>
                </Box>
                <Divider variant="middle" component="hr" />
                <Box>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar>
                                <ImageIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText 
                            sx={{wordWrap: 'break-word', p: 2}} 
                            primary={activeTransaction.category} 
                            secondary={activeTransaction.name} />
                        <Typography sx={{p: 2, textAlign: "center"}}>
                            {activeTransaction.value} UAH
                        </Typography>
                    </ListItem>
                    <Typography sx={{ 
                        ml: 2, mb: 1, fontSize: "14px", color: "grey", fontWeight: 300
                    }}>
                        {formattedDate(activeTransaction.date)}
                    </Typography>
                </Box>

            </Paper> 
            )}
        </Transition>
        </Box>
    );
};

export default TransactionsList;
