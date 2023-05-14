import { Container, Card, CardContent, IconButton, CardActions, Button } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import { BACKEND_API_URL } from "../../constants";
import { toast } from "react-toastify";
import { StorageService } from "../../services/StorageService";


export const AirlineDelete = () => {
	const { airlineId } = useParams();
	const navigate = useNavigate();

	const handleDelete = async (event: { preventDefault: () => void }) => {
		event.preventDefault();
		const authToken = StorageService.getToken();
        const headers = { Authorization: authToken };
		try{
		await axios.delete(`${BACKEND_API_URL}/airlines/${airlineId}`, { headers });
		toast.success("Airline deleted successfully");
		navigate("/airlines");
		} catch (error: any) {
			toast.error(error.response.data);
		}
	};
	

	const handleCancel = (event: { preventDefault: () => void }) => {
		event.preventDefault();

		navigate("/airlines");
	};

	return (
		<Container >
			<Card >
				<CardContent >
					<IconButton component={Link} sx={{ mr: 3 }} to={`/airlines`}>
						<ArrowBackIcon />
					</IconButton>{" "}
					<h3>Are you sure you want to delete this airline? This cannot be undone!</h3>
				</CardContent>
				<CardActions >
					<Button onClick={handleDelete} sx={{ color: 'white', backgroundColor: 'red' }}>Delete</Button>
					<Button onClick={handleCancel}>Cancel</Button>
				</CardActions>
			</Card>
		</Container>

	);
};