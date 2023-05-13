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
import { Passenger } from "../../models/Passenger";
import { BACKEND_API_URL } from "../../constants";
import { StorageService } from "../../services/StorageService";
import { toast } from "react-toastify";

export const PassengerAdd = () => {
    const navigate = useNavigate();

    const [passenger, setPassenger] = useState<Passenger>({
        firstName: "",
        lastName: "",
        dateOfBirth: "",
        nationality: "",
        passportNumber: "",
        username: StorageService.getUser().username
    });

    const addPassenger = async (event: { preventDefault: () => void }) => {
        event.preventDefault();
        try {
            await axios.post(`${BACKEND_API_URL}/passengers`, passenger);
            navigate("/passengers");
            toast.success("Passenger added successfully!");
        } catch (error : any) {
            toast.error(error.response.data);
        }
    };

    return (
        <Container>
            <Card>
                <CardContent>
                    <h1>Add Passenger</h1>
                    <IconButton component={Link} sx={{ mr: 3 }} to={`/passengers`}>
                        <ArrowBackIcon />
                    </IconButton>{" "}
                    <form onSubmit={addPassenger}>
                        <TextField
                            id="first-name"
                            label="First Name"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2 }}
                            onChange={(event) => setPassenger({ ...passenger, firstName: event.target.value })}
                        />
                        <TextField
                            id="last-name"
                            label="Last Name"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2 }}
                            onChange={(event) => setPassenger({ ...passenger, lastName: event.target.value })}
                        />
                        <TextField
                            id="date-of-birth"
                            label="Date of Birth"
                            variant="outlined"
                            fullWidth
                            type="date"
                            sx={{ mb: 2 }}
                            onChange={(event) => setPassenger({ ...passenger, dateOfBirth: event.target.value })}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            id="nationality"
                            label="Nationality"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2 }}
                            onChange={(event) => setPassenger({ ...passenger, nationality: event.target.value })}
                        />
                        <TextField
                            id="passport-number"
                            label="Passport Number"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2 }}
                            onChange={(event) => setPassenger({ ...passenger, passportNumber: event.target.value})}
                        />


                        <Button type="submit">Add Passenger</Button>
                    </form>
                </CardContent>
                <CardActions></CardActions>
            </Card>
        </Container>
    );
};