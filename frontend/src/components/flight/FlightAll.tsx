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
    TablePagination,
    Pagination,

} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Passenger } from "../../models/Passenger";
import { Airline } from "../../models/Airline";
import { Flight } from "../../models/Flight";
import { StorageService } from "../../services/StorageService";
import { toast } from "react-toastify";

interface TableRowData extends Flight { }

export const FlightsTable = () => {
    const [loading, setLoading] = useState(false);
    const [tableData, setTableData] = useState<TableRowData[]>([]);
    const [totalPages, setTotalPages] = useState(0);
    const [page, setPage] = useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = useState<number>(10);
    const [message, setMessage] = useState('');
    useEffect(() => {
        // setLoading(true);
        // fetch(`${BACKEND_API_URL}/flights?page=${page}&size=${rowsPerPage}`)
        //     .then((response) => response.json())
        //     .then((data) => {
        //         setTableData(data.content);
        //         setTotalPages(data.totalPages);
        //         setLoading(false);
        //     });
        const fetchDataUser = async () => {
            setLoading(true);

            try {
                const response = await fetch(`${BACKEND_API_URL}/user/rows-per-page/${StorageService.getUser()?.id}`);
                const settings = await response.json();
                if (StorageService.isLoggedIn()) {
                    setRowsPerPage(settings);
                    console.log(rowsPerPage);
                }

                const response2 = await fetch(`${BACKEND_API_URL}/flights?page=${page}&size=${settings}`);
                const data = await response2.json();
                if (response2.status === 404) {
                    setMessage("No flights found");
                } else {
                    setTableData(data.content);
                    setTotalPages(data.totalPages);
                }
            } catch (error) {
                console.log(error);
            }

            setLoading(false);
        };
        const fetchDataGuest = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${BACKEND_API_URL}/flights?page=${page}&size=${rowsPerPage}`);
                const data = await response.json();
                if (response.status === 404) {
                    setMessage("No airlines found");
                } else {
                    setTableData(data.content);
                    setTotalPages(data.totalPages);
                }
            } catch (error: any) {
               toast.error(error.message);
            }
            setLoading(false);
        }
        if (StorageService.isLoggedIn()) {
            fetchDataUser();
        } else {
    
            fetchDataGuest();
        }
    }, [page]);


    const handleChangePage = (event: any, newPage: number) => {
        setPage(newPage);
    };


    const startIndex = page * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;

    return (
        <Container>
            <h1 style={{ margin: "100px 0 30px 0" }}>All flights</h1>
            {loading && <CircularProgress />}
            {!loading && tableData.length === 0 && <p>No flights found</p>}
            {!loading && StorageService.isLoggedIn() && (
                <IconButton component={Link} sx={{ mr: 3 }} to={`/flights/add`}>
                    <Tooltip title="Add a new flight" arrow>
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
                                <TableCell> Call Sign</TableCell>
                                <TableCell> Capacity</TableCell>
                                <TableCell> Departure Airport</TableCell>
                                <TableCell> Arrival Airport</TableCell>
                                <TableCell> Airline Name</TableCell>
                                <TableCell> Number of bookings</TableCell>
                                <TableCell>Added By</TableCell>
                                <TableCell> Operations</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tableData.map((row, index) => (
                                <TableRow key={row.id}>
                                    <TableCell align="center">{index + 1}</TableCell>
                                    <TableCell align="center">{row.callSign}</TableCell>
                                    <TableCell align="center">{row.capacity}</TableCell>
                                    <TableCell align="center">{row.departureAirport}</TableCell>
                                    <TableCell align="center">{row.arrivalAirport}</TableCell>
                                    <TableCell align="center">{row.airline?.name}</TableCell>
                                    <TableCell align="center">{row.numberOfBookings}</TableCell>
                                    <TableCell align="center" >
                                        <Link to={`/profile/${row.username}`}>{row.username}</Link>
                                    </TableCell>
                                    <TableCell align="center">
                                        <IconButton component={Link} sx={{ mr: 3 }} to={`/flights/${row.id}/details`}>
                                            <Tooltip title="View flight details" arrow>
                                                <ReadMoreIcon color="primary" />
                                            </Tooltip>
                                        </IconButton>

                                        {StorageService.isLoggedIn() && (
                                            <>
                                        <IconButton component={Link} sx={{ mr: 3 }} to={`/flights/${row.id}/edit`}>
                                            <EditIcon />
                                        </IconButton>

                                        <IconButton component={Link} sx={{ mr: 3 }} to={`/flights/${row.id}/delete`} >
                                            <DeleteForeverIcon sx={{ color: "red" }} />
                                        </IconButton>
                                        </>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>

                    </Table>
                    <Pagination
                        count={totalPages - 1}
                        page={page}
                        defaultPage={1}
                        boundaryCount={2}
                        onChange={handleChangePage}
                    />
                </TableContainer>
            )}
        </Container>
    );
};
export default FlightsTable;