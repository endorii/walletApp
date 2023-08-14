import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { setDate } from '../../../../store/reducers/dateSlice';
import { useDispatch } from 'react-redux';
// import { fetchTransactions } from '../../../../store/reducers/transactionsSlice';
import { ukUA } from "@mui/x-date-pickers/locales";

import 'dayjs/locale/uk';

export default function MonthPicker() {
    const {date} = useSelector(state => state.date);
    const [selectedDate, setSelectedDate] = React.useState(date);

    const dispatch = useDispatch();

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="uk" localeText={ukUA.components.MuiLocalizationProvider.defaultProps.localeText}>
            <DatePicker sx={{
                width: "100%"
            }} value={dayjs(selectedDate)} 
                onChange={(newValue) => {
                    const dateString = newValue.format("YYYY-MM-DD");
                    setSelectedDate(dateString);
                    dispatch(setDate(dateString));
                    // dispatch(fetchTransactions());
                }}label='Виберать дату' views={['month', 'year']} />
        
        </LocalizationProvider>
    );
}