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
import { UserProfile } from "../../models/UserProfile";
import { User } from "../../models/User";
import { toast } from "react-toastify";
export const ProfileEdit = () => {
    const navigate = useNavigate();
    const { username } = useParams();
	const [user,setUser] = useState<User>();
    const [userProfile, setUserProfile] = useState<UserProfile>({ 
        bio: "",
        location: "",
        birthDate: "",
        gender: "",
        status: ""
    });

	useEffect(() => {
		const fetchUserProfile = async () => {
            try{
            const response = await fetch(`${BACKEND_API_URL}/user-profile-username/${username}`);
            const response_user = await fetch(`${BACKEND_API_URL}/user/${username}`);
            const userProfile = await response.json();
            const user = await response_user.json();

            setUser(user);
            setUserProfile(userProfile);
            } catch (error: any) {
                toast.error(error.response.data);
            }
		};
		fetchUserProfile();
	}, [username]);

    const updateUserProfile = async (event: { preventDefault: () => void }) => {
        event.preventDefault();
        try {
            const id = user?.id;
            await axios.put(`${BACKEND_API_URL}/user-profile/${id}`, userProfile);
            navigate(`/profile/${username}`);
            toast.success("User profile updated succesfully.");
        } catch (error : any) {
            toast.error(error.response.data);
            
        }
    };

    return (
        <Container>
            <Card>
                <CardContent>
                    <IconButton component={Link} sx={{ mr: 3 }} to={`/passengers`}>
                        <ArrowBackIcon />
                    </IconButton>{" "}
                    <form onSubmit={updateUserProfile}>                 
                    <TextField
                            id="first-name"
                            label="Bio"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2 }}
                            value={userProfile.bio}
                            required
                            error={userProfile.bio === ''}
                            helperText={userProfile.bio === '' ? 'Bio is required' : ''}
                            onChange={(event) => {
                                const target = event.target as HTMLInputElement;
                                target.setCustomValidity(target.value === '' ? 'Name is required' : '');
                                setUserProfile({ ...userProfile, bio: target.value })
                            }}
                            onInvalid={(event) => {
                                const target = event.target as HTMLInputElement;
                                target.setCustomValidity('The bio cannot be empty')
                            }}
                            onInput={(event) => {
                                const target = event.target as HTMLInputElement;
                                target.setCustomValidity('')
                            }}
                        />
                        <TextField
                            id="last-name"
                            label="Location"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2 }}
                            value={userProfile.location}
                            required
                            error={userProfile.location === ''}
                            helperText={userProfile.location === '' ? 'Location is required' : ''}
                            onChange={(event) => {
                                const target = event.target as HTMLInputElement;
                                target.setCustomValidity(target.value === '' ? 'Location is required' : '');
                                setUserProfile({ ...userProfile, location: target.value })
                            }}
                            onInvalid={(event) => {
                                const target = event.target as HTMLInputElement;
                                target.setCustomValidity('The location cannot be empty')
                            }}
                            onInput={(event) => {
                                const target = event.target as HTMLInputElement;
                                target.setCustomValidity('')
                            }}
                        />
                        <TextField
                            id="date-of-birth"
                            label="Date of Birth"
                            variant="outlined"
                            fullWidth
                            type="date"
                            sx={{ mb: 2 }}
                            value={userProfile.birthDate}
                            onChange={(event) => setUserProfile({ ...userProfile, birthDate: event.target.value })}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            id="nationality"
                            label="Gender"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2 }}
                            value={userProfile.gender}
                            required
                            error={userProfile.gender === ''}
                            helperText={userProfile.gender === '' ? 'Gender is required' : ''}
                            onChange={(event) => {
                                const target = event.target as HTMLInputElement;
                                target.setCustomValidity(target.value === '' ? 'Gender is required' : '');
                                setUserProfile({ ...userProfile, gender: target.value })
                            }}
                            onInvalid={(event) => {
                                const target = event.target as HTMLInputElement;
                                target.setCustomValidity('The gender cannot be empty')
                            }}
                            onInput={(event) => {
                                const target = event.target as HTMLInputElement;
                                target.setCustomValidity('')
                            }}
                        />
                        <TextField
                            id="passport-number"
                            label="Status"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2 }}
                            value={userProfile.status}
                            required
                            error={userProfile.status === ''}
                            helperText={userProfile.status === '' ? 'Status is required' : ''}
                            onChange={(event) => {
                                const target = event.target as HTMLInputElement;
                                target.setCustomValidity(target.value === '' ? 'Status is required' : '');
                                setUserProfile({ ...userProfile, status: target.value })
                            }}
                            onInvalid={(event) => {
                                const target = event.target as HTMLInputElement;
                                target.setCustomValidity('The status cannot be empty')
                            }}
                            onInput={(event) => {
                                const target = event.target as HTMLInputElement;
                                target.setCustomValidity('')
                            }}
                        />

                        <Button type="submit">Update User Profile</Button>
                    </form>
                </CardContent>
                <CardActions></CardActions>
            </Card>
        </Container>
    );
};

