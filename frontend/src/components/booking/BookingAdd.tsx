import { Autocomplete, Button, Card, CardActions, CardContent, IconButton, TextField } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Booking } from "../../models/Booking";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import { BACKEND_API_URL } from "../../constants";
import { Flight } from "../../models/Flight";
import { Passenger } from "../../models/Passenger";
import { StorageService } from "../../services/StorageService";
import { toast } from "react-toastify";


export const BookingAdd = () => {
    const navigate = useNavigate();

    const [booking, setBooking] = useState<Booking>({
        flightId: 0,
        passengerId: 0,
        seatNumber: "",
        date: "",
        price: 0,
        username: StorageService.getUser().username
    });

    const [flightSuggestions, setFlightSuggestions] = useState<Flight[]>([]);

    const handleFlightInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        try {
            const query = event.target.value;
            const response = await axios.get(`${BACKEND_API_URL}/flights/autocomplete?query=${query}&maxResults=5`);
            setFlightSuggestions(response.data);
        } catch (error : any) {
            toast.error(error.response.data);
            console.log(error);
        }
    };

    const handleFlightSelection = (event: React.ChangeEvent<{}>, value: Flight | null) => {
        if (value) {
            setBooking({ ...booking, flightId: value.id });
        }
    };

    const [passengerSuggestions, setPassengerSuggestions] = useState<Passenger[]>([]);

    const handlePassengerInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        try {
            const query = event.target.value;
            const response = await axios.get(`${BACKEND_API_URL}/passengers/autocomplete?query=${query}&maxResults=5`);
            setPassengerSuggestions(response.data);
        } catch (error : any) {
            toast.error(error.response.data);
        }
    };

    const handlePassengerSelection = (event: React.ChangeEvent<{}>, value: Passenger | null) => {
        if (value) {
            setBooking({ ...booking, passengerId: value.id });
        }
    };

    const addBooking = async (event: { preventDefault: () => void }) => {
        event.preventDefault();
        const authToken = StorageService.getToken();
        const headers = { Authorization: authToken };
        try {

            await axios.post(`${BACKEND_API_URL}/bookings`, booking, { headers });
            toast.success("Booking added successfully");
            navigate("/bookings");
        } catch (error : any) {
            toast.error(error.response.data);
        }
    };

    return (
        <Container>
            <Card>
                <CardContent>
                    <h1>Add Booking</h1>
                    <IconButton component={Link} sx={{ mr: 3 }} to={`/bookings`}>
                        <ArrowBackIcon />
                    </IconButton>{" "}
                    <form onSubmit={addBooking}>
                        <Autocomplete
                            id="flight-id"
                            options={flightSuggestions}
                            getOptionLabel={(flight) => `${flight.callSign} - ${flight.airline?.name} - ${flight.departureAirport}`}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Flight"
                                    variant="outlined"
                                    fullWidth
                                    sx={{ mb: 2 }}
                                    onChange={handleFlightInputChange}
                                />
                            )}
                            onChange={handleFlightSelection}
                        />
                        <Autocomplete
                            id="passenger-id"
                            options={passengerSuggestions}
                            getOptionLabel={(passenger) => `${passenger.firstName} - ${passenger.lastName} - ${passenger.nationality}`}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Passenger"
                                    variant="outlined"
                                    fullWidth
                                    sx={{ mb: 2 }}
                                    onChange={handlePassengerInputChange}
                                />
                            )}
                            onChange={handlePassengerSelection}
                        />
                        <TextField
                            id="seat-number"
                            label="Seat Number"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2 }}
                            onChange={(event) => setBooking({ ...booking, seatNumber: event.target.value })}
                        />
                        <TextField
                            id="date"
                            label="Date"
                            variant="outlined"
                            fullWidth
                            type="date"
                            sx={{ mb: 2 }}
                            onChange={(event) => setBooking({ ...booking, date: event.target.value })}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            id="price"
                            label="Price"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2 }}
                            onChange={(event) => setBooking({ ...booking, price: Number(event.target.value) })}
                        />


                        <Button type="submit">Add Booking</Button>
                    </form>
                </CardContent>
                <CardActions></CardActions>
            </Card>
        </Container>
    );
};