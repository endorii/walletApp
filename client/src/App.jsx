import { useEffect } from 'react';
import { fetchTransactions } from './store/reducers/transactionsSlice';
import { fetchCategories } from './store/reducers/categoriesSlice';
import { useDispatch, useSelector } from 'react-redux';
import Header from './modules/files/components/Header/Header';
import Transactions from './view/pages/transactions/Transactions';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import Budget from './view/pages/budget/Budget';
import Report from './view/pages/report/Report';
import Login from './modules/auth/components/Login/Login';
import { useLocation } from 'react-router-dom';
import Registartion from './modules/auth/components/Registration/Registration';
import { auth } from './modules/auth/actions/user';
import './app.css';

const App = () => {
    const dispatch = useDispatch();
    const isAuth = useSelector(state => state.user.isAuth);

    const HeaderWrapper = () => {
        const location = useLocation();
        return location.pathname !== '/auth/login' && location.pathname !== '/auth/registration' && <Header />;
    }

    useEffect(() => {
        dispatch(auth());
        dispatch(fetchTransactions());
        dispatch(fetchCategories());

        // dispatch(fetchBudget());
        // dispatch(fetchStartBudget());
    }, []);

    return (
        <Router>
            <Box className="App">
                <HeaderWrapper />
                {isAuth === false && 
                <Routes>
                    <Route path='/auth/login' element={<Login/>} />
                    <Route path='/auth/registration' element={<Registartion/>} />
                </Routes>}

                {isAuth === true ? 
                <Routes>
                    <Route path="/transactions" element={<Transactions/>}/>
                    <Route path="/report" element={<Report/>}/>
                    <Route path="/budget" element={<Budget/>}/>
                </Routes> : null}
            </Box>
        </Router>
    );
};



export default App;