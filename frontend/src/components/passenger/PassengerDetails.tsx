import { Card, CardActions, CardContent, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
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
import { toast } from "react-toastify";
import { StorageService } from "../../services/StorageService";
export const PassengerDetails = () => {
    const { passengerId } = useParams();
    const [passenger, setPassenger] = useState<Passenger>();
    const [passengerCapacity, setPassengerCapacity] = useState<Passenger>();

    useEffect(() => {
        const fetchPassenger = async () => {
            try{
            const response = await fetch(`${BACKEND_API_URL}/passengers/${passengerId}`);
            const response1 = await fetch(`${BACKEND_API_URL}/passengers/${passengerId}/averagePrice`);
            const passenger = await response.json();
            const passengerCapacity = await response1.json();
            console.log(passenger);
            setPassenger(passenger);
            setPassengerCapacity(passengerCapacity);
            } catch (error: any) {
                toast.error(error.response.data);
            }
        };
        fetchPassenger();
    }, [passengerId]);

    return (
        <Container sx={{ marginTop: "2rem" }}>
            <Card sx={{ maxWidth: "800px", margin: "auto" }}>
                <CardContent>
                    <IconButton component={Link} sx={{ mr: 3 }} to={`/passengers`}>
                        <ArrowBack />
                    </IconButton>
                    <Typography variant="h4" gutterBottom>
                        Passenger Details
                    </Typography>
                    <TableContainer component={Paper} sx={{ marginBottom: "2rem" }}>
                        <Table>
                            <TableBody>
                                <TableRow>
                                    <TableCell component="th" scope="row">
                                        First Name
                                    </TableCell>
                                    <TableCell align="right">
                                        {passenger?.firstName}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th" scope="row">
                                        Last Name
                                    </TableCell>
                                    <TableCell align="right">
                                        {passenger?.lastName}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th" scope="row">
                                        Date of Birth
                                    </TableCell>
                                    <TableCell align="right">
                                        {passenger?.dateOfBirth}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th" scope="row">
                                        Nationality
                                    </TableCell>
                                    <TableCell align="right">
                                        {passenger?.nationality}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th" scope="row">
                                        Passport Number
                                    </TableCell>
                                    <TableCell align="right">
                                        {passenger?.passportNumber}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th" scope="row">
                                        Average Price
                                    </TableCell>
                                    <TableCell align="right">
                                        {passengerCapacity?.averagePrice?.toFixed(2)}
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Typography variant="h5" gutterBottom>
                        Bookings
                    </Typography>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    {/* <TableCell>Flight</TableCell> */}
                                    <TableCell>Date</TableCell>
                                    <TableCell>Seat No.</TableCell>
                                    <TableCell>Price</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {passenger?.bookings?.map((booking) => (
                                    <TableRow key={booking.id}>
                                        {/* <TableCell>{booking.flight?.callSign}</TableCell> */}
                                        <TableCell>{booking.date}</TableCell>
                                        <TableCell>{booking.seatNumber}</TableCell>
                                        <TableCell>{booking.price.toFixed(2)}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </CardContent>
                {StorageService.isLoggedIn() && (
                <CardActions sx={{ borderTop: "1px solid #E0E0E0", justifyContent: "center" }}>
                    <IconButton component={Link} sx={{ mr: 3, fontSize: "16px", color: "#444", borderRadius: "12px", "&:hover": { backgroundColor: "#E0E0E0" } }} to={`/passengers/${passengerId}/edit`} >
                        <EditIcon sx={{ fontSize: "20px", mr: "8px" }} /> Edit Profile
                    </IconButton>

                    <IconButton component={Link} sx={{ fontSize: "16px", borderRadius: "12px", "&:hover": { backgroundColor: "#E0E0E0" } }} to={`/passengers/${passengerId}/delete`} >
                        <DeleteForeverIcon sx={{ fontSize: "20px", mr: "8px", color: "#f44336" }} /> Delete Account
                    </IconButton>
                </CardActions>
                )}
            </Card>
        </Container >
    );
};