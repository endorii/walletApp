import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    date: '2023-07-05'
}

const dateSlice = createSlice({
    name: 'date',
    initialState: initialState.date,
    reducers: {
        setDate(state, action){
            return action.payload;
        }
    }
})

export const {setDate} = dateSlice.actions; 

export default dateSlice.reducer;