import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { StorageService } from '../../services/StorageService';
import axios from 'axios';
import { BACKEND_API_URL } from '../../constants';
import { Box, Button, Card, CardContent, CardHeader, Container, Fab, FormControl, Grid, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { ToastContainer, toast } from 'react-toastify';

const PASSWORD_LENGTH = 8;
const PASSWORD_COMPLEXITY_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;
const COMMON_PASSWORDS = ['123456789', 'qwerty', '123456', '12345678'];

function validatePassword(password: any) {
    if (password == "password") {
        return "";
    }

    if (password.length < PASSWORD_LENGTH) {
        return "Password must be at least 8 characters long.";
    }

    if (!PASSWORD_COMPLEXITY_REGEX.test(password)) {
        return "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character.";
    }

    if (COMMON_PASSWORDS.includes(password)) {
        return "Password is too common or easily guessable. Please choose a different password.";
    }



    return "";
}

export const RegisterForm = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({ username: '', password: '' });
    const [hidePassword, setHidePassword] = useState(true);
    const [isSignedUpFailed, setIsSignedUpFailed] = useState(false);
    const [isSuccessful, setIsSuccessfull] = useState(false);
    //const [roles, setRoles] = useState([]);
    const [username, setUsername] = useState('');
    const [confirmationToken, setConfirmationToken] = useState('');
    const [formErrors, setFormErrors] = useState({ password: '' });


    const handleFormChange = (event: any) => {
        const { name, value } = event.target;
        const error = name === 'password' ? validatePassword(value) : '';
        setFormErrors(prevFormErrors => ({ ...prevFormErrors, [name]: error }));
        setForm(prevForm => ({ ...prevForm, [name]: value }));
    };


    const handleRegistration = (event: any) => {
        event.preventDefault();
        const { username, password } = form;

        const passwordError = validatePassword(form.password);
        setFormErrors(prevFormErrors => ({ ...prevFormErrors, password: passwordError }));

        if (passwordError != "") {
            toast.error("Password is not ok.");
        }
        else {
            toast.success("User created.");
            return axios.post(
                `${BACKEND_API_URL}/auth/register`,
                {
                    username,
                    password,
                }).then(
                    (data) => {
                        setIsSignedUpFailed(false);
                        setIsSuccessfull(true);
                        console.log(data);
                        setConfirmationToken(data.data.jwtToken);
                    },
                    (error) => {
                        setIsSignedUpFailed(true);
                    });

        }
    };

    const handleConfirmation = (event: any) => {
        event.preventDefault();
        const { username, password } = form;
        return axios.post(
            `${BACKEND_API_URL}/auth/register/confirm/${confirmationToken}`,
            {
                username,
                password,
            }).then(
                (data) => {
                    toast.success('Registration successful!');
                    navigate('/login')
                },
                (error) => {
                    toast.error('Registration failed.');
                    navigate('/')
                });
    };




    // return (
    //     <div className="container-fluid p-5 mb-5 d-flex align-items-center justify-content-center">
    //         <Card className="card card-container p-5 m-5 align-center" style={{ display: isSuccessful ? 'none' : 'block' }}>
    //             <CardHeader className="centered-header mb-4" title="Please fill in the information below" />
    //             <CardContent>
    //                 <form name="form" onSubmit={handleRegistration}>
    //                     <div className="form-group mb-2">
    //                         <FormControl fullWidth variant="outlined">
    //                             <TextField
    //                                 label="Username"
    //                                 name="username"
    //                                 value={form.username}
    //                                 onChange={handleFormChange}
    //                                 required
    //                                 inputProps={{ minLength: 8, maxLength: 20 }}
    //                                 error={isSignedUpFailed}
    //                                 helperText={
    //                                     isSignedUpFailed &&
    //                                     ((form.username.length < 8 && 'Must be at least 8 characters long!') ||
    //                                         (form.username.length > 20 && 'Must be at most 20 characters long!'))
    //                                 }
    //                             />
    //                         </FormControl>
    //                     </div>

    //                     <div className="form-group mb-2">
    //                         <FormControl fullWidth variant="outlined">
    //                             <TextField
    //                                 label="Password"
    //                                 name="password"
    //                                 value={form.password}
    //                                 onChange={handleFormChange}
    //                                 required
    //                                 type={hidePassword ? 'password' : 'text'}
    //                                 inputProps={{ minLength: 8, maxLength: 20 }}
    //                                 error={isSignedUpFailed}
    //                                 helperText={
    //                                     isSignedUpFailed &&
    //                                     ((form.password.length < 8 && 'Must be at least 8 characters long!') ||
    //                                         (form.password.length > 20 && 'Must be at most 20 characters long!'))
    //                                 }
    //                                 InputProps={{
    //                                     endAdornment: (
    //                                         <InputAdornment position="end">
    //                                             <IconButton onClick={() => setHidePassword(!hidePassword)} edge="end">
    //                                                 {hidePassword ? <VisibilityOff /> : <Visibility />}
    //                                             </IconButton>
    //                                         </InputAdornment>
    //                                     ),
    //                                 }}
    //                             />
    //                         </FormControl>
    //                     </div>
    //                     <div className="form-group mb-2">
    //                         <FormControl>
    //                             <Button type="submit" variant="contained" color="primary">
    //                                 Register
    //                             </Button>
    //                         </FormControl>
    //                     </div>
    //                 </form>
    //             </CardContent>
    //         </Card>

    //         {isSuccessful ? (
    //             <Card className="card card-container p-5 m-5 align-center">
    //                 <CardHeader className="centered-header mb-4">
    //                     <div className="d-flex flex-column">Registration was successful</div>
    //                 </CardHeader>
    //                 <CardContent className="alert alert-success p-4">
    //                     <p>The following token was generated for you:</p>

    //                     <FormControl fullWidth variant="outlined" className="mb-3">
    //                         <TextField
    //                             label="Confirmation token"
    //                             multiline
    //                             rows={1}
    //                             value={confirmationToken}
    //                             InputProps={{
    //                                 readOnly: true,
    //                                 className: 'token-textarea',
    //                             }}
    //                         />
    //                     </FormControl>

    //                     <p>Please press the button below to confirm the creation of the account.</p>

    //                     <Button variant="contained" color="primary" onClick={handleConfirmation} className="text-center">
    //                         Confirm account
    //                     </Button>
    //                 </CardContent>
    //             </Card>
    //         ) : (
    //             <div></div>
    //         )}

    //     </div>
    // );
    return (
        <Container maxWidth="sm" className="p-5 mb-5 d-flex align-items-center justify-content-center">
            <Typography variant="h3" className="mb-5" > Create new account</Typography>
            <Card className=" card-container " style={{ display: isSuccessful ? 'none' : 'block' }}>
                <CardHeader className="centered-header mb-4" title="Please fill in the information below" />
                <CardContent>
                    <form name="form" onSubmit={handleRegistration}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    label="Username"
                                    name="username"
                                    value={form.username}
                                    onChange={handleFormChange}
                                    required
                                    fullWidth
                                    variant="outlined"
                                    inputProps={{ minLength: 8, maxLength: 20 }}
                                    error={isSignedUpFailed}
                                    helperText={
                                        isSignedUpFailed &&
                                        ((form.username.length < 8 && 'Must be at least 8 characters long!') ||
                                            (form.username.length > 20 && 'Must be at most 20 characters long!'))
                                    }
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Password"
                                    name="password"
                                    value={form.password}
                                    onChange={handleFormChange}
                                    required
                                    fullWidth
                                    variant="outlined"
                                    type={hidePassword ? 'password' : 'text'}
                                    inputProps={{ minLength: 8, maxLength: 20 }}
                                    error={isSignedUpFailed}
                                    helperText={
                                        isSignedUpFailed &&
                                        ((form.password.length < 8 && 'Must be at least 8 characters long!') ||
                                            (form.password.length > 20 && 'Must be at most 20 characters long!'))
                                    }
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton onClick={() => setHidePassword(!hidePassword)} edge="end">
                                                    {hidePassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button type="submit" variant="contained" color="primary" fullWidth>
                                    Register
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </CardContent>
            </Card>

            {isSuccessful ? (
                <Card className="card card-container p-5 m-5 align-center">
                    <CardHeader className="centered-header mb-4">
                        <div className="d-flex flex-column">Registration was successful</div>
                    </CardHeader>
                    <CardContent className="alert alert-success p-4">
                        <p>The following token was generated for you:</p>

                        <TextField
                            label="Confirmation token"
                            multiline
                            rows={1}
                            value={confirmationToken}
                            fullWidth
                            variant="outlined"
                            InputProps={{
                                readOnly: true,
                                className: 'token-textarea',
                            }}
                        />

                        <p>Please press the button below to confirm the creation of the account.</p>

                        <Button variant="contained" color="primary" onClick={handleConfirmation} className="text-center">
                            Confirm account
                        </Button>
                    </CardContent>
                </Card>
            ) : null}
        </Container>
    );


}

