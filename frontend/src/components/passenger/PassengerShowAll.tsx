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
import { Airline } from "../../models/Airline";
import { Passenger } from "../../models/Passenger";
import { BACKEND_API_URL } from "../../constants";

export const AllPassengers = () => {
    const [loading, setLoading] = useState(false);
    const [passengers, setPassengers] = useState<Passenger[]>([]);


    useEffect(() => {
        setLoading(true);
        fetch(`${BACKEND_API_URL}/passengers`)
            .then((response) => response.json())
            .then((data) => {
                setPassengers(data);
                setLoading(false);
            });
    }, []);

    return (
        <Container>
            <h1 style={{ margin: "100px 0 30px 0" }}>All passengers</h1>
            {loading && <CircularProgress />}
            {!loading && passengers.length === 0 && <p>No passengers found</p>}
            {!loading && (
                <IconButton component={Link} sx={{ mr: 3 }} to={`/passengers/add`}>
                    <Tooltip title="Add a new passenger" arrow>
                        <AddIcon color="primary" />
                    </Tooltip>
                </IconButton>
            )}
            {!loading && passengers.length > 0 && (
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>#</TableCell>
                                <TableCell align="center">First Name</TableCell>
                                <TableCell align="center">Last Name</TableCell>
                                <TableCell align="center">Date of Birth</TableCell>
                                <TableCell align="center">Nationality</TableCell>
                                <TableCell align="center">Passport Number</TableCell>
                                <TableCell align="center">Operations</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {passengers.map((passenger, index) => (
                                <TableRow key={passenger.id}>
                                    <TableCell component="th" scope="row">
                                        {index + 1}
                                    </TableCell>
                                    <TableCell align="center">{passenger.firstName}</TableCell>
                                    <TableCell align="center">{passenger.lastName}</TableCell>
                                    <TableCell align="center">{passenger.dateOfBirth}</TableCell>
                                    <TableCell align="center">{passenger.nationality}</TableCell>
                                    <TableCell align="center">{passenger.passportNumber}</TableCell>
                                    
                                    <TableCell align="center">
                                        <IconButton
                                            component={Link}
                                            sx={{ mr: 3 }}
                                            to={`/passengers/${passenger.id}/details`}>
                                            <Tooltip title="View passenger details" arrow>
                                                <ReadMoreIcon color="primary" />
                                            </Tooltip>
                                        </IconButton>

                                        <IconButton component={Link} sx={{ mr: 3 }} to={`/passengers/${passenger.id}/edit`}>
                                            <EditIcon />
                                        </IconButton>

                                        <IconButton component={Link} sx={{ mr: 3 }} to={`/passengers/${passenger.id}/delete`} >
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
