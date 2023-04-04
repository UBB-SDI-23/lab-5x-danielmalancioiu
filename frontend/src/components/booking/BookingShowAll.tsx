import {
	TableContainer,
	Paper,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	CircularProgress,
	Container,
	IconButton,
	Tooltip,
	Button,
	DialogActions,
} from "@mui/material";
import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Booking } from "../../models/Booking";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddIcon from "@mui/icons-material/Add";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { BookingAdd } from "./BookingAdd";
import { BACKEND_API_URL } from "../../constants";

export const AllBookings = () => {
	const [loading, setLoading] = useState(false);
	const [bookings, setBookings] = useState<Booking[]>([]);


	useEffect(() => {
		setLoading(true);
		fetch(`${BACKEND_API_URL}/bookings`)
			.then((response) => response.json())
			.then((data) => {
				setBookings(data);
				setLoading(false);
			});
	}, []);

	return (
		<Container>
			<h1 style={{ margin: "100px 0 30px 0" }}>All bookings</h1>


			{loading && <CircularProgress />}
			{!loading && bookings.length === 0 && <p>No bookings found</p>}
			{!loading && (
				<IconButton component={Link} sx={{ mr: 3 }} to={`/bookings/add`}>
					<Tooltip title="Add a new booking" arrow>
						<AddIcon color="primary" />
					</Tooltip>
				</IconButton>
			)}
			{!loading && bookings.length > 0 && (
				<TableContainer component={Paper}>
					<Table sx={{ minWidth: 650 }} aria-label="simple table">
						<TableHead>
							<TableRow>
								<TableCell>#</TableCell>
								<TableCell align="center">Flight</TableCell>
								<TableCell align="center">Passenger Name</TableCell>
								<TableCell align="center">Seat Number</TableCell>
								<TableCell align="center">Price</TableCell>
								<TableCell align="center">Date</TableCell>
								<TableCell align="center">Operations</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{bookings.map((booking, index) => (
								<TableRow key={booking.id}>
									<TableCell component="th" scope="row">
										{index + 1}
									</TableCell>
									<TableCell align="center">
										<Link to={`/flights/${booking.flight?.id}/details`} title="View flight details">
											{booking.flight?.callSign}
										</Link>
									</TableCell>
									<TableCell align="center">
										<Link to={`/passengers/${booking.passenger?.id}/details`} title="View passenger details">
											{booking.passenger?.firstName}
										</Link>
									</TableCell>
									<TableCell align="center">{booking.seatNumber}</TableCell>
									<TableCell align="center">{booking.price}</TableCell>
									<TableCell align="center">{booking.date}</TableCell>
									<TableCell align="center">
										<IconButton
											component={Link}
											sx={{ mr: 3 }}
											to={`/bookings/${booking.id}/details`}>
											<Tooltip title="View bookings details" arrow>
												<ReadMoreIcon color="primary" />
											</Tooltip>
										</IconButton>

										<IconButton component={Link} sx={{ mr: 3 }} to={`/bookings/${booking.id}/edit`}>
											<EditIcon />
										</IconButton>

										<IconButton component={Link} sx={{ mr: 3 }} to={`/bookings/${booking.id}/delete`} >
											<DeleteForeverIcon sx={{ color: "red" }} />
										</IconButton>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			)}
		</Container>
	);
};
