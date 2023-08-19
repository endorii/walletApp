import { Box, Typography, Paper, ListItem, ListItemText, ListItemAvatar, Avatar, Divider, IconButton, TextField, Modal, Button, Autocomplete } from '@mui/material';
import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CloseIcon from '@mui/icons-material/Close';
import DeleteTransactionsListItem from './DeleteTransactionsListItem';
import Loader from '../../../modules/files/components/Loader/Loader';
import { fetchTransactions } from "../../../store/reducers/transactionsSlice";
import Transition from 'react-transition-group/Transition';
import { editTransactionItem } from '../../../modules/files/actions/transaction';
import MonthPicker from '../../../modules/auth/components/MonthPicker/MonthPicker';
import { AutocompleteStyles, AvatarErrorStyles, AvatarSuccessStyles, CloseIconStyles, FormattedDateStyles, TransactionsListActiveButtonsWrapperStyles, TransactionsListActiveInfoTextStyles, TransactionsListActiveInsideStyles, TransactionsListActiveModalFormStyles, TransactionsListActiveModalStyles, TransactionsListActiveModalTextStyles, TransactionsListActivePaperStyles, TransactionsListListItemTextStyles, TransactionsListPaperStyles, TransactionsListTextNoTransactionsStyles, TransactionsListWrapperStyles, ValueStyles } from './styles';

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
        <Box sx={TransactionsListWrapperStyles}>
            <Paper 
                elevation={4}
                sx={TransactionsListPaperStyles}    
        >
            <MonthPicker/>

            {isLoading ? <Loader/> : !transactions || transactions.length === 0 ? 
            <Typography sx={TransactionsListTextNoTransactionsStyles}>
                Немає доступних транзакцій 😢
            </Typography> : 
            
            <Box>
                <Divider mt={2} variant="middle" component="hr" />
                {filteredDataOnMonthAndYear().length <= 0 ? <Typography sx={TransactionsListTextNoTransactionsStyles}>
                Немає доступних транзакцій 😢
            </Typography> : 
                filteredDataOnMonthAndYear().map((transaction) => (
                <Box key={transaction._id} 
                onClick={() => {setActivePaper(true); setActiveTransaction(transaction)}}
                >
                    <ListItem>
                        <ListItemAvatar>
                            {transaction.value >= 0 ? 
                            <Avatar sx={AvatarSuccessStyles}>
                                <KeyboardArrowUpIcon color='success'/>
                            </Avatar> : <Avatar sx={AvatarErrorStyles}>
                                <KeyboardArrowDownIcon color='error'/>
                            </Avatar>}
                        </ListItemAvatar>
                        <ListItemText sx={TransactionsListListItemTextStyles} 
                            primary={transaction.category.length > 21 ? `${transaction.category.slice(0, 21)}...` : transaction.category} 
                            secondary={transaction.name.length > 50 ? `${transaction.name.slice(0, 50)}...` : transaction.name} />
                        <Typography sx={ValueStyles}>
                            {transaction.value} UAH
                        </Typography>
                    </ListItem>
                    <Typography sx={FormattedDateStyles}>
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
                sx={TransactionsListActivePaperStyles}  
                style={{
                    ...defaultStyle,
                    ...transitionStyles[state]
                  }}
                >   
                    <Box
                        sx={TransactionsListActiveInsideStyles}
                    >
                    <Typography 
                        sx={TransactionsListActiveInfoTextStyles}>

                        Інформація про транзакцію
                    </Typography>
                    <Box sx={TransactionsListActiveButtonsWrapperStyles}>

                        <Button variant='outlined' color='success' onClick={() => setOpen(true)}>Змінити</Button>

                        <DeleteTransactionsListItem activeTransaction={activeTransaction} activePaper={activePaper} setActivePaper={setActivePaper}/>

                        <Modal open={open}>
                            <Box sx={TransactionsListActiveModalStyles}>
                                <Typography color='primary' sx={TransactionsListActiveModalTextStyles}>
                                    Змінити транзакцію
                                </Typography>
                                                
                                <Box 
                                    component="form"
                                    autoComplete="off"
                                    sx={TransactionsListActiveModalFormStyles}>

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
                                        sx={AutocompleteStyles}
                                        value={transactionCategory}
                                        onChange={(event, value) => {
                                            setTransactionCategory(value ? value.label : "");
                                        }}
                                        renderInput={(params) => <TextField {...params} error={!transactionCategory || !transactionCategory.toString()} helperText={!transactionCategory ? 'Виберіть категорію' : null}
                                        label="Категорія" />}
                                    />

                                    <TextField
                                        type="number"
                                        error={!transactionValue}
                                        helperText={!transactionValue ? 'Введіть значення' : null}
                                        value={transactionValue}
                                        onBlur={e => setTransactionValue(e.target.value)}
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
                                    sx={CloseIconStyles}
                                    onClick={() => setOpen(!open)}>
                                        
                                    <CloseIcon color="primary" />
                                </IconButton>
                            </Box>
                        </Modal>
                    </Box>

                    <IconButton
                        size="large"
                        color="inherit"
                        aria-label="menu"
                        sx={CloseIconStyles}
                        onClick={() => {setActivePaper(!activePaper); setActiveTransaction("")}}>
                            
                        <CloseIcon color="primary" />
                    </IconButton>
                </Box>
                <Divider variant="middle" component="hr" />
                <Box>
                    <ListItem>
                    {activeTransaction.value >= 0 ? 
                            <Avatar sx={AvatarSuccessStyles}>
                            <KeyboardArrowUpIcon color='success'/>
                        </Avatar> : <Avatar sx={AvatarErrorStyles}>
                                <KeyboardArrowDownIcon color='error'/>
                            </Avatar>}
                        <ListItemText 
                            sx={{wordWrap: 'break-word', p: 2}} 
                            primary={activeTransaction.category} 
                            secondary={activeTransaction.name} />
                        <Typography sx={ValueStyles}>
                            {activeTransaction.value} UAH
                        </Typography>
                    </ListItem>
                    <Typography sx={FormattedDateStyles}>
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