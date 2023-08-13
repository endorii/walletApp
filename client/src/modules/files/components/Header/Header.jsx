import {AppBar, Box, Toolbar, Typography, IconButton, Button, Modal} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import SavingsIcon from '@mui/icons-material/Savings';
import AssessmentIcon from '@mui/icons-material/Assessment';
import { NavLink } from 'react-router-dom';
import { logout } from '../../../../store/reducers/userSlice';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';

const Header = () => {

    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();

    let navigate = useNavigate(); 

    const routeChange = () =>{
        let path = `/auth/login`; 
        navigate(path);
    }
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
                    
                    <Modal open={open}>
                        <Box>
                            <Box className="overlay"
                            onClick={() => {setOpen(!open);}}
                            sx={{
                                position: "fixed",

                                paddingTop: "100px",
                                left: "0",
                                top: "0",
                                width: "100%",
                                height: "100%",
                                overflow: "auto",
                                backgroundColor: "rgba(0,0,0,0.4)",
                            }}
                            >
                                <Box className="modal" 
                                sx={{
                                    p: 7,
                                    pt: 3,
                                    position: 'relative', 
                                    borderRadius: "5px", 
                                    backgroundColor: "#fefefe",
                                    margin: "auto",
                                    border: "1px solid #888",
                                    width: "50%"
                                }}>
                                    <Button onClick={() => {routeChange(); dispatch(logout())}}>Вийти</Button>
                                </Box>
                            </Box>
                        </Box>
                    </Modal>

                    <Toolbar 
                        sx={{
                            display: 'flex', 
                            flexDirection: 'column', 
                            alignItems: 'center', 
                            justifyContent: 'center', 
                            gap: '10px', 
                            mt: 2}}>
                    
                    

                    <IconButton
                        size="large"
                        color="inherit"
                        aria-label="menu"
                        sx={{mb: 3, p: 0.5, }}
                        onClick={() => setOpen(true)}
                        >

                        <MenuIcon />
                    </IconButton>
                        
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