import { createSlice } from "@reduxjs/toolkit";

let today = new Date();
let date = today.getFullYear() + '-' + (today.getMonth() + 1).toString().padStart(2, '0') + '-' + today.getDate().toString().padStart(2, '0');

const initialState = {
    date: {date}
}

const dateSlice = createSlice({
    name: 'date',
    initialState: initialState.date,
    reducers: {
        setDate(state, action){
            state.date = action.payload;
        }
    }
})

export const {setDate} = dateSlice.actions; 

export default dateSlice.reducer;