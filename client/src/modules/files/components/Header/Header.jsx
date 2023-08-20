import { AppBar, Box, Toolbar, Typography, IconButton } from '@mui/material';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import SavingsIcon from '@mui/icons-material/Savings';
import AssessmentIcon from '@mui/icons-material/Assessment';
import { NavLink } from 'react-router-dom';
import MenuComponent from './MenuComponent/MenuComponent';

import { HeaderAppBarStyles, HeaderIconButtonStyles, HeaderLinkTextStyles, HeaderToolBarStyles } from './styles';

const Header = () => {

    const NavLinks = [
        {name: 'Транзакції', path: '/transactions', icon: <AccountBalanceWalletIcon />},
        {name: 'Звіт', path: '/report', icon: <AssessmentIcon />},
        {name: 'Бюджет', path: '/budget', icon: <SavingsIcon />}
    ]
    
    return (
        <Box>
            <Box>
                <AppBar 
                    position='fixed' 
                    sx={HeaderAppBarStyles}>

                    <Toolbar 
                        sx={HeaderToolBarStyles}>
                    
                        <MenuComponent/>

                        {NavLinks.map((link, i) => 
                            <NavLink key={i}
                            to={link.path} 
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
                                sx={HeaderIconButtonStyles}>

                                {link.icon}
                                
                                <Typography 
                                    sx={HeaderLinkTextStyles}>

                                {link.name}
                                </Typography>
                            
                            </IconButton>
                        </NavLink>
                        )}
                    </Toolbar>
                </AppBar>
            </Box>
        </Box>
    );
}

export default Header;