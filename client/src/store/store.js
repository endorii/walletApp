import { configureStore } from "@reduxjs/toolkit";
import categoriesSlice from "./reducers/categoriesSlice";
import transactionsSlice from "./reducers/transactionsSlice";
import dateSlice from "./reducers/dateSlice";
import budgetSlice from "./reducers/budgetSlice";
import startBudgetSlice from "./reducers/startBudgetSlice";

const rootReducer = {
    categories: categoriesSlice,
    transactions: transactionsSlice,
    date: dateSlice,
    budget: budgetSlice,
    startBudget: startBudgetSlice
}

const store = configureStore({
    reducer: rootReducer
})

export default store;