import { Box, Button, AppBar, Toolbar, Modal, List, ListItem, ListItemText } from "@mui/material";
import ReportInfo from "./ReportInfo";
import { useEffect, useState } from "react";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { fetchTransactions } from "../../../store/reducers/transactionsSlice";
import { useDispatch, useSelector } from "react-redux";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Report = () => {
    const [open, setOpen] = useState(false);
    const [buttonText, setButtonText] = useState('Цього місяця');
    const [activeDate, setActiveDate] = useState('');

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();

    const dispatch = useDispatch();
    const {email} = useSelector(state => state.user.user)

    const dateOptions = [
        {
            label: 'Цього місяця',
            startDate: new Date(currentYear, currentMonth, 1),
            endDate: new Date(currentYear, currentMonth + 1, 0)
        },
        {
            label: 'Минулого місяця',
            startDate: new Date(currentYear, currentMonth - 1, 1),
            endDate: new Date(currentYear, currentMonth, 0)
        },
        {
            label: 'Останні 3 місяці',
            startDate: new Date(currentYear, currentMonth - 2, 1),
            endDate: new Date(currentYear, currentMonth + 1, 0)
        },
        {
            label: 'Останні 6 місяців',
            startDate: new Date(currentYear, currentMonth - 5, 1),
            endDate: new Date(currentYear, currentMonth + 1, 0)
        },
        {
            label: 'Цього року',
            startDate: new Date(currentYear, 0, 1),
            endDate: new Date(currentYear + 1, 0, 0)
        },
        {
            label: 'Минулого року',
            startDate: new Date(currentYear - 1, 0, 1),
            endDate: new Date(currentYear, 0, 0)
        }
    ];

    useEffect(() => {
        dispatch(fetchTransactions());
        setActiveDate(dateOptions[0])
    }, [])

    const handleDateOptionClick = (option) => {
        setActiveDate(option);
        setButtonText(option.label);
        setOpen(false);
    };

    return (
        <Box >
            <Box>
                <AppBar sx={{zIndex: 1000}}
                    position="fixed">

                    <Toolbar sx={{
                        p: 0,
                        flexGrow: 1}}>

                        <ListItem sx={{ ml: 12, flexGrow: 1}}>
                                <AccountCircleIcon sx={{ height: '30px', width: '30px' }}/>
                                <ListItemText sx={{ml: 1}}
                            primary={email}/>
                        </ListItem> 

                        <Box >
                            <Button
                                onClick={() => setOpen(!open)}
                                color="inherit"
                                variant='contained'
                                sx={{mr:20,color:'black'}}
                                endIcon={<AccessTimeIcon />}
                            >
                                Змінити дату: {buttonText}
                            </Button>
                        </Box>
                    </Toolbar>
                </AppBar>
            </Box>
            <Box sx={{
                ml:15,
                mt:15}}>

                <ReportInfo activeDate={activeDate}/>

            </Box>

            <Modal
                open={open}
                onClose={() => setOpen(false)}
            >
                <Box
                    sx={{
                    width:'35%',
                    bgcolor:'background.paper',
                    p:5,
                    m:'auto',
                    mt:'10%',
                    outline:'none'}}>
                        <List>
                        {dateOptions.map((option) => (
                            <ListItem button key={option.label} onClick={() => {handleDateOptionClick(option)}}>
                                <ListItemText primary={option.label} secondary={`${option.startDate.toLocaleDateString()} - ${option.endDate.toLocaleDateString()}`} />
                            </ListItem>
                        ))}
                        </List>
                </Box>
            </Modal>
        </Box>
    )
}

export default Report;
