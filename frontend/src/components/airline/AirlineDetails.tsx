import { Box, Button, Card, CardActions, CardContent, Grid, IconButton, Typography } from "@mui/material";
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
import { BACKEND_API_URL } from "../../constants";

export const AirlineDetails = () => {
    const { airlineId } = useParams();
    const [airline, setAirline] = useState<Airline>();
    const [airlineCapacity, setAirlineCapacity] = useState<AirlineCapacity>();

    useEffect(() => {
        const fetchAirline = async () => {
            const response = await fetch(`${BACKEND_API_URL}/airlines/${airlineId}`);
            const response1 = await fetch(`${BACKEND_API_URL}/airlines/${airlineId}/averageCapacity`);
            const airline = await response.json();
            const averageCapacity = await response1.json();

            setAirline(airline);
            setAirlineCapacity(averageCapacity);
        };
        fetchAirline();
    }, [airlineId]);

    return (

        <Container maxWidth="md">
            <Card sx={{
                backgroundColor: "#F7F7F7",
                border: "1px solid #E0E0E0",
                boxShadow: "0px 3px 6px #00000029",
                borderRadius: "12px",
                textAlign: "center",
            }}>
                <CardContent sx={{ paddingBottom: "16px" }}>
                    <IconButton component={Link} to={`/airlines`} sx={{ marginBottom: "16px" }}>
                        <ArrowBackIcon sx={{ fontSize: "30px", color: "#555",  }} />
                    </IconButton>
                    <Typography variant="h4" sx={{ fontSize: "24px", marginBottom: "16px", color: "#444" }}>
                        Welcome aboard, {airline?.name}!
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Typography variant="subtitle1" sx={{ fontSize: "18px", color: "#555", fontWeight: "bold" }}>IATA Code:</Typography>
                            <Typography sx={{ fontSize: "16px", color: "#222" }}>{airline?.iataCode}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="subtitle1" sx={{ fontSize: "18px", color: "#555", fontWeight: "bold" }}>Country:</Typography>
                            <Typography sx={{ fontSize: "16px", color: "#222" }}>{airline?.country}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="subtitle1" sx={{ fontSize: "18px", color: "#555", fontWeight: "bold" }}>Fleet Size:</Typography>
                            <Typography sx={{ fontSize: "16px", color: "#222" }}>{airline?.fleetSize}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="subtitle1" sx={{ fontSize: "18px", color: "#555", fontWeight: "bold" }}>Website:</Typography>
                            <Typography sx={{ fontSize: "16px", color: "#222" }}>{airline?.website}</Typography>
                        </Grid>
                    </Grid>

                    <Box mt={4}>
                        <Typography variant="h5" sx={{ fontSize: "20px", color: "#444" }}>Average Capacity of Your Flights</Typography>
                        <Typography variant="subtitle1" sx={{ fontSize: "18px", color: "#222" }}>
                            Your average flight capacity is <strong>{airlineCapacity?.averageFlightCapacity?.toFixed(2)}</strong> seats.
                        </Typography>
                    </Box>
                </CardContent>

                <CardActions sx={{ borderTop: "1px solid #E0E0E0", justifyContent: "center" }}>
                    <IconButton component={Link} sx={{ mr: 3, fontSize: "16px", color: "#444", borderRadius: "12px", "&:hover": { backgroundColor: "#E0E0E0" } }} to={`/airlines/${airlineId}/edit`} >
                        <EditIcon sx={{ fontSize: "20px", mr: "8px" }} /> Edit Profile
                    </IconButton>

                    <IconButton component={Link} sx={{ fontSize: "16px", borderRadius: "12px", "&:hover": { backgroundColor: "#E0E0E0" } }} to={`/airlines/${airlineId}/delete`} >
                        <DeleteForeverIcon sx={{ fontSize: "20px", mr: "8px", color: "#f44336" }} /> Delete Account
                    </IconButton>


                </CardActions>
            </Card>
        </Container>





    );
};