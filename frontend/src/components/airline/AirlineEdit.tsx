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
import { BACKEND_API_URL } from "../../constants";
import { StorageService } from "../../services/StorageService";
import { toast } from "react-toastify";

export const AirlineEdit = () => {
    const navigate = useNavigate();
    const { airlineId } = useParams();
	
    const [airline, setAirline] = useState<Airline>({ 
        name: "",
        iataCode: "",
        fleetSize: 0,
        website: "",
        country: "",
        username: StorageService.getUser().username
    });

    const [airlineOld, setAirlineOld] = useState<Airline>({ 
        name: "",
        iataCode: "",
        fleetSize: 0,
        website: "",
        country: "",
    });

	useEffect(() => {
		const fetchAirline = async () => {
            try{
			const response = await fetch(`${BACKEND_API_URL}/airlines/${airlineId}`);
			const airlineOld = await response.json();
			setAirlineOld(airlineOld);
            } catch (error: any) {
                toast.error(error.response.data);
            }
		};
		fetchAirline();
	}, [airlineId]);

    const updateAirline = async (event: { preventDefault: () => void }) => {
        event.preventDefault();
        try {
            await axios.put(`${BACKEND_API_URL}/airlines/${airlineId}`, airlineOld);
            toast.success("Airline updated successfully");
            navigate("/airlines");
        } catch (error : any) {
            toast.error(error.response.data);
        }
    };

    return (
        <Container>
            <Card>
                <CardContent>
                    <IconButton component={Link} sx={{ mr: 3 }} to={`/airlines`}>
                        <ArrowBackIcon />
                    </IconButton>{" "}
                    <form onSubmit={updateAirline}>                 
                        <TextField
                            id="name"
                            label="Name"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2 }}
                            value={airlineOld.name}
                            onChange={(event) => setAirlineOld({ ...airlineOld, name: event.target.value })}
                        />
                        <TextField
                            id="iata-code"
                            label="Iata Code"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2 }}
                            value={airlineOld.iataCode}
                            onChange={(event) => setAirlineOld({ ...airlineOld, iataCode: event.target.value })}
                        />
                        <TextField
                            id="fleet-size"
                            label="Fleet Size"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2 }}
                            value={airlineOld.fleetSize}
                            onChange={(event) => setAirlineOld({ ...airlineOld, fleetSize: Number(event.target.value) })}
                        />
                        <TextField
                            id="website"
                            label="Website"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2 }}
                            value={airlineOld.website}
                            onChange={(event) => setAirlineOld({ ...airlineOld, website: event.target.value })}
                        />
                        <TextField
                            id="country"
                            label="Country"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2 }}
                            value={airlineOld.country}
                            type="text"
                            onChange={(event) => setAirlineOld({ ...airlineOld, country: event.target.value})}
                        />

                        <Button type="submit">Update Airline</Button>
                    </form>
                </CardContent>
                <CardActions></CardActions>
            </Card>
        </Container>
    );
};

