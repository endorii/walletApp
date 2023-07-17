import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  transactions: [],
  isLoading: false,
  error : null
};

export const fetchTransactions = createAsyncThunk(
  "transactions/fetchTransactions",
  async () => {
    const response = await fetch("http://localhost:3001/transactions");
    const data = await response.json();
    return data;
  }
);

const transactionsSlice = createSlice({
    name: "transactions",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchTransactions.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(fetchTransactions.fulfilled, (state, action) => {
            state.isLoading = false;
            state.transactions = action.payload;
        })
        .addCase(fetchTransactions.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error; // зберігаємо текст помилки в стейт
        })
      },
    },
);

export const { setTransactions } = transactionsSlice.actions;

export default transactionsSlice.reducer;