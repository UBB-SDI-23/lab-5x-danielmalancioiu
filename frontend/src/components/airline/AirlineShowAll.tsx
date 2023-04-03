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


export const AllAirlines = () => {
    const [loading, setLoading] = useState(false);
    const [airlines, setAirlines] = useState<Airline[]>([]);


    useEffect(() => {
        setLoading(true);
        fetch(`http://localhost:8080/api/airlines`)
            .then((response) => response.json())
            .then((data) => {
                setAirlines(data);
                setLoading(false);
            });
    }, []);

    return (
        <Container>
            <h1 style={{ margin: "100px 0 30px 0" }}>All airlines</h1>
            {loading && <CircularProgress />}
            {!loading && airlines.length === 0 && <p>No airlines found</p>}
            {!loading && (
                <IconButton component={Link} sx={{ mr: 3 }} to={`/airlines/add`}>
                    <Tooltip title="Add a new airline" arrow>
                        <AddIcon color="primary" />
                    </Tooltip>
                </IconButton>
            )}
            {!loading && airlines.length > 0 && (
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>#</TableCell>
                                <TableCell align="center">Name</TableCell>
                                <TableCell align="center">Iata Code</TableCell>
                                <TableCell align="center">Fleet Size</TableCell>
                                <TableCell align="center">Website</TableCell>
                                <TableCell align="center">Country</TableCell>
                                <TableCell align="center">Operations</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {airlines.map((airline, index) => (
                                <TableRow key={airline.id}>
                                    <TableCell component="th" scope="row">
                                        {index + 1}
                                    </TableCell>
                                    <TableCell align="center">{airline.name}</TableCell>
                                    <TableCell align="center">{airline.iataCode}</TableCell>
                                    <TableCell align="center">{airline.fleetSize}</TableCell>
                                    <TableCell align="center">{airline.website}</TableCell>
                                    <TableCell align="center">{airline.country}</TableCell>
                                    
                                    <TableCell align="center">
                                        <IconButton
                                            component={Link}
                                            sx={{ mr: 3 }}
                                            to={`/airlines/${airline.id}/details`}>
                                            <Tooltip title="View airline details" arrow>
                                                <ReadMoreIcon color="primary" />
                                            </Tooltip>
                                        </IconButton>

                                        <IconButton component={Link} sx={{ mr: 3 }} to={`/airlines/${airline.id}/edit`}>
                                            <EditIcon />
                                        </IconButton>

                                        <IconButton component={Link} sx={{ mr: 3 }} to={`/ailrines/${airline.id}/delete`} >
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
