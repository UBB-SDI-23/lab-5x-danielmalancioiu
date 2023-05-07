import { useState, useEffect, SetStateAction } from "react";
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
import BarChartIcon from '@mui/icons-material/BarChart';

interface TableRowData extends Passenger { }

export const PassengersTable = () => {
    const [loading, setLoading] = useState(false);
    const [tableData, setTableData] = useState<TableRowData[]>([]);
    const [page, setPage] = useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = useState<number>(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        setLoading(true);
        fetch(`${BACKEND_API_URL}/passengers?page=${page}&size=${rowsPerPage}`)
            .then((response) => response.json())
            .then((data) => {
                setTableData(data.content);
                setTotalPages(data.totalPages);
                setLoading(false);
            });
    }, [page, rowsPerPage]);

    const handleChangePage = (event: any, newPage: number) => {
        setPage(newPage);
        
    };
    
    const startIndex = page * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;

    return (
        <Container>
            <h1 style={{ margin: "100px 0 30px 0" }}>All passengers</h1>
            <IconButton component={Link} sx={{ mr: 3, fontSize: "16px", color: "#444", borderRadius: "12px", "&:hover": { backgroundColor: "#E0E0E0" } }} to={`/passengers/statistics`} >
                <BarChartIcon sx={{ fontSize: "20px", mr: "8px" }} /> Passengers Statistics
            </IconButton>
            {loading && <CircularProgress />}
            {!loading && tableData.length === 0 && <p>No passengers found</p>}
            {!loading && (
                <IconButton component={Link} sx={{ mr: 3 }} to={`/passengers/add`}>
                    <Tooltip title="Add a new passenger" arrow>
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
                                <TableCell>First Name</TableCell>
                                <TableCell>Last Name</TableCell>
                                <TableCell>Birth Date</TableCell>
                                <TableCell>Nationality</TableCell>
                                <TableCell>Passport Number</TableCell>
                                <TableCell> Number of Bookings</TableCell>
                                <TableCell >Added By</TableCell>
                                <TableCell >Operations</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tableData.map((row, index) => (
                                <TableRow key={row.id}>
                                    <TableCell align="center">{index + 1}</TableCell>
                                    <TableCell align="center">{row.firstName}</TableCell>
                                    <TableCell align="center">{row.lastName}</TableCell>
                                    <TableCell align="center">{row.dateOfBirth}</TableCell>
                                    <TableCell align="center">{row.nationality}</TableCell>
                                    <TableCell align="center">{row.passportNumber}</TableCell>
                                    <TableCell align="center">{row.numberOfBookings}</TableCell>
                                    <TableCell align="center" >
                                        <Link to={`/profile/${row.username}`}>{row.username}</Link>
                                    </TableCell>
                                    <TableCell align="center">
                                        <IconButton
                                            component={Link}
                                            sx={{ mr: 3 }}
                                            to={`/passengers/${row.id}/details`}>
                                            <Tooltip title="View passenger details" arrow>
                                                <ReadMoreIcon color="primary" />
                                            </Tooltip>
                                        </IconButton>

                                        <IconButton component={Link} sx={{ mr: 3 }} to={`/passengers/${row.id}/edit`}>
                                            <EditIcon />
                                        </IconButton>

                                        <IconButton component={Link} sx={{ mr: 3 }} to={`/passengers/${row.id}/delete`} >
                                            <DeleteForeverIcon sx={{ color: "red" }} />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>

                    </Table>
                    <Pagination
                        count={totalPages-1}
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
export default PassengersTable;