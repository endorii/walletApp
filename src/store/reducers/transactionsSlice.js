import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    transactions: []
}

const transactionsSlice = createSlice({
    name: 'transactions',
    initialState: initialState.transactions,
    reducers: {
        setTransactions(state, action){
            return action.payload;
        }
    }
})

export const {setTransactions} = transactionsSlice.actions; 

export default transactionsSlice.reducer;