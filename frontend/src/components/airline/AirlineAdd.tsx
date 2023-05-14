import { Button, Card, CardActions, CardContent, IconButton, TextField } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Booking } from "../../models/Booking";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import { Flight } from "../../models/Flight";
import { Airline } from "../../models/Airline";
import { BACKEND_API_URL } from "../../constants";
import { ToastContainer, toast } from "react-toastify";
import { useAuth } from "../../services/AuthContext";
import { StorageService } from "../../services/StorageService";


export const AirlineAdd = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');

    const [airline, setAirline] = useState<Airline>({
        name: "",
        iataCode: "",
        fleetSize: 0,
        website: "",
        country: "",
        username: StorageService.getUser().username
    });


    const addAirline = async (event: { preventDefault: () => void }) => {
        event.preventDefault();
        const authToken = StorageService.getToken();
        const headers = { Authorization: authToken };
        try {
            //setAirline({ ...airline, username: user })
            await axios.post(`${BACKEND_API_URL}/airlines`, airline, { headers });
            toast.success("Airline added successfully");
            navigate("/airlines");
        } catch (error: any) {
            toast.error(error.response.data);
            //console.log(error);

        }
    };

    return (
        <Container>
            <Card>
                <CardContent>
                    <h1>Add Airline</h1>
                    <IconButton component={Link} sx={{ mr: 3 }} to={`/airlines`}>
                        <ArrowBackIcon />
                    </IconButton>{" "}
                    <form onSubmit={addAirline}>
                        <TextField
                            id="name"
                            label="Name"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2 }}
                            required
                            error={airline.name.trim() === ''}
                            helperText={airline.name.trim() === '' ? 'Name is required' : ''}
                            onChange={(event) => {
                                const target = event.target as HTMLInputElement;
                                target.setCustomValidity(target.value.trim() === '' ? 'Name is required' : '');
                                setAirline({ ...airline, name: target.value })
                            }}
                            onInvalid={(event) => {
                                const target = event.target as HTMLInputElement;
                                target.setCustomValidity('The name cannot be empty')
                            }}
                            onInput={(event) => {
                                const target = event.target as HTMLInputElement;
                                target.setCustomValidity('')
                            }}
                        />



                        <TextField
                            id="iata-code"
                            label="Iata Code"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2 }}
                            required
                            error={airline.iataCode.trim() === ''}
                            helperText={airline.iataCode.trim() === '' ? 'IataCode is required' : ''}
                            onChange={(event) => {
                                const target = event.target as HTMLInputElement;
                                target.setCustomValidity(target.value.trim() === '' ? 'IataCode is required' : '');
                                setAirline({ ...airline, iataCode: target.value })
                            }}
                            onInvalid={(event) => {
                                const target = event.target as HTMLInputElement;
                                target.setCustomValidity('The iata code cannot be empty')
                            }}
                            onInput={(event) => {
                                const target = event.target as HTMLInputElement;
                                target.setCustomValidity('')
                            }}
                        />
                        <TextField
                            id="fleet-size"
                            label="Fleet Size"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2 }}
                            required
                            error={airline.fleetSize < 0}
                            helperText={airline.fleetSize < 0 ? 'Fleet size must be positive' : ''}
                            onChange={(event) => {
                                const target = event.target as HTMLInputElement;
                                target.setCustomValidity(target.value.trim().startsWith('-') ? 'Fleet size must be positive' : '');
                                setAirline({ ...airline, fleetSize: Number(event.target.value) })
                            }}
                            onInvalid={(event) => {
                                const target = event.target as HTMLInputElement;
                                target.setCustomValidity('Fleet size must be positive')
                            }}
                            onInput={(event) => {
                                const target = event.target as HTMLInputElement;
                                target.setCustomValidity('')
                            }}
                        />




                        <TextField
                            id="website"
                            label="Website"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2 }}
                            required
                            error={airline.website.trim() === ''}
                            helperText={airline.website.trim() === '' ? 'Website is required' : ''}
                            onChange={(event) => {
                                const target = event.target as HTMLInputElement;
                                target.setCustomValidity(target.value.trim() === '' ? 'Website is required' : '');
                                setAirline({ ...airline, website: target.value })
                            }}
                            onInvalid={(event) => {
                                const target = event.target as HTMLInputElement;
                                target.setCustomValidity('The website cannot be empty')
                            }}
                            onInput={(event) => {
                                const target = event.target as HTMLInputElement;
                                target.setCustomValidity('')
                            }}
                        />
                        <TextField
                            id="country"
                            label="Country"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2 }}
                            required
                            error={airline.country.trim() === ''}
                            helperText={airline.country.trim() === '' ? 'Country is required' : ''}
                            onChange={(event) => {
                                const target = event.target as HTMLInputElement;
                                target.setCustomValidity(target.value.trim() === '' ? 'Country is required' : '');
                                setAirline({ ...airline, country: target.value })
                            }}
                            onInvalid={(event) => {
                                const target = event.target as HTMLInputElement;
                                target.setCustomValidity('The country cannot be empty')
                            }}
                            onInput={(event) => {
                                const target = event.target as HTMLInputElement;
                                target.setCustomValidity('')
                            }}
                        />


                        <Button type="submit">Add Airline</Button>
                    </form>
                    <ToastContainer />
                </CardContent>
                <CardActions></CardActions>
            </Card>
        </Container>

    );
};