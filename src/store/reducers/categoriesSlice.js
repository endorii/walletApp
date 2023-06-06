import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    categories: []
}

const categoriesSlice = createSlice({
    name: 'categories',
    initialState: initialState.categories,
    reducers: {
        setCategories(state, action){
            return action.payload;
        }
    }
})

export const {setCategories} = categoriesSlice.actions; 

export default categoriesSlice.reducer;