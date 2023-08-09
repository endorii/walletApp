import { Box, Typography, Paper, ListItem, ListItemText, ListItemAvatar, Avatar, Divider, IconButton } from '@mui/material';
import { useState, useEffect } from 'react';
import { setDate } from '../../../store/reducers/dateSlice';
import { useDispatch, useSelector } from 'react-redux';
import ImageIcon from '@mui/icons-material/Image';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DatePicker } from '@mui/x-date-pickers';
import CloseIcon from '@mui/icons-material/Close';
import moment from 'moment/moment';
import EditTransactionListItemModal from './EditTransactionsListItemModal';
import DeleteTransactionsListItem from './DeleteTransactionsListItem';
import Loader from '../../../modules/files/components/Loader/Loader';
import { fetchTransactions } from "../../../store/reducers/transactionsSlice";

const TransactionsList = ({transactions}) => {

    const isLoading = useSelector(state => state.transactions.isLoading);
    const dispatch = useDispatch();
    const [activePaper, setActivePaper] = useState(false);
    const [activeTransaction, setActiveTransaction] = useState([]);

    useEffect(() => {
        dispatch(fetchTransactions());
    }, [])

    function formatDate(dateString) {
        const date = moment(dateString, 'ddd MMM DD YYYY HH:mm:ss [GMT]ZZ').format('YYYY-MM-DD');
        return date;
    }

    return (
        <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'flex-start', gap: '2%'}}>
            <Paper 
        elevation={4}
            sx={{
                p: 7,
                pt: 3,
                width: "45%"
            }}    
        >
            <LocalizationProvider dateAdapter={AdapterDayjs} >
                <DemoContainer components={['DatePicker']} >
                    <DatePicker label="Оберіть дату транзакції" onChange={e => dispatch(setDate(formatDate(e.$d)))}/>
                </DemoContainer>
            </LocalizationProvider>

            {isLoading ? <Loader/> : !transactions || transactions.length === 0 ? 
            <Typography sx={{textAlign: 'center', fontSize: '40px', fontWeight: '300', mt: 3}}>
                Немає доступних транзакцій 😢
            </Typography> : 
            
            <Box>
                <Typography sx={{fontWeight: 700, fontSize: '24px', mb: 3, textAlign: 'center'}}>{transactions[0].date}</Typography>
                <Divider variant="middle" component="hr" />
                
                {transactions.map((transaction) => (

                    <Box key={transaction._id} 
                    onClick={() => {setActivePaper(true); setActiveTransaction(transaction)}}
                    >
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <ImageIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={transaction.category} secondary={transaction.name} />
                            <Typography>
                                {transaction.value} UAH
                            </Typography>
                        </ListItem>
                        <Divider variant="middle" component="hr" />
                    </Box>
                ))}
            </Box>}
        </Paper>

        {activePaper ? 
            <Paper
                elevation={4}
                sx={{
                    p: 7,
                    pt: 3,
                    width: "45%",
                    position: 'relative'
                }}   
            >
                <Box
                    sx={{display: 'flex', justifyContent: 'space-between', mb: 2}}
                >
                    <Typography 
                        sx={{fontSize: '24px', fontWeight: 400}}
                    >Інформація про транзакцію</Typography>
                    <Box sx={{display: 'flex', justifyContent: 'center', gap: '10px'}}>
                        <EditTransactionListItemModal activeTransaction={activeTransaction} activePaper={activePaper} setActivePaper={setActivePaper}/>

                        <DeleteTransactionsListItem activeTransaction={activeTransaction} activePaper={activePaper} setActivePaper={setActivePaper}/>
                    </Box>

                    <IconButton
                        size="large"
                        color="inherit"
                        aria-label="menu"
                        sx={{position: 'absolute', top: 0, left: 0}}
                        onClick={() => {setActivePaper(!activePaper); setActiveTransaction(null)}}>
                            
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
                    <ListItemText primary={activeTransaction.category} secondary={activeTransaction.name} />
                    <Typography>
                        {activeTransaction.value} UAH
                    </Typography>
                </ListItem>
                </Box>

            </Paper> 
            
            : null }
        </Box>
    );
};

export default TransactionsList;
