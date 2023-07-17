import React, { useEffect } from 'react';
import { fetchTransactions } from './store/reducers/transactionsSlice';
import { fetchCategories } from './store/reducers/categoriesSlice';
import { useDispatch } from 'react-redux';
import './app.css';
import Header from './modules/files/components/Header/Header';
import Transactions from './view/pages/transactions/Transactions';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import Budget from './view/pages/budget/Budget';
import { fetchBudget } from './store/reducers/budgetSlice';
import Report from './view/pages/report/Report';
import { fetchStartBudget } from './store/reducers/startBudgetSlice';

const App = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCategories());
        dispatch(fetchTransactions());
        dispatch(fetchBudget());
        dispatch(fetchStartBudget());
    }, []);

    return (
        <Router>
            <Box className="App">
                <Header/>

                <Routes>
                    <Route path="/transactions" element={<Transactions/>}/>
                    <Route path="/report" element={<Report/>}/>
                    <Route path="/budget" element={<Budget/>}/>

                </Routes>
            </Box>
        </Router>
    );
};

export default App;