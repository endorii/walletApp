import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useSelector, useDispatch } from 'react-redux';
import dayjs from 'dayjs';
import { setDate } from '../../../../store/reducers/dateSlice';
import { ukUA } from "@mui/x-date-pickers/locales";
import 'dayjs/locale/uk';
import { DatePickerStyles } from './styles';
import { useState } from 'react';

export default function MonthPicker() {
    const {date} = useSelector(state => state.date);
    const [selectedDate, setSelectedDate] = useState(date);

    const dispatch = useDispatch();

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="uk" localeText={ukUA.components.MuiLocalizationProvider.defaultProps.localeText}>
            <DatePicker sx={DatePickerStyles} value={dayjs(selectedDate)} 
                onChange={(newValue) => {
                    const dateString = newValue.format("YYYY-MM-DD");
                    setSelectedDate(dateString);
                    dispatch(setDate(dateString));
                }}label='Виберать дату' views={['month', 'year']} />
        
        </LocalizationProvider>
    );
}