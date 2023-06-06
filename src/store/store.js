import { configureStore } from "@reduxjs/toolkit";
import categoriesSlice from "./reducers/categoriesSlice";
import transactionsSlice from "./reducers/transactionsSlice";
import dateSlice from "./reducers/dateSlice";

const rootReducer = {
    categories: categoriesSlice,
    transactions: transactionsSlice,
    date: dateSlice
}

const store = configureStore({
    reducer: rootReducer
})

export default store;