import { Autocomplete, Button, Card, CardActions, CardContent, IconButton, TextField } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Booking } from "../../models/Booking";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import { Flight } from "../../models/Flight";
import { BACKEND_API_URL } from "../../constants";
import { Airline } from "../../models/Airline";


export const FlightEdit = () => {
    const navigate = useNavigate();
    const { flightId } = useParams();

    const [flight, setFlight] = useState<Flight>({
        callSign: "",
        capacity: 0,
        departureAirport: "",
        arrivalAirport: "",
        airlineId: 0,
    });


    useEffect(() => {
        const fetchFlight = async () => {
            const response = await fetch(`${BACKEND_API_URL}/flights/${flightId}`);
            const flight = await response.json();
            setFlight(flight);
        };
        fetchFlight();
    }, [flightId]);

    const [airlineSuggestions, setAirlineSuggestions] = useState<Airline[]>([]);

    const handleAirlineInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        try {
            const query = event.target.value;
            const response = await axios.get(`${BACKEND_API_URL}/airlines/autocomplete?query=${query}&maxResults=5`);
            setAirlineSuggestions(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleAirlineSelection = (event: React.ChangeEvent<{}>, value: Airline | null) => {
        if (value) {
            setFlight({ ...flight, airlineId: value.id });
        }
    };

    const updateFlight = async (event: { preventDefault: () => void }) => {
        event.preventDefault();
        try {
            await axios.put(`${BACKEND_API_URL}/flights/${flightId}`, flight);
            navigate("/flights");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Container>
            <Card>
                <CardContent>
                    <IconButton component={Link} sx={{ mr: 3 }} to={`/flights`}>
                        <ArrowBackIcon />
                    </IconButton>{" "}
                    <form onSubmit={updateFlight}>
                        <TextField
                            id="call-sign"
                            label="Call Sign"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2 }}
                            value={flight.callSign}
                            onChange={(event) => setFlight({ ...flight, callSign: event.target.value })}
                        />
                        <TextField
                            id="capacity"
                            label="Capacity"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2 }}
                            value={flight.capacity}
                            onChange={(event) => setFlight({ ...flight, capacity: Number(event.target.value) })}
                        />
                        <TextField
                            id="departure-airport"
                            label="Departure Airport"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2 }}
                            value={flight.departureAirport}
                            onChange={(event) => setFlight({ ...flight, departureAirport: event.target.value })}
                        />
                        <TextField
                            id="arrival-airport"
                            label="Arrival Airport"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2 }}
                            value={flight.arrivalAirport}
                            onChange={(event) => setFlight({ ...flight, arrivalAirport: event.target.value })}
                        />
                        <Autocomplete
                            id="airline-id"
                            options={airlineSuggestions}
                            
                            getOptionLabel={(airline) => `${airline.name} - ${airline.country}`}
                            // renderOption={(airline) => (
                            //     <div>
                            //         {airline.name} ({airline.country})
                            //     </div>
                            // )}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label={flight.airline?.name}
                                    variant="outlined"
                                    fullWidth
                                    sx={{ mb: 2 }}
                                    value={flight.airline?.name}
                                    onChange={handleAirlineInputChange}
                                />
                            )}
                            onChange={handleAirlineSelection}
                        />
                        <Button type="submit">Update Airline</Button>

                    </form>
                </CardContent>
                <CardActions></CardActions>
            </Card>
        </Container>
    );
};

