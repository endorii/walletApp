import { Button, TextField, Typography, Link, Paper } from '@mui/material';
import { useState } from 'react';
import { login } from '../../actions/user';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LoginPaperStyles, LoginSubtitleTextStyles, LoginEmailStyles, LoginPasswordStyles, LoginNoAccountStyles } from './styles';

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [touchedEmail, setTouchedEmail] = useState(false);
    const [touchedPassword, setTouchedPassword] = useState(false);
    const dispatch = useDispatch();

    const {user} = useSelector(state => state.user);
    
    let navigate = useNavigate(); 

    const routeChange = () =>{ 
        let path = `/transactions`; 
        navigate(path);
    }

    return (
        <Paper elevation={4} sx={LoginPaperStyles}>
            <Typography variant='h2'>Вхід</Typography>
            <Typography variant='h6' sx={LoginSubtitleTextStyles}>За допомогою аккаунту Wallet</Typography>

            <TextField 
                onBlur={() => setTouchedEmail(true)}
                sx={LoginEmailStyles}
                fullWidth
                error={touchedEmail && !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)}
                helperText={touchedEmail && !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email) ? 'Введіть правильний email' : null}
                onChange={e => setEmail(e.target.value)}
                value={email}
                type="text" 
                placeholder='Email' />

            <TextField
                onBlur={() => setTouchedPassword(true)}
                sx={LoginPasswordStyles}
                fullWidth
                error={touchedPassword && (password.length <= 3 || !password)}
                helperText={touchedPassword && (!password || password.length <= 3) ? 'Пароль повинен містити більше 3 символів' : null}
                onChange={e => setPassword(e.target.value)}
                value={password}
                type="password" 
                placeholder='Password' />

            <Button 
                disabled={password.length <= 3 || !password || !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)}
                variant="contained" 
                color="success" 
                onClick={async () => {
                    dispatch(login(email, password, routeChange));
                    if ( Object.keys(user).length > 0) {
                        routeChange();
                    }
                }} >Вхід</Button>
            <Typography variant='h6' sx={LoginNoAccountStyles}>Не маєте аккаунту? <Link href="/auth/registration" underline="none">
                {'Зареєструватися'}
            </Link></Typography>
        </Paper>
    );
};

export default Login;