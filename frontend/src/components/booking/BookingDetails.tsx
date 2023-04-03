import { Card, CardActions, CardContent, IconButton } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Booking } from "../../models/Booking";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export const BookingDetails = () => {
	const { bookingId } = useParams();
	const [booking, setBooking] = useState<Booking>();

	useEffect(() => {
		const fetchBooking = async () => {
			const response = await fetch(`http://localhost:8080/api/bookings/${bookingId}`);
			const booking = await response.json();
			setBooking(booking);
		};
		fetchBooking();
	}, [bookingId]);

	return (
		<Container>
			<Card>
				<CardContent>
					<IconButton component={Link} sx={{ mr: 3 }} to={`/bookings`}>
						<ArrowBackIcon />
					</IconButton>{" "}
					<h1>Booking Details</h1>
					<p>Flight:</p>
                    <ul>
                        <li>{booking?.flight?.callSign}</li>
                        <li>{booking?.flight?.airline?.name}</li>
                        <li>{booking?.flight?.capacity}</li>
                        <li>{booking?.flight?.departureAirport}</li>
                        <li>{booking?.flight?.arrivalAirport}</li>
                    </ul>
                    <p>Passenger:</p>
                    <ul>
                        <li>{booking?.passenger?.firstName}</li>
                        <li>{booking?.passenger?.lastName}</li>
                        <li>{booking?.passenger?.dateOfBirth}</li>
                        <li>{booking?.passenger?.nationality}</li>
                        <li>{booking?.passenger?.passportNumber}</li>
   
                    </ul>
					<p>Price:{booking?.price}</p>
					<p>Seat No. : {booking?.seatNumber}</p>
                    <p>Date: {booking?.date}</p>
				
				</CardContent>
				<CardActions>
					<IconButton component={Link} sx={{ mr: 3 }} to={`/bookings/${bookingId}/edit`}>
						<EditIcon />
					</IconButton>

					<IconButton component={Link} sx={{ mr: 3 }} to={`/bookings/${bookingId}/delete`}>
						<DeleteForeverIcon sx={{ color: "red" }} />
					</IconButton>
				</CardActions>
			</Card>
		</Container>
	);
};