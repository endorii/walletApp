import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    categories: [],
    isLoading: false,
    error : null
}

export const fetchCategories = createAsyncThunk(
    "categories/fetchCategories",
    async () => {
      const response = await fetch("http://localhost:3001/categories");
      const data = await response.json();
      return data;
    }
  );

const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.isLoading = false;
                state.categories = action.payload;
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error;
            })
    }
})

export const {setCategories} = categoriesSlice.actions; 

export default categoriesSlice.reducer;