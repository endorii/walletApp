import { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { logout } from '../../../../../store/reducers/userSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Box, IconButton, Menu, MenuItem } from '@mui/material';
import { MenuIconButtonStyles } from './styles';

export default function MenuComponent() {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const dispatch = useDispatch();

        let navigate = useNavigate(); 

        const routeChange = () =>{
            let path = `/auth/login`; 
            navigate(path);
        }

    return (
        <Box>
            <IconButton
                size="large"
                color="inherit"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                sx={MenuIconButtonStyles}
                onClick={handleClick}
                >
                <MenuIcon />
            </IconButton>

            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={() => {handleClose(); routeChange(); dispatch(logout());}}>Logout</MenuItem>
            </Menu>
        </Box>
    );
}