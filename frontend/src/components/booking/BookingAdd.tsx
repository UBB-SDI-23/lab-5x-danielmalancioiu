import { Button, Card, CardActions, CardContent, IconButton, TextField } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Booking } from "../../models/Booking";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import { BACKEND_API_URL } from "../../constants";


export const BookingAdd = () => {
    const navigate = useNavigate();

    const [booking, setBooking] = useState<Booking>({ 
        flightId: 0,
        passengerId: 0,
        seatNumber: "",
        date: "",
        price: 0,
    });

    const addBooking = async (event: { preventDefault: () => void }) => {
        event.preventDefault();
        try {

            await axios.post(`${BACKEND_API_URL}/bookings`, booking);
            navigate("/bookings");
        } catch (error) {
            console.log(error);
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
                        <TextField
                            id="flight-id"
                            label="Flight ID"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2 }}
                            onChange={(event) => setBooking({ ...booking, flightId: Number(event.target.value) })}
                        />
                        <TextField
                            id="passenger-id"
                            label="Passenger ID"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2 }}
                            onChange={(event) => setBooking({ ...booking, passengerId: Number(event.target.value) })}
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