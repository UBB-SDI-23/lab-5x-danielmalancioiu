import { Autocomplete, Box, Button, Card, CardActions, CardContent, Checkbox, CircularProgress, FormControlLabel, FormGroup, Grid, IconButton, Input, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
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
    const [entitiesPerPage, setEntitiesPerPage] = useState(10);

    const [insertingAirline, setInsertingAirline] = useState(false);
    const [deletingAirline, setDeletingAirline] = useState(false);
    const [insertingFlight, setInsertingFlight] = useState(false);
    const [deletingFlight, setDeletingFlight] = useState(false);
    const [insertingBooking, setInsertingBooking] = useState(false);
    const [deletingBooking, setDeletingBooking] = useState(false);
    const [insertingPassenger, setInsertingPassenger] = useState(false);
    const [deletingPassenger, setDeletingPassenger] = useState(false);

    useEffect(() => {
        
        const fetchRowsPerPage = async () => {
            const response_rows = await fetch(`${BACKEND_API_URL}/user/rows-per-page/${StorageService.getUser()?.id}`);
            const settings = await response_rows.json();

            setEntitiesPerPage(settings);
        }
        fetchRowsPerPage();
    }, []);

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

    const handleNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEntitiesPerPage(Number(event.target.value));

    };
    const handleRowsPerPageChange = async () => {

        try {
            const response = await axios.put(`${BACKEND_API_URL}/users/rows-per-page/${entitiesPerPage}`, null, { headers });
            console.log(response);
            toast.success(`${response.data} to ${entitiesPerPage}`);
            // toast.success(`Rows per page updated to ${entitiesPerPage}`);
        } catch (error: any) {
            toast.error(error.response.data);

        }

    };

    //-------------------------------------------------------------------------------------------------------------
    const [messages, setMessages] = useState<string[]>([]);

    const insertAirlines = async () => {

        const authToken = StorageService.getToken();
        const headers = { Authorization: authToken };
        console.log(headers);
        setMessages((prevMessages) => [...prevMessages, 'Inserting airlines...']);
        setInsertingAirline(true);
        try {
            const response = await axios.post(`${BACKEND_API_URL}/run-insert-airlines-script`, null, { headers });
            setMessages((prevMessages) => [...prevMessages, response.data.message]);
        } catch (error: any) {
            setMessages((prevMessages) => [...prevMessages, error.data.message]);

        }
        setInsertingAirline(false);
    };

    const insertFlights = async () => {
        const authToken = StorageService.getToken();
        const headers = { Authorization: authToken };
        console.log(headers);
        setMessages((prevMessages) => [...prevMessages, 'Inserting flights...']);
        setInsertingFlight(true);
        try {
            const response = await axios.post(`${BACKEND_API_URL}/run-insert-flights-script`, null, { headers });
            setMessages((prevMessages) => [...prevMessages, response.data.message]);
        } catch (error: any) {
            setMessages((prevMessages) => [...prevMessages, error.data.message]);
        }
        setInsertingFlight(false);
    };

    const insertPassengers = async () => {
        const authToken = StorageService.getToken();
        const headers = { Authorization: authToken };
        console.log(headers);
        setMessages((prevMessages) => [...prevMessages, 'Inserting passengers...']);
        setInsertingPassenger(true);
        try {
            const response = await axios.post(`${BACKEND_API_URL}/run-insert-passengers-script`, null, { headers });
            setMessages((prevMessages) => [...prevMessages, response.data.message]);
        } catch (error: any) {
            setMessages((prevMessages) => [...prevMessages, error.data.message]);
        }
        setInsertingPassenger(false);
    };

    const insertBookings = async () => {
        const authToken = StorageService.getToken();
        const headers = { Authorization: authToken };
        console.log(headers);
        setMessages((prevMessages) => [...prevMessages, 'Inserting bookings...']);
        setInsertingBooking(true);
        try {
            const response = await axios.post(`${BACKEND_API_URL}/run-insert-bookings-script`, null, { headers });
            setMessages((prevMessages) => [...prevMessages, response.data.message]);
        } catch (error: any) {
            setMessages((prevMessages) => [...prevMessages, error.data.message]);
        }
        setInsertingBooking(false);
    };

    const deleteAirlines = async () => {
        const authToken = StorageService.getToken();
        const headers = { Authorization: authToken };
        console.log(headers);
        setMessages((prevMessages) => [...prevMessages, 'Deleting airlines...']);
        setDeletingAirline(true);
        try {
            const response = await axios.post(`${BACKEND_API_URL}/run-delete-airlines-script`, null, { headers });
            setMessages((prevMessages) => [...prevMessages, response.data.message]);
        } catch (error: any) {
            setMessages((prevMessages) => [...prevMessages, error.data.message]);
        }
        setDeletingAirline(false);
    };

    const deleteFlights = async () => {
        const authToken = StorageService.getToken();
        const headers = { Authorization: authToken };
        console.log(headers);
        setMessages((prevMessages) => [...prevMessages, 'Deleting flights...']);
        setDeletingFlight(true);
        try {
            const response = await axios.post(`${BACKEND_API_URL}/run-delete-flights-script`, null, { headers });
            setMessages((prevMessages) => [...prevMessages, response.data.message]);
        } catch (error: any) {
            setMessages((prevMessages) => [...prevMessages, error.data.message]);
        }
        setDeletingFlight(false);
    };

    const deletePassengers = async () => {
        const authToken = StorageService.getToken();
        const headers = { Authorization: authToken };
        console.log(headers);
        setMessages((prevMessages) => [...prevMessages, 'Deleting passengers...']);
        setDeletingPassenger(true);
        try {
            const response = await axios.post(`${BACKEND_API_URL}/run-delete-passengers-script`, null, { headers });
            setMessages((prevMessages) => [...prevMessages, response.data.message]);
        } catch (error: any) {
            setMessages((prevMessages) => [...prevMessages, error.data.message]);
        }
        setDeletingPassenger(false);
    };

    const deleteBookings = async () => {
        const authToken = StorageService.getToken();
        const headers = { Authorization: authToken };
        console.log(headers);
        setMessages((prevMessages) => [...prevMessages, 'Deleting bookings...']);
        setDeletingBooking(true);
        try {
            const response = await axios.post(`${BACKEND_API_URL}/run-delete-bookings-script`, null, { headers });
            setMessages((prevMessages) => [...prevMessages, response.data.message]);
        } catch (error: any) {
            setMessages((prevMessages) => [...prevMessages, error.data.message]);
        }
        setDeletingBooking(false);
    };


    return (

        <Container >
            <Card>
                <CardContent sx={{ marginTop: "5rem" }}>

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

                <CardContent>
                    <Typography variant="h5">Edit all users entities per page number:</Typography>
                    <Box display="flex" alignItems="center">
                        <TextField
                            label="Entities per page"
                            type="number"
                            value={entitiesPerPage}
                            onChange={handleNumberChange}
                            margin="normal"
                            variant="outlined"
                            inputProps={{
                                min: 1,
                                step: 1,
                            }}
                        />
                        <Box marginLeft={2}>
                            <Button variant="contained" color="primary" onClick={handleRowsPerPageChange}>
                                Update
                            </Button>
                        </Box>
                    </Box>
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
                                disabled={insertingAirline}
                                fullWidth
                                startIcon={insertingAirline ? <CircularProgress size={20} color="inherit" /> : null}
                            >
                                Insert Airlines
                            </Button>
                        </Grid>
                        <Grid item xs={6}>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={deleteAirlines}
                                disabled={deletingAirline}
                                fullWidth
                                startIcon={deletingAirline ? <CircularProgress size={20} color="inherit" /> : null}
                            >
                                Delete Airlines
                            </Button>
                        </Grid>
                        <Grid item xs={6}>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={insertFlights}
                                disabled={insertingFlight}
                                fullWidth
                                startIcon={insertingFlight ? <CircularProgress size={20} color="inherit" /> : null}
                            >
                                Insert Flights
                            </Button>
                        </Grid>
                        <Grid item xs={6}>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={deleteFlights}
                                disabled={deletingFlight}
                                fullWidth
                                startIcon={deletingFlight ? <CircularProgress size={20} color="inherit" /> : null}
                            >
                                Delete Flights
                            </Button>
                        </Grid>
                        <Grid item xs={6}>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={insertPassengers}
                                disabled={insertingPassenger}
                                fullWidth
                                startIcon={insertingPassenger ? <CircularProgress size={20} color="inherit" /> : null}
                            >
                                Insert Passengers
                            </Button>
                        </Grid>
                        <Grid item xs={6}>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={deletePassengers}
                                disabled={deletingPassenger}
                                fullWidth
                                startIcon={deletingPassenger ? <CircularProgress size={20} color="inherit" /> : null}
                            >
                                Delete Passengers
                            </Button>
                        </Grid>
                        <Grid item xs={6}>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={insertBookings}
                                disabled={insertingBooking}
                                fullWidth
                                startIcon={insertingBooking ? <CircularProgress size={20} color="inherit" /> : null}
                            >
                                Insert Bookings
                            </Button>
                        </Grid>
                        <Grid item xs={6}>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={deleteBookings}
                                disabled={deletingBooking}
                                fullWidth
                                startIcon={deletingBooking ? <CircularProgress size={20} color="inherit" /> : null}
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