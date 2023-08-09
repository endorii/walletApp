import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllCategories } from "../../modules/files/actions/category";

const initialState = {
    categories: [],
    isLoading: false,
    error : null
}

export const fetchCategories = createAsyncThunk(
    "categories/fetchCategories",
    async () => {
      const response = getAllCategories();
      return response;
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
    },
},)

export const {setCategories} = categoriesSlice.actions; 

export default categoriesSlice.reducer;