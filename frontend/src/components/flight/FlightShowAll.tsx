import {
    TableContainer,
    Paper,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    CircularProgress,
    Container,
    IconButton,
    Tooltip,
    Button,
    DialogActions,
} from "@mui/material";
import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Booking } from "../../models/Booking";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddIcon from "@mui/icons-material/Add";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { Flight } from "../../models/Flight";
import { BACKEND_API_URL } from "../../constants";
import { ArrowDropDown, ArrowDropUp } from "@mui/icons-material";

export const AllFlights = () => {
    const [loading, setLoading] = useState(false);
    const [flights, setFlights] = useState<Flight[]>([]);
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
	const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');


    useEffect(() => {
        setLoading(true);
        fetch(`${BACKEND_API_URL}/flights`)
            .then((response) => response.json())
            .then((data) => {
                setFlights(data);
                setLoading(false);
            });
    }, []);

    const sortFlights = () => {
		if (sortOrder === 'asc') {
			setFlights(prevState => [...prevState.sort((a, b) => a.capacity - b.capacity)]);
			setSortOrder('desc');
			setSortDirection('desc');
		} else {
			setFlights(prevState => [...prevState.sort((a, b) => b.capacity - a.capacity)]);
			setSortOrder('asc');
			setSortDirection('asc');
		}
	}

    return (
        <Container>
            <h1 style={{ margin: "100px 0 30px 0" }}>All flights</h1>
            {loading && <CircularProgress />}
            {!loading && flights.length === 0 && <p>No flights found</p>}
            {!loading && (
                <IconButton component={Link} sx={{ mr: 3 }} to={`/flights/add`}>
                    <Tooltip title="Add a new flight" arrow>
                        <AddIcon color="primary" />
                    </Tooltip>
                </IconButton>
            )}
            {!loading && flights.length > 0 && (
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>#</TableCell>
                                <TableCell align="center">Call Sign</TableCell>
                                <TableCell align="center" onClick={sortFlights} style={{ cursor: 'pointer' }}>
									<span>Capacity</span>
									{sortOrder === 'asc' ? <ArrowDropUp style={{ fontSize: 18 }} /> : <ArrowDropDown style={{ fontSize: 18 }} />}
								</TableCell>
                                <TableCell align="center">Departure Arirport</TableCell>
                                <TableCell align="center">Arrival Airport</TableCell>
                                <TableCell align="center">Airline Name</TableCell>
                                <TableCell align="center">Operations</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {flights.map((flight, index) => (
                                <TableRow key={flight.id}>
                                    <TableCell component="th" scope="row">
                                        {index + 1}
                                    </TableCell>
                                    <TableCell align="center">{flight.callSign}</TableCell>
                                    <TableCell align="center">{flight.capacity}</TableCell>
                                    <TableCell align="center">{flight.departureAirport}</TableCell>
                                    <TableCell align="center">{flight.arrivalAirport}</TableCell>
                                    <TableCell align="center">
                                    <Link to={`/airlines/${flight.airline?.id}/details`} title="View airline details">
											{flight.airline?.name}
										</Link>
                                        
                                    </TableCell>
                                    <TableCell align="center">
                                        <IconButton
                                            component={Link}
                                            sx={{ mr: 3 }}
                                            to={`/flights/${flight.id}/details`}>
                                            <Tooltip title="View flight details" arrow>
                                                <ReadMoreIcon color="primary" />
                                            </Tooltip>
                                        </IconButton>

                                        <IconButton component={Link} sx={{ mr: 3 }} to={`/flights/${flight.id}/edit`}>
                                            <EditIcon />
                                        </IconButton>

                                        <IconButton component={Link} sx={{ mr: 3 }} to={`/flights/${flight.id}/delete`} >
                                            <DeleteForeverIcon sx={{ color: "red" }} />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </Container>
    );
};
