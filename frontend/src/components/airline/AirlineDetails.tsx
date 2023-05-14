// import { Box, Button, Card, CardActions, CardContent, Grid, IconButton, Typography } from "@mui/material";
// import { Container } from "@mui/system";
// import { useEffect, useState } from "react";
// import { Link, useParams } from "react-router-dom";
// import { Booking } from "../../models/Booking";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import { Flight } from "../../models/Flight";
// import { Airline } from "../../models/Airline";
// import { AirlineCapacity } from "../../models/AirlineCapacity";
// import { BACKEND_API_URL } from "../../constants";

// export const AirlineDetails = () => {
//     const { airlineId } = useParams();
//     const [airline, setAirline] = useState<Airline>();
//     const [airlineCapacity, setAirlineCapacity] = useState<AirlineCapacity>();

//     useEffect(() => {
//         const fetchAirline = async () => {
//             const response = await fetch(`${BACKEND_API_URL}/airlines/${airlineId}`);
//             const response1 = await fetch(`${BACKEND_API_URL}/airlines/${airlineId}/averageCapacity`);
//             const airline = await response.json();
//             const averageCapacity = await response1.json();

//             setAirline(airline);
//             setAirlineCapacity(averageCapacity);
//         };
//         fetchAirline();
//     }, [airlineId]);

//     return (

//         <Container maxWidth="md">
//             <Card sx={{
//                 backgroundColor: "#F7F7F7",
//                 border: "1px solid #E0E0E0",
//                 boxShadow: "0px 3px 6px #00000029",
//                 borderRadius: "12px",
//                 textAlign: "center",
//             }}>
//                 <CardContent sx={{ paddingBottom: "16px" }}>
//                     <IconButton component={Link} to={`/airlines`} sx={{ marginBottom: "16px" }}>
//                         <ArrowBackIcon sx={{ fontSize: "30px", color: "#555",  }} />
//                     </IconButton>
//                     <Typography variant="h4" sx={{ fontSize: "24px", marginBottom: "16px", color: "#444" }}>
//                         Welcome aboard, {airline?.name}!
//                     </Typography>
//                     <Grid container spacing={2}>
//                         <Grid item xs={6}>
//                             <Typography variant="subtitle1" sx={{ fontSize: "18px", color: "#555", fontWeight: "bold" }}>IATA Code:</Typography>
//                             <Typography sx={{ fontSize: "16px", color: "#222" }}>{airline?.iataCode}</Typography>
//                         </Grid>
//                         <Grid item xs={6}>
//                             <Typography variant="subtitle1" sx={{ fontSize: "18px", color: "#555", fontWeight: "bold" }}>Country:</Typography>
//                             <Typography sx={{ fontSize: "16px", color: "#222" }}>{airline?.country}</Typography>
//                         </Grid>
//                         <Grid item xs={6}>
//                             <Typography variant="subtitle1" sx={{ fontSize: "18px", color: "#555", fontWeight: "bold" }}>Fleet Size:</Typography>
//                             <Typography sx={{ fontSize: "16px", color: "#222" }}>{airline?.fleetSize}</Typography>
//                         </Grid>
//                         <Grid item xs={6}>
//                             <Typography variant="subtitle1" sx={{ fontSize: "18px", color: "#555", fontWeight: "bold" }}>Website:</Typography>
//                             <Typography sx={{ fontSize: "16px", color: "#222" }}>{airline?.website}</Typography>
//                         </Grid>
//                     </Grid>

//                     <Box mt={4}>
//                         <Typography variant="h5" sx={{ fontSize: "20px", color: "#444" }}>Average Capacity of Your Flights</Typography>
//                         <Typography variant="subtitle1" sx={{ fontSize: "18px", color: "#222" }}>
//                             Your average flight capacity is <strong>{airlineCapacity?.averageFlightCapacity?.toFixed(2)}</strong> seats.
//                         </Typography>
//                     </Box>
//                 </CardContent>

//                 <CardActions sx={{ borderTop: "1px solid #E0E0E0", justifyContent: "center" }}>
//                     <IconButton component={Link} sx={{ mr: 3, fontSize: "16px", color: "#444", borderRadius: "12px", "&:hover": { backgroundColor: "#E0E0E0" } }} to={`/airlines/${airlineId}/edit`} >
//                         <EditIcon sx={{ fontSize: "20px", mr: "8px" }} /> Edit Profile
//                     </IconButton>

