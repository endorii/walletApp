import { Box, Button, TextField, Typography, Link } from '@mui/material';
import { useState } from 'react';
import { login } from '../../actions/user';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [touched, setTouched] = useState(false);
    const dispatch = useDispatch();

    const {user} = useSelector(state => state.user);
    
    let navigate = useNavigate(); 
    const routeChange = () =>{ 
    let path = `/transactions`; 
    navigate(path);
  }
    return (
        <Box sx={{
            margin: "10% auto",
            width: "40%",
            backgroundColor: "#fff",
            boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
            borderRadius: "10px",
            padding: "50px",
            height: "auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "15px"
        }}>
            <Typography variant='h2'>Вхід</Typography>
            <Typography variant='h6' sx={{ fontWeight: 300, fontSize: "18px"}}>За допомогою аккаунту Wallet</Typography>
            <TextField 
                error={touched && !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)}
                helperText={touched && !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email) ? 'Введіть правильний email' : null}
                onClick={() => setTouched(true)}
                onChange={e => setEmail(e.target.value)}
                value={email}
                type="text" 
                placeholder='Email' />


            <TextField

                error={touched && (password.length <= 3 || !password)}
                helperText={touched && (!password || password.length <= 3) ? 'Пароль повинен містити більше 3 символів' : null}
                onClick={() => setTouched(true)}
                onChange={e => setPassword(e.target.value)}
                value={password}
                type="password" 
                placeholder='Password' />

            <Button 
                disabled={password.length <= 3 || !password || !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)}
                variant="contained" 
                color="success" 
                onClick={() => {
                dispatch(login(email, password));
                if (user !== {}) {
                    routeChange();
                }
            }} >Вхід</Button>
            <Typography variant='h6' sx={{ fontWeight: 300, fontSize: "16px"}}>Не маєте аккаунту? <Link href="/auth/registration" underline="none">
                {'Зареєструватися'}
            </Link></Typography>
        </Box>
    );
};

export default Login;