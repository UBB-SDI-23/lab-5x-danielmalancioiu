import { Card, CardActions, CardContent, Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";

import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Booking } from "../../models/Booking";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { BACKEND_API_URL } from "../../constants";
export const BookingDetails = () => {
	const { bookingId } = useParams();
	const [booking, setBooking] = useState<Booking>();

	useEffect(() => {
		const fetchBooking = async () => {
			const response = await fetch(`${BACKEND_API_URL}/bookings/${bookingId}`);
			const booking = await response.json();
			setBooking(booking);
		};
		fetchBooking();
	}, [bookingId]);

	return (
		// <Container>
		// 	<Card>
		// 		<CardContent>
		// 			<IconButton component={Link} sx={{ mr: 3 }} to={`/bookings`}>
		// 				<ArrowBackIcon />
		// 			</IconButton>{" "}
		// 			<h1>Booking Details</h1>
		// 			<p>Flight:</p>
		//             <ul>
		//                 <li>{booking?.flight?.callSign}</li>
		//                 <li>{booking?.flight?.airline?.name}</li>
		//                 <li>{booking?.flight?.capacity}</li>
		//                 <li>{booking?.flight?.departureAirport}</li>
		//                 <li>{booking?.flight?.arrivalAirport}</li>
		//             </ul>
		//             <p>Passenger:</p>
		//             <ul>
		//                 <li>{booking?.passenger?.firstName}</li>
		//                 <li>{booking?.passenger?.lastName}</li>
		//                 <li>{booking?.passenger?.dateOfBirth}</li>
		//                 <li>{booking?.passenger?.nationality}</li>
		//                 <li>{booking?.passenger?.passportNumber}</li>

		//             </ul>
		// 			<p>Price:{booking?.price}</p>
		// 			<p>Seat No. : {booking?.seatNumber}</p>
		//             <p>Date: {booking?.date}</p>

		// 		</CardContent>
		<Container>
			<Card>
				<CardContent>
					<IconButton component={Link} sx={{ mr: 3 }} to={`/bookings`}>
						<ArrowBackIcon />
					</IconButton>
					<Typography variant="h4">Booking Details</Typography>

					<Grid container sx={{ marginBottom: "2rem" }}>
						<Grid item xs={6}>
							<Typography variant="h6">Flight Details</Typography>
							<TableContainer component={Paper}>
								<Table>
									<TableBody>
										<TableRow>
											<TableCell component="th" scope="row">
												Call Sign
											</TableCell>
											<TableCell align="right">
												{booking?.flight?.callSign}
											</TableCell>
										</TableRow>
										<TableRow>
											<TableCell component="th" scope="row">
												Capacity
											</TableCell>
											<TableCell align="right">
												{booking?.flight?.capacity}
											</TableCell>
										</TableRow>
										<TableRow>
											<TableCell component="th" scope="row">
												Departure Airport
											</TableCell>
											<TableCell align="right">
												{booking?.flight?.departureAirport}
											</TableCell>
										</TableRow>
										<TableRow>
											<TableCell component="th" scope="row">
												Arrival Airport
											</TableCell>
											<TableCell align="right">
												{booking?.flight?.arrivalAirport}
											</TableCell>
										</TableRow>
										<TableRow>
											<TableCell component="th" scope="row">
												Airline Name
											</TableCell>
											<TableCell align="right">
												{booking?.flight?.airline?.name}
											</TableCell>
										</TableRow>
									</TableBody>
								</Table>
							</TableContainer>
						</Grid>

						<Grid item xs={6}>
							<Typography variant="h6">Passenger Details</Typography>
							<TableContainer component={Paper}>
								<Table>
									<TableBody>
										<TableRow>
											<TableCell component="th" scope="row">
												First Name
											</TableCell>
											<TableCell align="right">
												{booking?.passenger?.firstName}
											</TableCell>
										</TableRow>
										<TableRow>
											<TableCell component="th" scope="row">
												Last Name
											</TableCell>
											<TableCell align="right">
												{booking?.passenger?.lastName}
											</TableCell>
										</TableRow>
										<TableRow>
											<TableCell component="th" scope="row">
												Date of Birth
											</TableCell>
											<TableCell align="right">
												{booking?.passenger?.dateOfBirth}
											</TableCell>
										</TableRow>
										<TableRow>
											<TableCell component="th" scope="row">
												Nationality
											</TableCell>
											<TableCell align="right">
												{booking?.passenger?.nationality}
											</TableCell>
										</TableRow>
										<TableRow>
											<TableCell component="th" scope="row">
												Passport Number
											</TableCell>
											<TableCell align="right">
												{booking?.passenger?.passportNumber}
											</TableCell>
										</TableRow>
									</TableBody>
								</Table>
							</TableContainer>
						</Grid>
					</Grid>

					<Typography variant="h6">Booking Details</Typography>
					<TableContainer component={Paper} sx={{ marginBottom: "2rem" }}>
						<Table>
							<TableBody>
								<TableRow>
									<TableCell component="th" scope="row">
										Price
									</TableCell>
									<TableCell align="right">{booking?.price}</TableCell>
								</TableRow>
								<TableRow>
									<TableCell component="th" scope="row">
									Seat Number
								</TableCell>
								<TableCell align="right">
									{booking?.seatNumber}
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell component="th" scope="row">
									Date of Booking
								</TableCell>
								<TableCell align="right">
									{booking?.date}
								</TableCell>
							</TableRow>
						</TableBody>
					</Table>
				</TableContainer>
			</CardContent>

	<CardActions>
		<IconButton component={Link} sx={{ mr: 3 }} to={`/bookings/${bookingId}/edit`}>
			<EditIcon />
		</IconButton>
		<IconButton component={Link} sx={{ mr: 3 }} to={`/bookings/${bookingId}/delete`}>
			<DeleteForeverIcon sx={{ color: "red" }} />
		</IconButton>
	</CardActions>
			</Card >
		</Container >

	);
};