import { Container, Card, CardContent, IconButton, CardActions, Button } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";


export const FlightDelete = () => {
	const { flightId } = useParams();
	const navigate = useNavigate();

	const handleDelete = async (event: { preventDefault: () => void }) => {
		event.preventDefault();
		await axios.delete(`http://localhost:8080/api/flights/${flightId}`);

		navigate("/flights");
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