import { Autocomplete, Box, Button, Card, CardActions, CardContent, Checkbox, CircularProgress, FormControlLabel, FormGroup, Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Booking } from "../../models/Booking";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Flight } from "../../models/Flight";
import { Airline } from "../../models/Airline";
import { AirlineCapacity } from "../../models/AirlineCapacity";
import { Passenger } from "../../models/Passenger";
import { ArrowBack } from "@mui/icons-material";

import { BACKEND_API_URL } from "../../constants";
import { UserProfile } from "../../models/UserProfile";
import { User } from "../../models/User";
import { StorageService } from "../../services/StorageService";
import { toast } from "react-toastify";
import { UserSettings } from "../../models/UserSettings";
import axios from "axios";
import { UserAdminPage } from "../../models/UserAdminPage";
import _, { set } from 'lodash';
export const AdminBoard = () => {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [currentUser, setCurrentUser] = useState<User>();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User>();
    const [userSuggestions, setUserSuggestions] = useState<User[]>([]);
    const [roles, setRoles] = useState({
        user: false,
        moderator: false,
        admin: false
    });



    const handleUserInputChange = _.debounce(async (event: React.ChangeEvent<HTMLInputElement>) => {
        try {
            const query = event.target.value;
            const maxResults = 5;
            console.log(`${BACKEND_API_URL}/user/autocomplete?query=${query}&maxResults=${maxResults}`);

            const response = await axios.get(`${BACKEND_API_URL}/user/autocomplete?query=${query}&maxResults=${maxResults}`);
            setUserSuggestions(response.data);
        } catch (error: any) {
            toast.error(error.response.data);
        }
    }, 500);

    const handleUserSelection = (event: React.ChangeEvent<{}>, value: User | null) => {
        if (value) {
            setSelectedUser(value);
            setShowEdit(true);
            setRoles({
                user: value.roles.some((role: any) => role.name === "ROLE_USER"),
                moderator: value.roles.some((role: any) => role.name === "ROLE_MODERATOR"),
                admin: value.roles.some((role: any) => role.name === "ROLE_ADMIN")
            });
        } else {
            setSelectedUser(undefined);
            setShowEdit(false);
            setRoles({
                user: false,
                moderator: false,
                admin: false
            });
        }


    };

    const handleRoleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRoles({ ...roles, [event.target.name]: event.target.checked });
    };
    const authToken = StorageService.getToken();
    const headers = { Authorization: authToken };
    const onUpdateRoles = async (roles: any) => {

        console.log(roles);
        const isUser = roles.user;
        const isModerator = roles.moderator
        const isAdmin = roles.admin

        const sendRoles = { isUser, isModerator, isAdmin }

        if (selectedUser === undefined) {
            toast.error("Please select a user");
            return;
        }
        try {
            await axios.put(`${BACKEND_API_URL}/user-roles/${selectedUser?.id}`, sendRoles, { headers });
            toast.success("User roles updated successfully");
            setSelectedUser(undefined);
            setShowEdit(false);
            setRoles({
                user: false,
                moderator: false,
                admin: false
            });
            // await new Promise((resolve) => setTimeout(resolve, 3000));
            // window.location.reload();

        } catch (error: any) {
            toast.error(error.response.data);
        }
    };

    const [messages, setMessages] = useState<string[]>([]);

    const insertAirlines = async () => {
        const authToken = StorageService.getToken();
        const headers = { Authorization: authToken };
        console.log(headers);
        setMessages((prevMessages) => [...prevMessages, 'Inserting airlines...']);
        setLoading(true);
        try {
            const response = await axios.post(`${BACKEND_API_URL}/run-insert-airlines-script`, null, { headers });
            setMessages((prevMessages) => [...prevMessages, response.data.message]);
        } catch (error: any) {
            setMessages((prevMessages) => [...prevMessages, error.data.message]);
        
        }
        setLoading(false);
    };

    const insertFlights = async () => {
        const authToken = StorageService.getToken();
        const headers = { Authorization: authToken };
        console.log(headers);
        setMessages((prevMessages) => [...prevMessages, 'Inserting flights...']);
        setLoading(true);
        try {
            const response = await axios.post(`${BACKEND_API_URL}/run-insert-flights-script`, null, { headers });
            setMessages((prevMessages) => [...prevMessages, response.data.message]);
        } catch (error: any) {
            setMessages((prevMessages) => [...prevMessages, error.data.message]);
        }
        setLoading(false);
    };

    const insertPassengers = async () => {
        const authToken = StorageService.getToken();
        const headers = { Authorization: authToken };
        console.log(headers);
        setMessages((prevMessages) => [...prevMessages, 'Inserting passengers...']);
        setLoading(true);
        try {
            const response = await axios.post(`${BACKEND_API_URL}/run-insert-passengers-script`, null, { headers });
            setMessages((prevMessages) => [...prevMessages, response.data.message]);
        } catch (error: any) {
            setMessages((prevMessages) => [...prevMessages, error.data.message]);
        }
        setLoading(false);
    };

    const insertBookings = async () => {
        const authToken = StorageService.getToken();
        const headers = { Authorization: authToken };
        console.log(headers);
        setMessages((prevMessages) => [...prevMessages, 'Inserting bookings...']);
        setLoading(true);
        try {
            const response = await axios.post(`${BACKEND_API_URL}/run-insert-bookings-script`, null, { headers });
            setMessages((prevMessages) => [...prevMessages, response.data.message]);
        } catch (error: any) {
            setMessages((prevMessages) => [...prevMessages, error.data.message]);
        }
        setLoading(false);
    };

    const deleteAirlines = async () => {
        const authToken = StorageService.getToken();
        const headers = { Authorization: authToken };
        console.log(headers);
        setMessages((prevMessages) => [...prevMessages, 'Deleting airlines...']);
        setLoading(true);
        try {
            const response = await axios.post(`${BACKEND_API_URL}/run-delete-airlines-script`, null, { headers });
            setMessages((prevMessages) => [...prevMessages, response.data.message]);
        } catch (error: any) {
            setMessages((prevMessages) => [...prevMessages, error.data.message]);
        }
        setLoading(false);
    };

    const deleteFlights = async () => {
        const authToken = StorageService.getToken();
        const headers = { Authorization: authToken };
        console.log(headers);
        setMessages((prevMessages) => [...prevMessages, 'Deleting flights...']);
        setLoading(true);
        try {
            const response = await axios.post(`${BACKEND_API_URL}/run-delete-flights-script`, null, { headers });
            setMessages((prevMessages) => [...prevMessages, response.data.message]);
        } catch (error: any) {
            setMessages((prevMessages) => [...prevMessages, error.data.message]);
        }
        setLoading(false);
    };

    const deletePassengers = async () => {
        const authToken = StorageService.getToken();
        const headers = { Authorization: authToken };
        console.log(headers);
        setMessages((prevMessages) => [...prevMessages, 'Deleting passengers...']);
        setLoading(true);
        try {
            const response = await axios.post(`${BACKEND_API_URL}/run-delete-passengers-script`, null, { headers });
            setMessages((prevMessages) => [...prevMessages, response.data.message]);
        } catch (error: any) {
            setMessages((prevMessages) => [...prevMessages, error.data.message]);
        }
        setLoading(false);
    };

    const deleteBookings = async () => {
        const authToken = StorageService.getToken();
        const headers = { Authorization: authToken };
        console.log(headers);
        setMessages((prevMessages) => [...prevMessages, 'Deleting bookings...']);
        setLoading(true);
        try {
            const response = await axios.post(`${BACKEND_API_URL}/run-delete-bookings-script`, null, { headers });
            setMessages((prevMessages) => [...prevMessages, response.data.message]);
        } catch (error: any) {
            setMessages((prevMessages) => [...prevMessages, error.data.message]);
        }
        setLoading(false);
    };


    return (

        <Container>
            <Card>
                <CardContent>
                
                    <Typography variant="h4">Admin Board</Typography>
                    <Typography variant="h6">Search for a user</Typography>
                    <Autocomplete
                        id="user-autocomplete"
                        options={userSuggestions}
                        getOptionLabel={(user) => `${user.username} - ${user.roles.map((role: { name: any; }) => role.name).join(', ')}`}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="User"
                                variant="outlined"
                                fullWidth
                                sx={{ mb: 2 }}
                                onChange={handleUserInputChange}
                            />
                        )}
                        onChange={handleUserSelection}
                    />
                </CardContent>
                <CardContent>

                    <Typography variant="h5"> Edit user {selectedUser?.username} roles: </Typography>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={roles.user}
                                onChange={handleRoleChange}
                                name="user"
                            />
                        }
                        label="User"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={roles.moderator}
                                onChange={handleRoleChange}
                                name="moderator"
                            />
                        }
                        label="Moderator"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={roles.admin}
                                onChange={handleRoleChange}
                                name="admin"
                            />
                        }
                        label="Admin"
                    />

                    <Button
                        variant="contained"
                        color="primary"

                        onClick={() => onUpdateRoles(roles)}
                    >
                        Update roles
                    </Button>
                </CardContent>
            </Card>
            <Card>
                <CardContent>
                    <Typography variant="h4">Database</Typography>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={insertAirlines}
                        disabled={loading}
                        fullWidth
                        startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
                    >
                        Insert Airlines
                    </Button>
                </Grid>
                <Grid item xs={6}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={deleteAirlines}
                        disabled={loading}
                        fullWidth
                        startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
                    >
                        Delete Airlines
                    </Button>
                </Grid>
                <Grid item xs={6}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={insertFlights}
                        fullWidth
                    >
                        Insert Flights
                    </Button>
                </Grid>
                <Grid item xs={6}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={deleteFlights}
                        fullWidth
                    >
                        Delete Flights
                    </Button>
                </Grid>
                <Grid item xs={6}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={insertPassengers}
                        fullWidth
                    >
                        Insert Passengers
                    </Button>
                </Grid>
                <Grid item xs={6}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={deletePassengers}
                        fullWidth
                    >
                        Delete Passengers
                    </Button>
                </Grid>
                <Grid item xs={6}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={insertBookings}
                        fullWidth
                    >
                        Insert Bookings
                    </Button>
                </Grid>
                <Grid item xs={6}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={deleteBookings}
                        fullWidth
                    >
                        Delete Bookings
                    </Button>
                </Grid>
            </Grid>
                </CardContent>
            </Card>

            <Box display="flex" flexDirection="row" alignItems="center" mb={2}>
                <Typography variant="h5" mr={2}>
                    Messages:
                </Typography>
                <Button variant="outlined" color="secondary" onClick={() => setMessages([''])}>
                    Clear
                </Button>
            </Box>
            <Typography variant="body1" component="div">
                {messages.map((message, index) => (
                    <Box key={index} mb={1}>
                        {message}
                    </Box>
                ))}
            </Typography>


        </Container>

    );
};