import { Button, TextField, Typography, Link, Paper } from '@mui/material';
import React from 'react';
import { useState } from 'react';
import { registration } from '../../actions/user';
import { useNavigate } from 'react-router-dom';
import { RegistrationPaperStyles, RegistrationSubtitleTextStyles, RegistrationEmailStyles, RegistrationPasswordStyles, RegistrationNoAccountStyles } from './styles';

const Registartion = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [touchedEmail, setTouchedEmail] = useState(false);
    const [touchedPassword, setTouchedPassword] = useState(false);

    const navigate = useNavigate();

    const routeChange = () =>{ 
        let path = `/auth/login`; 
        navigate(path);
    }

    return (
        <Paper elevation={4} sx={RegistrationPaperStyles}>
            <Typography variant='h2'>Реєстрація</Typography>
            <Typography variant='h6' sx={RegistrationSubtitleTextStyles}>За допомогою аккаунту Wallet</Typography>
            <TextField 
                sx={RegistrationEmailStyles}
                error={touchedEmail && !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)}
                helperText={touchedEmail && !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email) ? 'Введіть правильний email' : null}
                onBlur={() => setTouchedEmail(true)}
                onChange={e => setEmail(e.target.value)}
                value={email}
                fullWidth
                type="text" 
                placeholder='Email' />

            <TextField
                sx={RegistrationPasswordStyles}
                error={touchedPassword && (password.length <= 3 || !password)}
                helperText={touchedPassword && (!password || password.length <= 3) ? 'Пароль повинен містити більше 3 символів' : null}
                onBlur={() => setTouchedPassword(true)}
                onChange={e => setPassword(e.target.value)}
                value={password}
                fullWidth
                type="password" 
                placeholder='Password' />

            <Button 
                disabled={password.length <= 3 || !password || !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)}
                variant="contained" 
                color="success" 
                onClick={() => {registration(email, password, routeChange);}}>Зареєструватися</Button>
                <Typography variant='h6' sx={RegistrationNoAccountStyles}>Вже маєте аккаунт? <Link href="/auth/login" underline="none">
                {'Увійти'}
            </Link></Typography>
        </Paper>
    );
};

export default Registartion;