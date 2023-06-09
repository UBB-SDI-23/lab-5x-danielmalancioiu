
import { useState, useEffect } from "react";
import { BACKEND_API_URL } from "../../constants";
import { Link, useParams } from "react-router-dom";
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
    Select,
    MenuItem,
    SelectChangeEvent,
    TextField,
    Button,

} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import BarChartIcon from '@mui/icons-material/BarChart';
import { Passenger } from "../../models/Passenger";
import { Airline } from "../../models/Airline";
import { ArrowBack } from "@mui/icons-material";
import { StorageService } from "../../services/StorageService";
import { toast } from "react-toastify";

interface TableRowData extends Airline { }

export const AirlinesFiltered = () => {
    const [loading, setLoading] = useState(false);
    const [tableData, setTableData] = useState<TableRowData[]>([]);
    const [page, setPage] = useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = useState<number>(10);
    const [totalPages, setTotalPages] = useState(0);
    const [fleetSize1, setFleetSize1] = useState('');
    const { fleetSize } = useParams();



    useEffect(() => {
        // setLoading(true);
        // fetch(`${BACKEND_API_URL}/airlines/filter/${fleetSize}?page=${page}&size=${rowsPerPage}`)
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

                const response2 = await fetch(`${BACKEND_API_URL}/airlines/filter/${fleetSize}?page=${page}&size=${settings}`);
                const data = await response2.json();
                setTableData(data.content);
                setTotalPages(data.totalPages);
            } catch (error) {
                console.log(error);
            }

            setLoading(false);
        };
        const fetchDataGuest = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${BACKEND_API_URL}/airlines/filter/${fleetSize}?page=${page}&size=${rowsPerPage}`);
                const data = await response.json();
                setTableData(data.content);
                setTotalPages(data.totalPages);
                console.log(data);
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



    const handleFleetSizeChange = (event: any) => {
        setFleetSize1(event.target.value);
    };


    const startIndex = page * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;


    return (
        <Container>
            
   
            <h1 style={{ margin: "100px 0 30px 0" }}>All airlines</h1> 
                    <IconButton component={Link} sx={{ mr: 3, fontSize: "16px", color: "#444", borderRadius: "12px", "&:hover": { backgroundColor: "#E0E0E0" } }} to={`/airlines`} >
                    <ArrowBack sx={{ fontSize: "20px", mr: "8px" }} /> 
            </IconButton>
            <IconButton component={Link} sx={{ mr: 3, fontSize: "16px", color: "#444", borderRadius: "12px", "&:hover": { backgroundColor: "#E0E0E0" } }} to={`/airlines/statistics`} >
                <BarChartIcon sx={{ fontSize: "20px", mr: "8px" }} /> Airline Statistics
            </IconButton>
            
            {loading && <CircularProgress />}
            {!loading && tableData.length === 0 && <p>No airlines found</p>}
            {!loading && (
                <IconButton component={Link} sx={{ mr: 3 }} to={`/airlines/add`}>
                    <Tooltip title="Add a new airline" arrow>
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
                                    Name
                                </TableCell>
                                <TableCell>

                                    Iata Code

                                </TableCell>
                                <TableCell>
                                    Fleet Size

                                </TableCell>
                                <TableCell>
                                    Website

                                </TableCell>
                                <TableCell>
                                    Country

                                </TableCell>
                                <TableCell>Added by</TableCell>
                                
                                <TableCell align="center">Operations</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tableData.map((row, index) => (
                                <TableRow key={row.id}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{row.name}</TableCell>
                                    <TableCell>{row.iataCode}</TableCell>
                                    <TableCell>{row.fleetSize}</TableCell>
                                    <TableCell>{row.website}</TableCell>
                                    <TableCell>{row.country}</TableCell>
                                    <TableCell><Link to={`/profile/${row.username}`}>{row.username}</Link></TableCell>
                                    <TableCell align="center">
                                        <IconButton
                                            component={Link}
                                            sx={{ mr: 3 }}
                                            to={`/airlines/${row.id}/details`}>
                                            <Tooltip title="View airline details" arrow>
                                                <ReadMoreIcon color="primary" />
                                            </Tooltip>
                                        </IconButton>

                                        <IconButton component={Link} sx={{ mr: 3 }} to={`/airlines/${row.id}/edit`}>
                                            <EditIcon />
                                        </IconButton>

                                        <IconButton component={Link} sx={{ mr: 3 }} to={`/airlines/${row.id}/delete`} >
                                            <DeleteForeverIcon sx={{ color: "red" }} />
                                        </IconButton>
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
export default AirlinesFiltered;