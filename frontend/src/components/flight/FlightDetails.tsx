import { Card, CardActions, CardContent, IconButton } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Booking } from "../../models/Booking";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Flight } from "../../models/Flight";

export const FlightDetails = () => {
    const { flightId } = useParams();
    const [flight, setFlight] = useState<Flight>();

    useEffect(() => {
        const fetchFlight = async () => {
            const response = await fetch(`http://localhost:8080/api/flights/${flightId}`);
            const flight = await response.json();
            setFlight(flight);
        };
        fetchFlight();
    }, [flightId]);

    return (
        <Container>
            <Card>
                <CardContent>
                    <IconButton component={Link} sx={{ mr: 3 }} to={`/flights`}>
                        <ArrowBackIcon />
                    </IconButton>{" "}
                    <h1>Flight Details</h1>
                    <p>Callsign:{flight?.callSign}</p>
                    <p>Capacity : {flight?.capacity}</p>
                    <p>Departure Airport: {flight?.departureAirport}</p>
                    <p>Arrival Airport: {flight?.arrivalAirport}</p>
                    <p>Airline:</p>
                    <ul>
                        <li>Name : {flight?.airline?.name}</li>
                        <li>Iata Code : {flight?.airline?.iataCode}</li>
                        <li>Country : {flight?.airline?.country}</li>
                        <li>Fleet Size : {flight?.airline?.fleetSize}</li>
                        <li>Website : {flight?.airline?.website}</li>
                    </ul>
                </CardContent>
                <CardActions>
                    <IconButton component={Link} sx={{ mr: 3 }} to={`/flights/${flightId}/edit`}>
                        <EditIcon />
                    </IconButton>

                    <IconButton component={Link} sx={{ mr: 3 }} to={`/flights/${flightId}/delete`}>
                        <DeleteForeverIcon sx={{ color: "red" }} />
                    </IconButton>
                </CardActions>
            </Card>
        </Container>
    );
};