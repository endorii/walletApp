import React, { useEffect, useState } from 'react';
import CategoryList from './modules/files/components/CategoryList/CategoryList';
import TransactionsList from './modules/files/components/TransactionsList/TransactionsList';

import { setCategories } from './store/reducers/categoriesSlice';
import { setTransactions } from './store/reducers/transactionsSlice';
import { setDate } from './store/reducers/dateSlice';

import PrimarySearchAppBar from './view/ui/AppBar/AppBar';
import MiniDrawer from './view/ui/Drawer/Drawer';

import AddCategory from './modules/files/components/AddCategory/AddCategory';
import AddTransaction from './modules/files/components/AddTransaction/AddTransaction';
import EditCategory from './modules/files/components/EditCategory/EditCategory';
import EditTransaction from './modules/files/components/EditTransaction/EditTransaction';

import { useDispatch, useSelector } from 'react-redux';

import './app.css';

const App = () => {

    const dispatch = useDispatch();
    const categories = useSelector(state => state.categories);
    const transactions = useSelector(state => state.transactions);
    const date = useSelector(state => state.date)

    useEffect(() => {
        getCategories();
        getTransactions();
    }, []);

    const getCategories = async () => {
        try {
          const response = await fetch('http://localhost:3001/categories');
          const data = await response.json();
          dispatch(setCategories(data));
        } catch (e) {
          console.error(e);
        }
      };

    const getTransactions = async () => {
        try {
            const response = await fetch('http://localhost:3001/transactions');
            const data = await response.json();
            dispatch(setTransactions(data));
        } catch (e) {
            console.error(e);
        }
    }

    const filteredDataOnDate = () => {
        if (transactions) {
            const filteredTransactions = transactions.filter(transaction => transaction.date === date);
            return filteredTransactions;
        } else {
            return [];
        }
    }
    
    return (
        <div className="App">
            <input type="date" value={date} onChange={e => dispatch(setDate(e.target.value))}/>
            <header className="App-header">

                <CategoryList categories={categories}/>

                <TransactionsList transactions={filteredDataOnDate()} />

                <AddCategory getCategories={getCategories}/>

                <EditCategory getCategories={getCategories}/>

                <AddTransaction getTransactions={getTransactions}/>

                <EditTransaction getTransactions={getTransactions}/>

            </header>
        </div>
    );
};

export default App;