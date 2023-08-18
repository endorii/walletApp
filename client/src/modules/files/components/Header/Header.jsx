import { AppBar, Box, Toolbar, Typography, IconButton } from '@mui/material';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import SavingsIcon from '@mui/icons-material/Savings';
import AssessmentIcon from '@mui/icons-material/Assessment';
import { NavLink } from 'react-router-dom';
import MenuComponent from '../MenuComponent/MenuComponent';

const Header = () => {
    
    return (
        <Box sx={{}}>
            <Box>
                <AppBar 
                    position='fixed' 
                    sx={{
                        left: 0, 
                        height: '100vh', 
                        width: '80px', 
                        display: 'flex', 
                        alignItems: 'center'}}>
                

                    <Toolbar 
                        sx={{
                            display: 'flex', 
                            flexDirection: 'column', 
                            alignItems: 'center', 
                            justifyContent: 'center', 
                            gap: '10px', 
                            mt: 2}}>
                    
                        <MenuComponent/>
                        
                        <NavLink 
                            to="/transactions" 
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
                                sx={{
                                    display: 'flex', 
                                    flexDirection: 'column', 
                                    alignItems: 'center', 
                                    justifyContent: 'center'}}>

                                <AccountBalanceWalletIcon />
                                
                                <Typography 
                                    sx={{
                                        fontSize: '14px', 
                                        mt: 1}}>

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
                                sx={{
                                    display: 'flex', 
                                    flexDirection: 'column', 
                                    alignItems: 'center', 
                                    justifyContent: 'center'}}>

                                <AssessmentIcon />
                            
                                <Typography 
                                    sx={{
                                        fontSize: '14px', 
                                        mt: 1}}>

                                    Звіт
                                </Typography>
                            
                            </IconButton>
                        </NavLink>

                        <NavLink 
                            to='budget' 
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

                                <SavingsIcon />
                            
                                <Typography 
                                    sx={{
                                        fontSize: '14px', 
                                        mt: 1}}>

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