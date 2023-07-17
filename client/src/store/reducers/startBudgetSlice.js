import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    startBudget: null,
    isLoading: false,
    error : null
}

export const fetchStartBudget = createAsyncThunk(
    "startBudget/fetchStartBudget",
    async () => {
      const response = await fetch("http://localhost:3001/startBudget");
      const data = await response.json();
      return data;
    }
);

const startBudgetSlice = createSlice({
    name: 'startBudget',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder 
            .addCase(fetchStartBudget.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchStartBudget.fulfilled, (state, action) => {
                state.startBudget = action.payload.value;
                state.isLoading = false;
            })
            .addCase(fetchStartBudget.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error;
            })
    }
})

export default startBudgetSlice.reducer;