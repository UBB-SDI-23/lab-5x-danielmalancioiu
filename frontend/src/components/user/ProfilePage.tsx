import { Card, CardActions, CardContent, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
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
import { UserProfile } from "../../models/UserProfile";
import { User } from "../../models/User";
import { StorageService } from "../../services/StorageService";
import { toast } from "react-toastify";
import { UserSettings } from "../../models/UserSettings";
import axios from "axios";
export const ProfilePage = () => {
    const navigate = useNavigate();
    const { username } = useParams();
    const [userProfile, setuserProfile] = useState<UserProfile>();
    const [user, setUser] = useState<User>();
    const [user_airlines, setUserAirlines] = useState<number>(1);
    const [user_flights, setUserFlights] = useState<number>(1);
    const [user_bookings, setUserBookings] = useState<number>(1);
    const [user_passengers, setUserPassengers] = useState<number>(1);
    const [number, setNumber] = useState<number>(10);
    const [loading, setLoading] = useState(false);
    const [userSettings, setUserSettings] = useState<UserSettings>();
    const handleNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNumber(Number(event.target.value));
       
    };

    const handleUpdateProfile = () => {
        navigate(`/profile/${username}/edit`)
    }

    const handleRowsPerPageChange = () => {
        if( username == StorageService.getUser().username){
            setUser(StorageService.getUser());
            const userSettings = {id: StorageService.getUser().id, entitiesPerPage: number};
            setUserSettings(userSettings);

            console.log(userSettings);
            console.log(StorageService.getUser().id);
            try{
                axios.post(`${BACKEND_API_URL}/user/rows-per-page`, userSettings);
                toast.success(`Rows per page updated to ${number}`);
                navigate('https://dmg-frontend.netlify.app/airlines');
                window.location.reload();
            } catch (error: any) {
                toast.error(error.response.data);
            
            //StorageService.updateUserField('rowsPerPage', number);
        }
    }
        else{
            toast.error("You can only change your own rows per page");
        }
    };

    useEffect(() => {
        const fetchUserProfile = async () => {
            try{

            const response_rows = await fetch(`${BACKEND_API_URL}/user/rows-per-page/${StorageService.getUser()?.id}`);
            const settings = await response_rows.json();
            
            setNumber(settings);

            const response = await fetch(`${BACKEND_API_URL}/user-profile-username/${username}`);
            const response_user = await fetch(`${BACKEND_API_URL}/user/${username}`);


            const userProfile = await response.json();
            const user = await response_user.json();

            setUser(user);
            setuserProfile(userProfile);

            const response_airlines = await fetch(`${BACKEND_API_URL}/user-number-airlines/${username}`);
            const response_flights = await fetch(`${BACKEND_API_URL}/user-number-flights/${username}`);
            const response_bookings = await fetch(`${BACKEND_API_URL}/user-number-bookings/${username}`);
            const response_passengers = await fetch(`${BACKEND_API_URL}/user-number-passengers/${username}`);


            const user_airlines = await response_airlines.json();
            const user_flights = await response_flights.json();
            const user_bookings = await response_bookings.json();
            const user_passengers = await response_passengers.json();

            setUserPassengers(user_passengers);
            setUserBookings(user_bookings);
            setUserFlights(user_flights);
            setUserAirlines(user_airlines);
        
            } catch (error : any) {
                toast.error(error.response.data);
            }

        };
        fetchUserProfile();
    }, [username]);

    return (
        <Container sx={{ marginTop: "2rem" }}>
            <Card sx={{ maxWidth: "800px", margin: "auto" }}>
                <CardContent>
                    <IconButton component={Link} sx={{ mr: 3 }} to={`/airlines`}>
                        <ArrowBack />
                    </IconButton>
                    <Typography variant="h4" gutterBottom>
                        User Profile
                    </Typography>
                    <TableContainer component={Paper} sx={{ marginBottom: "2rem" }}>
                        <Table>
                            <TableBody>
                                <TableRow>
                                    <TableCell component="th" scope="row">
                                        Username
                                    </TableCell>
                                    <TableCell align="right">
                                        {username}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th" scope="row">
                                        Bio
                                    </TableCell>
                                    <TableCell align="right">
                                        {userProfile?.bio}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th" scope="row">
                                        Location
                                    </TableCell>
                                    <TableCell align="right">
                                        {userProfile?.location}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th" scope="row">
                                        Birth Date
                                    </TableCell>
                                    <TableCell align="right">
                                        {userProfile?.birthDate}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th" scope="row">
                                        Gender
                                    </TableCell>
                                    <TableCell align="right">
                                        {userProfile?.gender}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th" scope="row">
                                        Martial Status
                                    </TableCell>
                                    <TableCell align="right">
                                        {userProfile?.status}
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Typography variant="h5" gutterBottom>
                        Statistics
                    </Typography>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>No. Airlines</TableCell>
                                    <TableCell>No. Flights</TableCell>
                                    <TableCell>No. Passengers</TableCell>
                                    <TableCell>No. Bookings</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>

                                <TableRow>
                                    <TableCell>{user_airlines}</TableCell>
                                    <TableCell>{user_flights}</TableCell>
                                    <TableCell>{user_passengers} </TableCell>
                                    <TableCell>{user_bookings}</TableCell>
                                </TableRow>

                            </TableBody>
                        </Table>
                    </TableContainer>
                </CardContent>
                <div>
                    <input type="number"  onChange={handleNumberChange} />
                    <button onClick={handleRowsPerPageChange}>Update Number</button>
                </div>
                <div>
                <button onClick={handleUpdateProfile}>Update Profile</button>
                </div>
                {/* <CardActions sx={{ borderTop: "1px solid #E0E0E0", justifyContent: "center" }}>
                    <IconButton component={Link} sx={{ mr: 3, fontSize: "16px", color: "#444", borderRadius: "12px", "&:hover": { backgroundColor: "#E0E0E0" } }} to={`/airlines/${airlineId}/edit`} >
                        <EditIcon sx={{ fontSize: "20px", mr: "8px" }} /> Edit Profile
                    </IconButton>

                    <IconButton component={Link} sx={{ fontSize: "16px", borderRadius: "12px", "&:hover": { backgroundColor: "#E0E0E0" } }} to={`/airlines/${airlineId}/delete`} >
                        <DeleteForeverIcon sx={{ fontSize: "20px", mr: "8px", color: "#f44336" }} /> Delete Account
                    </IconButton>
                </CardActions> */}
            </Card>
        </Container >
    );
};