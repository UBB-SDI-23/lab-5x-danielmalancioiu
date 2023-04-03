import { Card, CardActions, CardContent, IconButton } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Booking } from "../../models/Booking";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Flight } from "../../models/Flight";
import { Airline } from "../../models/Airline";
import { AirlineCapacity } from "../../models/AirlineCapacity";
import { Passenger } from "../../models/Passenger";

export const PassengerDetails = () => {
    const { passengerId } = useParams();
    const [passenger, setPassenger] = useState<Passenger>();
    const [passengerCapacity, setPassengerCapacity] = useState<Passenger>();

    useEffect(() => {
        const fetchPassenger = async () => {
            const response = await fetch(`http://localhost:8080/api/passengers/${passengerId}`);
            const response1 = await fetch(`http://localhost:8080/api/passengers/${passengerId}/averagePrice`);
            const passenger = await response.json();
            const passengerCapacity = await response1.json();

            setPassenger(passenger);
            setPassengerCapacity(passengerCapacity);
        };
        fetchPassenger();
    }, [passengerId]);

    return (
        <Container>
            <Card>
                <CardContent>
                    <IconButton component={Link} sx={{ mr: 3 }} to={`/passengers`}>
                        <ArrowBackIcon />
                    </IconButton>{" "}
                    <div>
                    <h1>Passenger Details</h1>
                    <p>First name : {passenger?.firstName}</p>
                    <p>Last name : {passenger?.lastName}</p>
                    <p>Date Of Birth : {passenger?.dateOfBirth}</p>
                    <p>Nationality : {passenger?.nationality}</p>
                    <p>Passport Number : {passenger?.passportNumber}</p>
                    <p>Average price: {passengerCapacity?.averagePrice?.toFixed(2)}</p>
                    <h2>Bookings :</h2>
                    <table style={{  textAlign: 'center' }}>
                        <thead>
                            <tr>
                                <th style={{ padding: '0.5rem', textAlign: 'center' }}>Flight</th>
                                <th style={{ padding: '0.5rem', textAlign: 'center' }}>Date</th>
                                <th style={{ padding: '0.5rem', textAlign: 'center' }}>Seat No.</th>
                                <th style={{ padding: '0.5rem', textAlign: 'center' }}>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {passenger?.bookings?.map((booking) => (
                                <tr key={booking.id}>
                                    <td style={{ padding: '0.5rem', textAlign: 'center' }}>{booking.flight?.callSign}</td>
                                    <td style={{ padding: '0.5rem', textAlign: 'center' }}>{booking.date}</td>
                                    <td style={{ padding: '0.5rem', textAlign: 'center' }}>{booking.seatNumber}</td>
                                    <td style={{ padding: '0.5rem', textAlign: 'center' }}>{booking.price.toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    </div>




                </CardContent>
                <CardActions>
                    <IconButton component={Link} sx={{ mr: 3 }} to={`/passengers/${passengerId}/edit`}>
                        <EditIcon />
                    </IconButton>

                    <IconButton component={Link} sx={{ mr: 3 }} to={`/passengers/${passengerId}/delete`}>
                        <DeleteForeverIcon sx={{ color: "red" }} />
                    </IconButton>
                </CardActions>
            </Card>
        </Container >
    );
};