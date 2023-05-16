import { Button, Card, CardActions, CardContent, IconButton, TextField } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Booking } from "../../models/Booking";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import { Airline } from "../../models/Airline";
import { Passenger } from "../../models/Passenger";
import { BACKEND_API_URL } from "../../constants";
import { StorageService } from "../../services/StorageService";
import { toast } from "react-toastify";
export const PassengerEdit = () => {
    const navigate = useNavigate();
    const { passengerId } = useParams();

    const [passenger, setPassenger] = useState<Passenger>({ 
        firstName: "",
        lastName: "",
        dateOfBirth: "",
        nationality: "",
        passportNumber: "",
        username: StorageService.getUser().username
    });

	useEffect(() => {
		const fetchPassenger = async () => {
            try{
			const response = await fetch(`${BACKEND_API_URL}/passengers/${passengerId}`);
			const passenger = await response.json();
			setPassenger(passenger);
            console.log(passenger);
            } catch (error: any) {
                toast.error(error.response.data);
            }
		};
		fetchPassenger();
	}, [passengerId]);

    const updatePassenger = async (event: { preventDefault: () => void }) => {
        event.preventDefault();
        const authToken = StorageService.getToken();
        const headers = { Authorization: authToken };
        try {
            await axios.put(`${BACKEND_API_URL}/passengers/${passengerId}`, passenger, { headers });
            toast.success("Passenger updated successfully");
            navigate("/passengers");
        } catch (error : any) {
            toast.error(error.response.data);
            navigate("/passengers");
        }
    };

    return (
        <Container>
            <Card>
                <CardContent>
                    <IconButton component={Link} sx={{ mr: 3 }} to={`/passengers`}>
                        <ArrowBackIcon />
                    </IconButton>{" "}
                    <form onSubmit={updatePassenger}>                 
                    <TextField
                            id="first-name"
                            label="First Name"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2 }}
                            value={passenger.firstName}
                            onChange={(event) => setPassenger({ ...passenger, firstName: event.target.value })}
                        />
                        <TextField
                            id="last-name"
                            label="Last Name"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2 }}
                            value={passenger.lastName}
                            onChange={(event) => setPassenger({ ...passenger, lastName: event.target.value })}
                        />
                        <TextField
                            id="date-of-birth"
                            label="Date of Birth"
                            variant="outlined"
                            fullWidth
                            type="date"
                            sx={{ mb: 2 }}
                            value={passenger.dateOfBirth}
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
                            value={passenger.nationality}
                            onChange={(event) => setPassenger({ ...passenger, nationality: event.target.value })}
                        />
                        <TextField
                            id="passport-number"
                            label="Passport Number"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2 }}
                            value={passenger.passportNumber}
                            onChange={(event) => setPassenger({ ...passenger, passportNumber: event.target.value})}
                        />

                        <Button type="submit">Update Passenger</Button>
                    </form>
                </CardContent>
                <CardActions></CardActions>
            </Card>
        </Container>
    );
};

