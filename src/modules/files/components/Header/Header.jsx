import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import SavingsIcon from '@mui/icons-material/Savings';
import AssessmentIcon from '@mui/icons-material/Assessment';

import { NavLink } from 'react-router-dom';

import AddTransaction from '../AddTransaction/AddTransaction';

const Header = () => {
    return (
        <Box>
            <Box>
            <AppBar 
            position="fixed">
                <Toolbar sx={{p: 0, display: 'flex', justifyContent: 'space-between'}}>
                    
                    <Typography
                        sx={{ ml: 10}}>
                        Гаманець
                    </Typography>
                    
                    <AddTransaction />
                    
                </Toolbar>
            </AppBar>

            
        </Box>
        <Box>
            <AppBar 
                position='fixed' 
                sx={{left: 0, height: '100vh', width: '80px', display: 'flex', alignItems: 'center'}}>
                <Toolbar 
                    sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '10px'}}>
                    <IconButton
                        size="large"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mt: 1 }}>
                            
                        <MenuIcon />
                    </IconButton>
                    
                    <NavLink to="/transactions" style={({ isActive, isPending }) => {
                        return {
                        color: isActive ? "white" : "#93d2ed",
                        textDecoration: 'none'
                        };
                    }}>
                        <IconButton
                            size="large"
                            color="inherit"
                            aria-label="menu"
                            sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>

                            <AccountBalanceWalletIcon />
                            
                            <Typography 
                                sx={{fontSize: '14px', mt: 1}}>
                            Транзакції
                            </Typography>
                        
                        </IconButton>
                    </NavLink>

                    <NavLink 
                        to='/report' 
                        style={({ isActive, isPending }) => {
                        return {
                        color: isActive ? "white" : "#93d2ed",
                        textDecoration: 'none'
                        };
                    }}>
                        <IconButton
                        size="large"
                        color="inherit"
                        aria-label="menu"
                        sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>

                            <AssessmentIcon />
                        
                            <Typography 
                                sx={{fontSize: '14px', mt: 1}}>
                                Звіт
                            </Typography>
                        
                        </IconButton>
                    </NavLink>

                    <NavLink to='budget' style={({ isActive, isPending }) => {
                        return {
                        color: isActive ? "white" : "#93d2ed",
                        textDecoration: 'none'
                        };
                    }}>
                        <IconButton
                            size="large"
                            color="inherit"
                            aria-label="menu"
                            sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                        <SavingsIcon />
                    
                        <Typography 
                            sx={{fontSize: '14px', mt: 1}}>
                            Бюджет
                        </Typography>
                        </IconButton>
                    </NavLink>
                </Toolbar>
            </AppBar>
        </Box>
        </Box>
    );
}

export default Header;