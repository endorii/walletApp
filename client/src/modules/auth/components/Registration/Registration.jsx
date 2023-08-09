import { Box, Button, TextField, Typography, Link } from '@mui/material';
import React from 'react';
import { useState } from 'react';
import { registration } from '../../actions/user';
import { useNavigate } from 'react-router-dom';

const Registartion = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [touched, setTouched] = useState(false);

    let navigate = useNavigate(); 
    const routeChange = () =>{ 
    let path = `/auth/login`; 
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
            <Typography variant='h2'>Реєстрація</Typography>
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
                onClick={() => {registration(email, password); routeChange()}}>Зареєструватися</Button>
                <Typography variant='h6' sx={{ fontWeight: 300, fontSize: "16px"}}>Вже маєте аккаунт? <Link href="/auth/login" underline="none">
                {'Увійти'}
            </Link></Typography>
        </Box>
    );
};

export default Registartion;