//                     <IconButton component={Link} sx={{ fontSize: "16px", borderRadius: "12px", "&:hover": { backgroundColor: "#E0E0E0" } }} to={`/airlines/${airlineId}/delete`} >
//                         <DeleteForeverIcon sx={{ fontSize: "20px", mr: "8px", color: "#f44336" }} /> Delete Account
//                     </IconButton>


//                 </CardActions>
//             </Card>
//         </Container>





//     );
// };

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
export const AirlineDetails = () => {
    const { airlineId } = useParams();
    const [airline, setAirline] = useState<Airline>();
    const [airlineCapacity, setAirlineCapacity] = useState<AirlineCapacity>();

    useEffect(() => {
        const fetchAirline = async () => {
            try{
            const response = await fetch(`${BACKEND_API_URL}/airlines/${airlineId}`);
            const response1 = await fetch(`${BACKEND_API_URL}/airlines/${airlineId}/averageCapacity`);
            const airline = await response.json();
            const airlineCapacity = await response1.json();

            setAirline(airline);
            setAirlineCapacity(airlineCapacity);
            }catch(error : any){
                toast.error(error.response.data);
            }
        };
        fetchAirline();
    }, [airlineId]);

    return (
        <Container sx={{ marginTop: "2rem" }}>
            <Card sx={{ maxWidth: "800px", margin: "auto" }}>
                <CardContent>
                    <IconButton component={Link} sx={{ mr: 3 }} to={`/airlines`}>
                        <ArrowBack />
                    </IconButton>
                    <Typography variant="h4" gutterBottom>
                        Airline Details
                    </Typography>
                    <TableContainer component={Paper} sx={{ marginBottom: "2rem" }}>
                        <Table>
                            <TableBody>
                                <TableRow>
                                    <TableCell component="th" scope="row">
                                        Name
                                    </TableCell>
                                    <TableCell align="right">
                                        {airline?.name}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th" scope="row">
                                        IATA Code
                                    </TableCell>
                                    <TableCell align="right">
                                        {airline?.iataCode}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th" scope="row">
                                        Fleet Size
                                    </TableCell>
                                    <TableCell align="right">
                                        {airline?.fleetSize}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th" scope="row">
                                        Website
                                    </TableCell>
                                    <TableCell align="right">
                                        {airline?.website}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th" scope="row">
                                        Country
                                    </TableCell>
                                    <TableCell align="right">
                                        {airline?.country}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th" scope="row">
                                        Average Capacity
                                    </TableCell>
                                    <TableCell align="right">
                                        {airlineCapacity?.averageFlightCapacity?.toFixed(2)}
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Typography variant="h5" gutterBottom>
                        Flights
                    </Typography>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Call Sign</TableCell>
                                    <TableCell>Capacity</TableCell>
                                    <TableCell>Departure Airport</TableCell>
                                    <TableCell>Arrival Airport</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {airline?.flights?.map((flight) => (
                                    <TableRow key={flight.id}>
                                        <TableCell>{flight.callSign}</TableCell>
                                        <TableCell>{flight.capacity}</TableCell>
                                        <TableCell>{flight.departureAirport}</TableCell>
                                        <TableCell>{flight.arrivalAirport}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </CardContent>
                {StorageService.isLoggedIn() && (
                <CardActions sx={{ borderTop: "1px solid #E0E0E0", justifyContent: "center" }}>
                    <IconButton component={Link} sx={{ mr: 3, fontSize: "16px", color: "#444", borderRadius: "12px", "&:hover": { backgroundColor: "#E0E0E0" } }} to={`/airlines/${airlineId}/edit`} >
                        <EditIcon sx={{ fontSize: "20px", mr: "8px" }} /> Edit Profile
                    </IconButton>

                    <IconButton component={Link} sx={{ fontSize: "16px", borderRadius: "12px", "&:hover": { backgroundColor: "#E0E0E0" } }} to={`/airlines/${airlineId}/delete`} >
                        <DeleteForeverIcon sx={{ fontSize: "20px", mr: "8px", color: "#f44336" }} /> Delete Account
                    </IconButton>
                </CardActions>
                )}
            </Card>
        </Container >
    );
};