
import { useState, useEffect } from "react";
import { BACKEND_API_URL } from "../../constants";
import { Link } from "react-router-dom";
import { Booking } from "../../models/Booking";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TableSortLabel,
    Container,
    CircularProgress,
    IconButton,
    Tooltip,

} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

interface TableRowData extends Booking { }

export const SortableTable = () => {
    const [loading, setLoading] = useState(false);
    const [tableData, setTableData] = useState<TableRowData[]>([]);
    const [sortedData, setSortedData] = useState<TableRowData[]>([]);
    const [sortColumn, setSortColumn] = useState<string>("");

    useEffect(() => {
        setLoading(true);
        fetch(`${BACKEND_API_URL}/bookings`)
            .then((response) => response.json())
            .then((data: TableRowData[]) => {
                setTableData(data);
                setSortedData(data);
                setLoading(false);
            });
    }, []);

    const handleSort = (columnName: string) => {
        if (sortColumn === columnName) {
            // If clicking on the same column again, reverse the sorting order
            setSortedData([...sortedData].reverse());
        } else {
            setSortColumn(columnName);
            const newSortedData = [...sortedData].sort((a, b) => {
                const aValue = columnName
                    .split(".")
                    .reduce((obj, key) => obj?.[key], a);
                const bValue = columnName
                    .split(".")
                    .reduce((obj, key) => obj?.[key], b);
                if (aValue < bValue) return -1;
                if (aValue > bValue) return 1;
                return 0;
            });
            setSortedData(newSortedData);
        }
    };

    return (
        <Container>
            <h1 style={{ margin: "100px 0 30px 0" }}>All bookings</h1>
            {loading && <CircularProgress />}
            {!loading && tableData.length === 0 && <p>No bookings found</p>}
            {!loading && (
                <IconButton component={Link} sx={{ mr: 3 }} to={`/bookings/add`}>
                    <Tooltip title="Add a new booking" arrow>
                        <AddIcon color="primary" />
                    </Tooltip>
                </IconButton>
            )}
            {!loading && tableData.length > 0 && (
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>#</TableCell>
                                <TableCell>
                                    <TableSortLabel
                                        active={sortColumn === "flight.callSign"}
                                        direction={
                                            sortColumn === "flight.callSign" ? "asc" : "desc"
                                        }
                                        onClick={() => handleSort("flight.callSign")}
                                    >
                                        Flight
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell>
                                    <TableSortLabel
                                        active={sortColumn === "passenger.lastName"}
                                        direction={
                                            sortColumn === "passenger.lastName" ? "asc" : "desc"
                                        }
                                        onClick={() => handleSort("passenger.lastName")}
                                    >
                                        Passenger
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell>
                                    <TableSortLabel
                                        active={sortColumn === "date"}
                                        direction={sortColumn === "date" ? "asc" : "desc"}
                                        onClick={() => handleSort("date")}
                                    >
                                        Date
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell>
                                    <TableSortLabel
                                        active={sortColumn === "seatNumber"}
                                        direction={sortColumn === "seatNumber" ? "asc" : "desc"}
                                        onClick={() => handleSort("seatNumber")}
                                    >
                                        Seat Number
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell>
                                    <TableSortLabel
                                        active={sortColumn === "price"}
                                        direction={sortColumn === "price" ? "asc" : "desc"}
                                        onClick={() => handleSort("price")}
                                    >
                                        Price
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell align="center">Operations</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {sortedData.map((row,index) => (
                                <TableRow key={row.id}>
                                    <TableCell>{index+1}</TableCell>
                                    <TableCell>{row.flight?.callSign}</TableCell>
                                    <TableCell>{row.passenger?.lastName}</TableCell>
                                    <TableCell>{row.date}</TableCell>
                                    <TableCell>{row.seatNumber}</TableCell>
                                    <TableCell>{row.price}</TableCell>
                                    <TableCell align="center">
                                        <IconButton
                                            component={Link}
                                            sx={{ mr: 3 }}
                                            to={`/bookings/${row.id}/details`}>
                                            <Tooltip title="View booking details" arrow>
                                                <ReadMoreIcon color="primary" />
                                            </Tooltip>
                                        </IconButton>

                                        <IconButton component={Link} sx={{ mr: 3 }} to={`/bookings/${row.id}/edit`}>
                                            <EditIcon />
                                        </IconButton>

                                        <IconButton component={Link} sx={{ mr: 3 }} to={`/bookings/${row.id}/delete`} >
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
export default SortableTable;