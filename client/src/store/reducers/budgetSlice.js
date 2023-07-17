import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    budget: null,
    isLoading: false,
    error : null
}

export const fetchBudget = createAsyncThunk(
    "budget/fetchBudget",
    async () => {
      const response = await fetch("http://localhost:3001/budget");
      const data = await response.json();
      return data;
    }
);

const budgetSlice = createSlice({
    name: 'budget',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder 
            .addCase(fetchBudget.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchBudget.fulfilled, (state, action) => {
                state.budget = action.payload.value;
                state.isLoading = false;
            })
            .addCase(fetchBudget.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error;
            })
    }
})

export default budgetSlice.reducer;