import { Autocomplete, Button, Card, CardActions, CardContent, IconButton, TextField } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Booking } from "../../models/Booking";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import { Airline } from "../../models/Airline";
import { BACKEND_API_URL } from "../../constants";
import { StorageService } from "../../services/StorageService";
import { toast } from "react-toastify";
import { Flight } from "../../models/Flight";
import { Passenger } from "../../models/Passenger";
export const BookingEdit = () => {
    const navigate = useNavigate();
    const { bookingId } = useParams();

    const [booking, setBooking] = useState<Booking>({
        flightId: 0,
        passengerId: 0,
        seatNumber: "",
        date: "",
        price: 0,
        username: StorageService.getUser().username
    });

    useEffect(() => {
        const fetchBooking = async () => {
            try {
                const response = await fetch(`${BACKEND_API_URL}/bookings/${bookingId}`);
                const booking = await response.json();
                setBooking(booking);
                setBooking({ ...booking, flightId: booking.flight?.id, passengerId: booking.passenger?.id });
            } catch (error: any) {
                toast.error(error.response.data);
                navigate("/bookings");

            }
        };
        fetchBooking();
    }, [bookingId]);

    const [flightSuggestions, setFlightSuggestions] = useState<Flight[]>([]);

    const handleFlightInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        try {
            const query = event.target.value;
            const response = await axios.get(`${BACKEND_API_URL}/flights/autocomplete?query=${query}&maxResults=5`);
            setFlightSuggestions(response.data);
        } catch (error: any) {
            toast.error(error.response.data);
        }
    };

    const handleFlightSelection = (event: React.ChangeEvent<{}>, value: Flight | null) => {
        if (value) {
            setBooking({ ...booking, flightId: value.id });
            // console.log(value.id);
            // console.log(flight);
        }
    };


    const [passenegrtSuggestions, setPassengerSuggestions] = useState<Passenger[]>([]);

    const handlePassengerInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        try {
            const query = event.target.value;
            const response = await axios.get(`${BACKEND_API_URL}/passengers/autocomplete?query=${query}&maxResults=5`);
            setPassengerSuggestions(response.data);
        } catch (error: any) {
            toast.error(error.response.data);
        }
    };

    const handlePassengerSelection = (event: React.ChangeEvent<{}>, value: Passenger | null) => {
        if (value) {
            setBooking({ ...booking, passengerId: value.id });
            // console.log(value.id);
            // console.log(flight);
        }
    };

    const updateBooking = async (event: { preventDefault: () => void }) => {
        event.preventDefault();
        const authToken = StorageService.getToken();
        const headers = { Authorization: authToken };
        try {
            await axios.put(`${BACKEND_API_URL}/bookings/${bookingId}`, booking, { headers });
            navigate("/bookings");
            toast.success("Booking updated successfully");
        } catch (error: any) {
            toast.error(error.response.data);
        }
    };

    return (
        <Container>
            <Card>
                <CardContent>
                    <IconButton component={Link} sx={{ mr: 3 }} to={`/bookings`}>
                        <ArrowBackIcon />
                    </IconButton>{" "}
                    <form onSubmit={updateBooking}>
                        <Autocomplete
                            id="flight-id"
                            options={flightSuggestions}
                            getOptionLabel={(flight) => `${flight.callSign} - ${flight.airline?.name} `}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label={booking.flight?.callSign + ' - ' + booking.flight?.airline?.name}
                                    variant="outlined"
                                    fullWidth
                                    sx={{ mb: 2 }}
                                    value={booking.flight?.callSign}
                                    onChange={handleFlightInputChange}
                                />
                            )}
                            onChange={handleFlightSelection}
                        />
                        <Autocomplete
                            id="passenger-id"
                            options={passenegrtSuggestions}
                            getOptionLabel={(passenger) => `${passenger.firstName} - ${passenger.lastName} - ${passenger.nationality}`}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label={booking.passenger?.firstName + ' - ' + booking.passenger?.lastName}
                                    variant="outlined"
                                    fullWidth
                                    sx={{ mb: 2 }}
                                    value={booking.passenger?.firstName}
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
                            value={booking.seatNumber}
                            onChange={(event) => setBooking({ ...booking, seatNumber: event.target.value })}
                        />
                        <TextField
                            id="date"
                            label="Date"
                            variant="outlined"
                            fullWidth
                            type="date"
                            sx={{ mb: 2 }}
                            value={booking.date}
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
                            type="number"
                            sx={{ mb: 2 }}
                            value={booking.price}
                            onChange={(event) => setBooking({ ...booking, price: Number(event.target.value) })}
                        />

                        <Button type="submit">Update Booking</Button>
                    </form>
                </CardContent>
                <CardActions></CardActions>
            </Card>
        </Container>
    );
};

