import { Button, Card, CardActions, CardContent, IconButton, TextField } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Booking } from "../../models/Booking";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";

export const BookingEdit = () => {
    const navigate = useNavigate();
    const { bookingId } = useParams();
	
    const [booking, setBooking] = useState<Booking>({ 
        flightId: 0,
        passengerId: 0,
        seatNumber: "",
        date: "",
        price: 0,
    });

	useEffect(() => {
		const fetchBooking = async () => {
			const response = await fetch(`http://localhost:8080/api/bookings/${bookingId}`);
			const booking = await response.json();
			setBooking(booking);
		};
		fetchBooking();
	}, [bookingId]);

    const updateBooking = async (event: { preventDefault: () => void }) => {
        event.preventDefault();
        try {
            await axios.put(`http://localhost:8080/api/bookings/${bookingId}`, booking);
            navigate("/bookings");
        } catch (error) {
            console.log(error);
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
                        <TextField
                            id="flight-id"
                            label="Flight ID"
                            variant="outlined"
                            type="number"
                            fullWidth
                            sx={{ mb: 2 }}
                            value={booking?.flight?.id}
                            onChange={(event) => setBooking({ ...booking, flightId: Number(event.target.value) })}
                        />
                        <TextField
                            id="passenger-id"
                            label="Passenger ID"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2 }}
                            value={booking?.passenger?.id}
                            onChange={(event) => setBooking({ ...booking, passengerId: Number(event.target.value) })}
                        />
                        <TextField
                            id="seat-number"
                            label="Seat Number"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2 }}
                            value={booking?.seatNumber}
                            onChange={(event) => setBooking({ ...booking, seatNumber: event.target.value })}
                        />
                        <TextField
                            id="date"
                            label="Date"
                            variant="outlined"
                            fullWidth
                            type="date"
                            sx={{ mb: 2 }}
                            value={booking?.date}
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
                            value={booking?.price}
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

