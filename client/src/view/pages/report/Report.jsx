import { Box, Button, AppBar, Toolbar, Modal, List, ListItem, ListItemText, Paper } from "@mui/material";
import ReportInfo from "./ReportInfo";
import { useEffect, useState } from "react";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { fetchTransactions } from "../../../store/reducers/transactionsSlice";
import { useDispatch, useSelector } from "react-redux";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { ReportAppBarStyles, ReportButtonChangeDateStyles, ReportIconStyles, ReportListItemStyles, ReportPaperStyles, ReportToolBarStyles } from "./styles";
import { dateOptions } from "./functions";

const Report = () => {

    const dispatch = useDispatch();
    const {email} = useSelector(state => state.user.user)

    const [open, setOpen] = useState(false);
    const [buttonText, setButtonText] = useState('Цього місяця');
    const [activeDate, setActiveDate] = useState('');

    const handleDateOptionClick = (option) => {
        setActiveDate(option);
        setButtonText(option.label);
        setOpen(false);
    };

    useEffect(() => {
        dispatch(fetchTransactions());
        setActiveDate(dateOptions[0]);
    }, [])

    return (
        <Box >
            <Box>
                <AppBar sx={ReportAppBarStyles}
                    position="fixed">

                    <Toolbar sx={ReportToolBarStyles}>

                        <ListItem sx={ReportListItemStyles}>
                                <AccountCircleIcon sx={ReportIconStyles}/>
                                <ListItemText ml={1}
                            primary={email}/>
                        </ListItem> 

                        <Box >
                            <Button
                                onClick={() => setOpen(!open)}
                                color="inherit"
                                variant='contained'
                                sx={ReportButtonChangeDateStyles}
                                endIcon={<AccessTimeIcon />}
                            >
                                Змінити дату: {buttonText}
                            </Button>
                        </Box>
                    </Toolbar>
                </AppBar>
            </Box>
            <Box ml={15} mt={15}>

                <ReportInfo activeDate={activeDate}/>

            </Box>

            <Modal
                open={open}
                onClose={() => setOpen(false)}
            >
                <Paper
                    elevation={4}
                    sx={ReportPaperStyles}>
                        <List>
                        {dateOptions.map((option) => (
                            <ListItem button key={option.label} onClick={() => {handleDateOptionClick(option)}}>
                                <ListItemText primary={option.label} secondary={`${option.startDate.toLocaleDateString()} - ${option.endDate.toLocaleDateString()}`} />
                            </ListItem>
                        ))}
                        </List>
                </Paper>
            </Modal>
        </Box>
    )
}

export default Report;
