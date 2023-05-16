import { Container, Card, CardContent, IconButton, CardActions, Button } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import { BACKEND_API_URL } from "../../constants";
import { StorageService } from "../../services/StorageService";
import { toast } from "react-toastify";

export const FlightDelete = () => {
	const { flightId } = useParams();
	const navigate = useNavigate();

	const authToken = StorageService.getToken();
	const headers = { Authorization: authToken };

	const handleDelete = async (event: { preventDefault: () => void }) => {
		event.preventDefault();
		try {
			await axios.delete(`${BACKEND_API_URL}/flights/${flightId}`, { headers });
			toast.success("Flight deleted successfully");
			navigate("/flights");
		} catch (error: any) {
			toast.error(error.response.data);
		}
	};

	const handleCancel = (event: { preventDefault: () => void }) => {
		event.preventDefault();

		navigate("/flights");
	};

	return (
		<Container >
			<Card >
				<CardContent >
					<IconButton component={Link} sx={{ mr: 3 }} to={`/flights`}>
						<ArrowBackIcon />
					</IconButton>{" "}
					<h3>Are you sure you want to delete this flight? This cannot be undone!</h3>
				</CardContent>
				<CardActions >
					<Button onClick={handleDelete} sx={{ color: 'white', backgroundColor: 'red' }}>Delete</Button>
					<Button onClick={handleCancel}>Cancel</Button>
				</CardActions>
			</Card>
		</Container>

	);
};