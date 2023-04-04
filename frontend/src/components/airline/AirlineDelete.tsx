import { Container, Card, CardContent, IconButton, CardActions, Button } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import { BACKEND_API_URL } from "../../constants";


export const AirlineDelete = () => {
	const { airlineId } = useParams();
	const navigate = useNavigate();

	const handleDelete = async (event: { preventDefault: () => void }) => {
		event.preventDefault();
		await axios.delete(`${BACKEND_API_URL}/airlines/${airlineId}`);

		navigate("/airlines");
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