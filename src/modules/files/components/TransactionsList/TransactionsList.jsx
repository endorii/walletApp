import { Box, Typography } from '@mui/material';
import React from 'react';
import Paper from '@mui/material/Paper';

import { setDate } from '../../../../store/reducers/dateSlice';
import { useDispatch } from 'react-redux';
// import { useSelector } from "react-redux";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import Divider from '@mui/material/Divider';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from 'moment/moment';

const TransactionsList = ({transactions}) => {

    const dispatch = useDispatch();

    function formatDate(dateString) {
        const date = moment(dateString, 'ddd MMM DD YYYY HH:mm:ss [GMT]ZZ').format('YYYY-MM-DD');
        return date;
    }

    return (
        <Paper 
        elevation={4}
            sx={{
                p: 7,
                pt: 3,
                margin: "auto",
                width: "45%"
            }}    
        >

            <LocalizationProvider dateAdapter={AdapterDayjs} >
                <DemoContainer components={['DatePicker']} >
                    <DatePicker label="Оберіть дату транзакції" onChange={e => dispatch(setDate(formatDate(e.$d)))}/>
                </DemoContainer>
            </LocalizationProvider>

            {!transactions || transactions.length === 0 ? 
            <Typography sx={{textAlign: 'center', fontSize: '40px', fontWeight: '300', mt: 3}}>
                Немає доступних транзакцій 😢
            </Typography> : 
            
            <Box>
                <Typography sx={{fontWeight: 700, fontSize: '24px', mb: 3, textAlign: 'center'}}>{transactions[0].date}</Typography>
                <Divider variant="middle" component="hr" />
                {transactions.map((transaction, i) => (
                <Box key={i}>
                    <Box>
                        <List
                            sx={{
                                width: '100%',
                                maxWidth: '100%',
                                bgcolor: 'background.paper',
                            }}
                        >
                            <ListItem key={transaction.id}>
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
                            <Divider variant="middle" component="li" />
                            
                        </List>
                    </Box>
                </Box>
                ))}
            </Box>}
        </Paper>
    );
};

export default TransactionsList;
