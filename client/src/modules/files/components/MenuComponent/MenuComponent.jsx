import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { logout } from '../../../../store/reducers/userSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

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
    <div>
      <IconButton
        size="large"
        color="inherit"
        aria-label="menu"
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        sx={{mb: 3, p: 0.5, }}
        onClick={handleClick}
        >

        <MenuIcon />
      </IconButton>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={() => {handleClose(); routeChange(); dispatch(logout());}}>Logout</MenuItem>
      </Menu>
    </div>
  );
}