import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { StorageService } from '../../services/StorageService';
import axios from 'axios';
import { BACKEND_API_URL } from '../../constants';
import { Card, CardContent, CardHeader, Fab, IconButton, InputAdornment, TextField } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { ToastContainer, toast } from 'react-toastify';
import { useAuth } from '../../services/AuthContext';



// const PASSWORD_LENGTH = 8;
// const PASSWORD_COMPLEXITY_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;
// const COMMON_PASSWORDS = ['password', '123456789', 'qwerty', '123456', '12345678'];

// function validatePassword(password: any) {
//     if (password.length < PASSWORD_LENGTH) {
//         return "Password must be at least 8 characters long.";
//     }

//     if (!PASSWORD_COMPLEXITY_REGEX.test(password)) {
//         return "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character.";
//     }

//     if (COMMON_PASSWORDS.includes(password)) {
//         return "Password is too common or easily guessable. Please choose a different password.";
//     }

//     if(password == "password"){
//         return "";
//     }

//     return "";
// }

export const LoginForm = () => {
    const navigate = useNavigate();
    //const { setUser } = useAuth();
    const [form, setForm] = useState({ username: '', password: '' });
    const [hidePassword, setHidePassword] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoginFailed, setIsLoginFailed] = useState(false);
    //const [roles, setRoles] = useState([]);
    const [username, setUsername] = useState('');
    const [formErrors, setFormErrors] = useState({ password: '' });


    useEffect(() => {
        if (!!sessionStorage.getItem('auth-user')) {
            setIsLoggedIn(true);
            //setRoles(storageService.getUser().roles);
            setUsername(JSON.parse(sessionStorage.getItem('auth-user') ?? '{}').username);
            //setUser(JSON.parse(sessionStorage.getItem('auth-user') ?? '{}').username);
        }
    }, [username]);

    const handleFormChange = (event: any) => {
        const { name, value } = event.target;
        // const error = name === 'password' ? validatePassword(value) : '';
        // setFormErrors(prevFormErrors => ({ ...prevFormErrors, [name]: error }));
        setForm(prevForm => ({ ...prevForm, [name]: value }));
    };

    const handleLogin = (event: any) => {
        event.preventDefault();
        const { username, password } = form;
        return axios.post(
            `${BACKEND_API_URL}/auth/signin`,
            {
                username,
                password,
            }).then(
                (data) => {
                    StorageService.saveUser(data.data);
                    setIsLoginFailed(false);
                    setIsLoggedIn(true);

                    setUsername(data.data.username);

                    //setRoles(storageService.getUser().roles);

                    toast.success('You have successfully logged in.');
                    setTimeout(() => {
                        navigate('/airlines');
                        reloadPage();
                    }, 1500);


                },
                (error) => {
                    toast.error('Bad credentials.' + error.response.data);
                    console.log(error);
                    setIsLoginFailed(true);
                });
    };
    const reloadPage = () => {
        window.location.reload();
    }




    return (
        <div className="container-fluid p-5 mb-5 d-flex align-items-center justify-content-center">
            <ToastContainer />
            <Card className="card card-container p-5 m-5 align-center" style={{ display: isLoggedIn ? 'none' : 'block' }}>
                <CardHeader className="centered-header mb-4" title="Please fill in your credentials" />
                <CardContent>
                    <form onSubmit={handleLogin} noValidate>
                        <div className="form-group mb-2">
                            <TextField
                                fullWidth
                                label="Username"
                                margin="dense"
                                name="username"
                                onChange={handleFormChange}
                                required
                                value={form.username}
                                variant="outlined"
                            />
                        </div>
                        <div className="form-group mb-2">
                            <TextField
                                fullWidth
                                label="Password"
                                margin="dense"
                                name="password"
                                onChange={handleFormChange}
                                required
                                type={hidePassword ? 'password' : 'text'}
                                value={form.password}
                                variant="outlined"
                                error={Boolean(formErrors.password)}
                                helperText={formErrors.password}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={() => setHidePassword(!hidePassword)}>
                                                {hidePassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </div>
                        <p mb-2>
                            You don't have an account? Sign up <Link to="/register">here</Link>
                        </p>
                        <div className="form-group" >
                            <Fab color="primary" type="submit" variant="extended">
                                Log in
                            </Fab>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}

function wait(arg0: number) {
    throw new Error('Function not implemented.');
}

