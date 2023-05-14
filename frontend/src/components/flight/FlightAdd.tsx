// import { Button, Card, CardActions, CardContent, IconButton, TextField } from "@mui/material";
// import { Container } from "@mui/system";
// import { useEffect, useState } from "react";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import { Booking } from "../../models/Booking";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import axios from "axios";
// import { Flight } from "../../models/Flight";
// import { BACKEND_API_URL } from "../../constants";

// export const FlightAdd = () => {
//     const navigate = useNavigate();

//     const [flight, setFlight] = useState<Flight>({
//         callSign: "",
//         capacity: 0,
//         departureAirport: "",
//         arrivalAirport: "",
//         airlineId: 0,
//     });



//     const addFlight = async (event: { preventDefault: () => void }) => {
//         event.preventDefault();
//         try {

//             await axios.post(`${BACKEND_API_URL}/flights`, flight);
//             navigate("/flights");
//         } catch (error) {
//             console.log(error);
//         }
//     };



//     return (
//         <Container>
//             <Card>
//                 <CardContent>
//                     <h1>Add Flight</h1>
//                     <IconButton component={Link} sx={{ mr: 3 }} to={`/flights`}>
//                         <ArrowBackIcon />
//                     </IconButton>{" "}
//                     <form onSubmit={addFlight}>
//                         <TextField
//                             id="call-sign"
//                             label="Call Sign"
//                             variant="outlined"
//                             fullWidth
//                             sx={{ mb: 2 }}
//                             onChange={(event) => setFlight({ ...flight, callSign: event.target.value })}
//                         />
//                         <TextField
//                             id="capacity"
//                             label="Capacity"
//                             variant="outlined"
//                             fullWidth
//                             sx={{ mb: 2 }}
//                             onChange={(event) => setFlight({ ...flight, capacity: Number(event.target.value) })}
//                         />
//                         <TextField
//                             id="departure-airport"
//                             label="Departure Airport"
//                             variant="outlined"
//                             fullWidth
//                             sx={{ mb: 2 }}
//                             onChange={(event) => setFlight({ ...flight, departureAirport: event.target.value })}
//                         />
//                         <TextField
//                             id="arrival-airport"
//                             label="Arrival Airport"
//                             variant="outlined"
//                             fullWidth
//                             sx={{ mb: 2 }}
//                             onChange={(event) => setFlight({ ...flight, arrivalAirport: event.target.value })}
//                         />
//                         <TextField
//                             id="airline-id"
//                             label="Airline ID"
//                             variant="outlined"
//                             fullWidth
//                             sx={{ mb: 2 }}
//                             onChange={(event) => setFlight({ ...flight, airlineId: Number(event.target.value) })}
//                         />


//                         <Button type="submit">Add Flight</Button>
//                     </form>
//                 </CardContent>
//                 <CardActions></CardActions>
//             </Card>
//         </Container>
//     );
// };

import { Button, Card, CardActions, CardContent, IconButton, TextField } from "@mui/material";
import { Autocomplete } from "@mui/lab";
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
import { StorageService } from "../../services/StorageService";
import { toast } from "react-toastify";

export const FlightAdd = () => {
    const navigate = useNavigate();

    const [flight, setFlight] = useState<Flight>({
        callSign: "",
        capacity: 0,
        departureAirport: "",
        arrivalAirport: "",
        airlineId: 0,
        username: StorageService.getUser().username
    });

    const [airlineSuggestions, setAirlineSuggestions] = useState<Airline[]>([]);



    const handleAirlineInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        try {
            const query = event.target.value;
            const response = await axios.get(`${BACKEND_API_URL}/airlines/autocomplete?query=${query}&maxResults=5`);
            setAirlineSuggestions(response.data);
        } catch (error : any) {
            toast.error(error.response.data);
        }
    };

    const handleAirlineSelection = (event: React.ChangeEvent<{}>, value: Airline | null) => {
        if (value) {
            setFlight({ ...flight, airlineId: value.id });
        }
    };

    const addFlight = async (event: { preventDefault: () => void }) => {
        event.preventDefault();
        const authToken = StorageService.getToken();
        const headers = { Authorization: authToken };
        try {
            await axios.post(`${BACKEND_API_URL}/flights`, flight, { headers });
            toast.success("Flight added successfully");
            navigate("/flights");
        } catch (error : any) {
            toast.error(error.response.data);
        }
    };

    return (
        <Container>
            <Card>
                <CardContent>
                    <h1>Add Flight</h1>
                    <IconButton component={Link} sx={{ mr: 3 }} to={`/flights`}>
                        <ArrowBackIcon />
                    </IconButton>{" "}
                    <form onSubmit={addFlight}>
                        <TextField
                            id="call-sign"
                            label="Call Sign"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2 }}
                            onChange={(event) => setFlight({ ...flight, callSign: event.target.value })}
                        />
                        <TextField
                            id="capacity"
                            label="Capacity"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2 }}
                            onChange={(event) => setFlight({ ...flight, capacity: Number(event.target.value) })}
                        />
                        <TextField
                            id="departure-airport"
                            label="Departure Airport"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2 }}
                            onChange={(event) => setFlight({ ...flight, departureAirport: event.target.value })}
                        />
                        <TextField
                            id="arrival-airport"
                            label="Arrival Airport"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2 }}
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
                                    label="Airline"
                                    variant="outlined"
                                    fullWidth
                                    sx={{ mb: 2 }}
                                    onChange={handleAirlineInputChange}
                                />
                            )}
                            onChange={handleAirlineSelection}
                        />
                        <Button type="submit" variant="contained" sx={{ mr: 2 }}>
                            Add Flight
                        </Button>
                        <Button component={Link} to={`/flights`} variant="outlined">
                            Cancel
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </Container>
    );
};
