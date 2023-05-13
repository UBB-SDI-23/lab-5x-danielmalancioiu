import { Button, Card, CardActions, CardContent, IconButton, TextField } from "@mui/material";
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
            } catch (error: any) {
                toast.error(error.response.data);

            }
        };
        fetchBooking();
    }, [bookingId]);

    const updateBooking = async (event: { preventDefault: () => void }) => {
        event.preventDefault();
        try {
            await axios.put(`${BACKEND_API_URL}/bookings/${bookingId}`, booking);
            navigate("/bookings");
            toast.success("Booking updated successfully");  
        } catch (error: any) {
            console.log(error);
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
                        <TextField
                            id="flight-id"
                            label="Flight ID"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2 }}
                            value={booking.flight?.id}
                            onChange={(event) => setBooking({ ...booking, flightId: Number(event.target.value) })}
                        />
                        <TextField
                            id="passenger-id"
                            label="Passenger ID"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2 }}
                            value={booking.passenger?.id}
                            onChange={(event) => setBooking({ ...booking, passengerId: Number(event.target.value) })}
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

