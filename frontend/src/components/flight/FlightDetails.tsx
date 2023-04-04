import { Card, CardActions, CardContent, Grid, IconButton, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Booking } from "../../models/Booking";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Flight } from "../../models/Flight";
import { BACKEND_API_URL } from "../../constants";
export const FlightDetails = () => {
    const { flightId } = useParams();
    const [flight, setFlight] = useState<Flight>();

    useEffect(() => {
        const fetchFlight = async () => {
            const response = await fetch(`${BACKEND_API_URL}/flights/${flightId}`);
            const flight = await response.json();
            setFlight(flight);
        };
        fetchFlight();
    }, [flightId]);

    return (
        // <Container>
        //     <Card>
        //         <CardContent>
        //             <IconButton component={Link} sx={{ mr: 3 }} to={`/flights`}>
        //                 <ArrowBackIcon />
        //             </IconButton>{" "}
        //             <h1>Flight Details</h1>
        //             <p>Callsign:{flight?.callSign}</p>
        //             <p>Capacity : {flight?.capacity}</p>
        //             <p>Departure Airport: {flight?.departureAirport}</p>
        //             <p>Arrival Airport: {flight?.arrivalAirport}</p>
        //             <p>Airline:</p>
        //             <ul>
        //                 <li>Name : {flight?.airline?.name}</li>
        //                 <li>Iata Code : {flight?.airline?.iataCode}</li>
        //                 <li>Country : {flight?.airline?.country}</li>
        //                 <li>Fleet Size : {flight?.airline?.fleetSize}</li>
        //                 <li>Website : {flight?.airline?.website}</li>
        //             </ul>
        //         </CardContent>
        //         <CardActions>
        //             <IconButton component={Link} sx={{ mr: 3 }} to={`/flights/${flightId}/edit`}>
        //                 <EditIcon />
        //             </IconButton>

        //             <IconButton component={Link} sx={{ mr: 3 }} to={`/flights/${flightId}/delete`}>
        //                 <DeleteForeverIcon sx={{ color: "red" }} />
        //             </IconButton>
        //         </CardActions>
        //     </Card>
        // </Container>
        <Container maxWidth="md">
            <Card sx={{
                backgroundColor: "#F7F7F7",
                border: "1px solid #E0E0E0",
                boxShadow: "0px 3px 6px #00000029",
                borderRadius: "12px",
                textAlign: "center",
            }}>
                <CardContent>
                    <IconButton component={Link} sx={{ mr: 3 }} to={`/flights`}>
                        <ArrowBackIcon sx={{ fontSize: "30px", color: "#555" }} />
                    </IconButton>{" "}
                    <Typography variant="h4" sx={{ fontSize: "24px", marginBottom: "16px", color: "#444" }}>
                        Flight Details
                    </Typography>
                    <Typography variant="subtitle1" sx={{ fontSize: "18px", color: "#555", fontWeight: "bold" }}>Callsign:</Typography>
                    <Typography sx={{ fontSize: "16px", color: "#222", marginBottom: "8px" }}>{flight?.callSign}</Typography>
                    <Typography variant="subtitle1" sx={{ fontSize: "18px", color: "#555", fontWeight: "bold" }}>Capacity:</Typography>
                    <Typography sx={{ fontSize: "16px", color: "#222", marginBottom: "8px" }}>{flight?.capacity}</Typography>
                    <Typography variant="subtitle1" sx={{ fontSize: "18px", color: "#555", fontWeight: "bold" }}>Departure Airport:</Typography>
                    <Typography sx={{ fontSize: "16px", color: "#222", marginBottom: "8px" }}>{flight?.departureAirport}</Typography>
                    <Typography variant="subtitle1" sx={{ fontSize: "18px", color: "#555", fontWeight: "bold" }}>Arrival Airport:</Typography>
                    <Typography sx={{ fontSize: "16px", color: "#222", marginBottom: "16px" }}>{flight?.arrivalAirport}</Typography>
                    <Typography variant="subtitle1" sx={{ fontSize: "18px", color: "#555", fontWeight: "bold" }}>Airline:</Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Typography variant="subtitle2" sx={{ fontSize: "16px", color: "#222", fontWeight: "bold" }}>Name:</Typography>
                            <Typography sx={{ fontSize: "16px", color: "#222" }}>{flight?.airline?.name}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="subtitle2" sx={{ fontSize: "16px", color: "#222", fontWeight: "bold" }}>IATA Code:</Typography>
                            <Typography sx={{ fontSize: "16px", color: "#222" }}>{flight?.airline?.iataCode}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="subtitle2" sx={{ fontSize: "16px", color: "#222", fontWeight: "bold" }}>Country:</Typography>
                            <Typography sx={{ fontSize: "16px", color: "#222" }}>{flight?.airline?.country}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="subtitle2" sx={{ fontSize: "16px", color: "#222", fontWeight: "bold" }}>Fleet Size:</Typography>
                            <Typography sx={{ fontSize: "16px", color: "#222" }}>{flight?.airline?.fleetSize}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="subtitle2" sx={{ fontSize: "16 px", color: "#222", fontWeight: "bold" }}>Website:</Typography>
                            <Typography sx={{ fontSize: "16px", color: "#222" }}>{flight?.airline?.website}</Typography>
                        </Grid>
                    </Grid>
                </CardContent>

                <CardActions sx={{ borderTop: "1px solid #E0E0E0", justifyContent: "center" }}>
                    <IconButton component={Link} sx={{ mr: 3, fontSize: "16px", color: "#444", borderRadius: "12px", "&:hover": { backgroundColor: "#E0E0E0" } }} to={`/flights/${flightId}/edit`} >
                        <EditIcon sx={{ fontSize: "20px", mr: "8px" }} /> Edit Profile
                    </IconButton>

                    <IconButton component={Link} sx={{ fontSize: "16px", borderRadius: "12px", "&:hover": { backgroundColor: "#E0E0E0" } }} to={`/flights/${flightId}/delete`} >
                        <DeleteForeverIcon sx={{ fontSize: "20px", mr: "8px", color: "#f44336" }} /> Delete Account
                    </IconButton>


                </CardActions>
            </Card>
        </Container>

    );
};