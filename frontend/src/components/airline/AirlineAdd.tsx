import { Button, Card, CardActions, CardContent, IconButton, TextField } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Booking } from "../../models/Booking";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import { Flight } from "../../models/Flight";
import { Airline } from "../../models/Airline";


export const AirlineAdd = () => {
    const navigate = useNavigate();

    const [airline, setAirline] = useState<Airline>({
        name: "",
        iataCode: "",
        fleetSize: 0,
        website: "",
        country: "",
    });

    const addAirline = async (event: { preventDefault: () => void }) => {
        event.preventDefault();
        try {

            await axios.post(`http://localhost:8080/api/airlines`, airline);
            navigate("/airlines");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Container>
            <Card>
                <CardContent>
                    <h1>Add Airline</h1>
                    <IconButton component={Link} sx={{ mr: 3 }} to={`/airlines`}>
                        <ArrowBackIcon />
                    </IconButton>{" "}
                    <form onSubmit={addAirline}>
                        <TextField
                            id="name"
                            label="Name"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2 }}
                            onChange={(event) => setAirline({ ...airline, name: event.target.value })}
                        />
                        <TextField
                            id="iata-code"
                            label="Iata Code"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2 }}
                            onChange={(event) => setAirline({ ...airline, iataCode: event.target.value })}
                        />
                        <TextField
                            id="fleet-size"
                            label="Fleet Size"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2 }}
                            onChange={(event) => setAirline({ ...airline, fleetSize: Number(event.target.value) })}
                        />
                        <TextField
                            id="website"
                            label="Website"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2 }}
                            onChange={(event) => setAirline({ ...airline, website: event.target.value })}
                        />
                        <TextField
                            id="country"
                            label="Country"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2 }}
                            onChange={(event) => setAirline({ ...airline, country: event.target.value})}
                        />


                        <Button type="submit">Add Airline</Button>
                    </form>
                </CardContent>
                <CardActions></CardActions>
            </Card>
        </Container>
    );
};