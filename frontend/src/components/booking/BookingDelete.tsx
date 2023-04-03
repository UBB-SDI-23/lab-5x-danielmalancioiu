import { Container, Card, CardContent, IconButton, CardActions, Button } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";


export const BookingDelete = () => {
	const { bookingId } = useParams();
	const navigate = useNavigate();

	const handleDelete = async (event: { preventDefault: () => void }) => {
		event.preventDefault();
		await axios.delete(`http://localhost:8080/api/bookings/${bookingId}`);

		navigate("/bookings");
	};

	const handleCancel = (event: { preventDefault: () => void }) => {
		event.preventDefault();

		navigate("/bookings");
	};

	return (
		<Container >
			<Card >
				<CardContent >
					<IconButton component={Link} sx={{ mr: 3 }} to={`/bookings`}>
						<ArrowBackIcon />
					</IconButton>{" "}
					<h3>Are you sure you want to delete this booking? This cannot be undone!</h3>
				</CardContent>
				<CardActions >
					<Button onClick={handleDelete} sx={{ color: 'white', backgroundColor: 'red' }}>Delete</Button>
					<Button onClick={handleCancel}>Cancel</Button>
				</CardActions>
			</Card>
		</Container>

	);
};