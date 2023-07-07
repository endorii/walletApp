import React, { useEffect } from 'react';
// import CategoryList from './modules/files/components/CategoryList/CategoryList';
// import TransactionsList from './modules/files/components/TransactionsList/TransactionsList';
// import AddCategory from './modules/files/components/AddCategory/AddCategory';
// import AddTransaction from './modules/files/components/AddTransaction/AddTransaction';
// import EditCategory from './modules/files/components/EditCategory/EditCategory';
// import EditTransaction from './modules/files/components/EditTransaction/EditTransaction';
import { fetchTransactions } from './store/reducers/transactionsSlice';
import { fetchCategories } from './store/reducers/categoriesSlice';
import { useDispatch } from 'react-redux';
import './app.css';
import Header from './modules/files/components/Header/Header';
import Transactions from './modules/files/components/Transactions/Transactions';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';

const App = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCategories());
        dispatch(fetchTransactions());
    }, []);

    return (
        <Router>
            <Box className="App">
                <Header/>

                <Routes>
                    <Route path="/transactions" element={<Transactions/>}/>

                </Routes>

                <Box className="Wrapper">
                        
                </Box>

                <Box className="App-header">
                    {/* <CategoryList /> */}
                    {/* <AddCategory /> */}
                    {/* <EditCategory /> */}
                </Box>
            </Box>
        </Router>
    );
};

export default App;