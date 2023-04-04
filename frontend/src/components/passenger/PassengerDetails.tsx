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
export const PassengerDetails = () => {
    const { passengerId } = useParams();
    const [passenger, setPassenger] = useState<Passenger>();
    const [passengerCapacity, setPassengerCapacity] = useState<Passenger>();

    useEffect(() => {
        const fetchPassenger = async () => {
            const response = await fetch(`${BACKEND_API_URL}/passengers/${passengerId}`);
            const response1 = await fetch(`${BACKEND_API_URL}/passengers/${passengerId}/averagePrice`);
            const passenger = await response.json();
            const passengerCapacity = await response1.json();

            setPassenger(passenger);
            setPassengerCapacity(passengerCapacity);
        };
        fetchPassenger();
    }, [passengerId]);

    return (
        // <Container>
        //     <Card>
        //         <CardContent>
        //             <IconButton component={Link} sx={{ mr: 3 }} to={`/passengers`}>
        //                 <ArrowBackIcon />
        //             </IconButton>{" "}
        //             <div>
        //             <h1>Passenger Details</h1>
        //             <p>First name : {passenger?.firstName}</p>
        //             <p>Last name : {passenger?.lastName}</p>
        //             <p>Date Of Birth : {passenger?.dateOfBirth}</p>
        //             <p>Nationality : {passenger?.nationality}</p>
        //             <p>Passport Number : {passenger?.passportNumber}</p>
        //             <p>Average price: {passengerCapacity?.averagePrice?.toFixed(2)}</p>
        //             <h2>Bookings :</h2>
        //             <table style={{  textAlign: 'center' }}>
        //                 <thead>
        //                     <tr>
        //                         <th style={{ padding: '0.5rem', textAlign: 'center' }}>Flight</th>
        //                         <th style={{ padding: '0.5rem', textAlign: 'center' }}>Date</th>
        //                         <th style={{ padding: '0.5rem', textAlign: 'center' }}>Seat No.</th>
        //                         <th style={{ padding: '0.5rem', textAlign: 'center' }}>Price</th>
        //                     </tr>
        //                 </thead>
        //                 <tbody>
        //                     {passenger?.bookings?.map((booking) => (
        //                         <tr key={booking.id}>
        //                             <td style={{ padding: '0.5rem', textAlign: 'center' }}>{booking.flight?.callSign}</td>
        //                             <td style={{ padding: '0.5rem', textAlign: 'center' }}>{booking.date}</td>
        //                             <td style={{ padding: '0.5rem', textAlign: 'center' }}>{booking.seatNumber}</td>
        //                             <td style={{ padding: '0.5rem', textAlign: 'center' }}>{booking.price.toFixed(2)}</td>
        //                         </tr>
        //                     ))}
        //                 </tbody>
        //             </table>
        //             </div>




        //         </CardContent>
        //         <CardActions>
        //             <IconButton component={Link} sx={{ mr: 3 }} to={`/passengers/${passengerId}/edit`}>
        //                 <EditIcon />
        //             </IconButton>

        //             <IconButton component={Link} sx={{ mr: 3 }} to={`/passengers/${passengerId}/delete`}>
        //                 <DeleteForeverIcon sx={{ color: "red" }} />
        //             </IconButton>
        //         </CardActions>
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
                                    <TableCell>Flight</TableCell>
                                    <TableCell>Date</TableCell>
                                    <TableCell>Seat No.</TableCell>
                                    <TableCell>Price</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {passenger?.bookings?.map((booking) => (
                                    <TableRow key={booking.id}>
                                        <TableCell>{booking.flight?.callSign}</TableCell>
                                        <TableCell>{booking.date}</TableCell>
                                        <TableCell>{booking.seatNumber}</TableCell>
                                        <TableCell>{booking.price.toFixed(2)}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </CardContent>
                <CardActions sx={{ borderTop: "1px solid #E0E0E0", justifyContent: "center" }}>
                    <IconButton component={Link} sx={{ mr: 3, fontSize: "16px", color: "#444", borderRadius: "12px", "&:hover": { backgroundColor: "#E0E0E0" } }} to={`/passengers/${passengerId}/edit`} >
                        <EditIcon sx={{ fontSize: "20px", mr: "8px" }} /> Edit Profile
                    </IconButton>

                    <IconButton component={Link} sx={{ fontSize: "16px", borderRadius: "12px", "&:hover": { backgroundColor: "#E0E0E0" } }} to={`/passengers/${passengerId}/delete`} >
                        <DeleteForeverIcon sx={{ fontSize: "20px", mr: "8px", color: "#f44336" }} /> Delete Account
                    </IconButton>


                </CardActions>
            </Card>
        </Container >
    );
};