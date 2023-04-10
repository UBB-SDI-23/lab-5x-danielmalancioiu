
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

} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Passenger } from "../../models/Passenger";
import { Airline } from "../../models/Airline";
import { Flight } from "../../models/Flight";

interface TableRowData extends Flight { }

export const FlightsTable = () => {
    const [loading, setLoading] = useState(false);
    const [tableData, setTableData] = useState<TableRowData[]>([]);
    const [sortedData, setSortedData] = useState<TableRowData[]>([]);
    const [sortColumn, setSortColumn] = useState<string>("");
    const [page, setPage] = useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = useState<number>(10);



    // useEffect(() => {
    //     setLoading(true);
    //     fetch(`${BACKEND_API_URL}/flights`)
    //         .then((response) => response.json())
    //         .then((data: TableRowData[]) => {
    //             setTableData(data);
    //             setSortedData(data);
    //             setLoading(false);
    //         });
    // }, []);
    useEffect(() => {
        setLoading(true);
        fetch(`${BACKEND_API_URL}/flights?page=${page}&size=${rowsPerPage}&sort=${sortColumn}`)
          .then((response) => response.json())
          .then((data) => {
            setTableData(data.content);
            setSortedData(data.content);
            setLoading(false);
          });
      }, [page, rowsPerPage, sortColumn]);

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

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
        const startIndex = newPage * rowsPerPage;
        const endIndex = startIndex + rowsPerPage;
        setSortedData(sortedData.slice(startIndex, endIndex));
      };
    
      const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
      };
      const totalItems = sortedData.length;
      const startIndex = page * rowsPerPage;
      const endIndex = startIndex + rowsPerPage;


    return (
        <Container>
            <h1 style={{ margin: "100px 0 30px 0" }}>All flights</h1>
            {loading && <CircularProgress />}
            {!loading && tableData.length === 0 && <p>No flights found</p>}
            {!loading && (
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
                                <TableCell>
                                    <TableSortLabel
                                        active={sortColumn === "callSign"}
                                        direction={
                                            sortColumn === "callSign" ? "asc" : "desc"
                                        }
                                        onClick={() => handleSort("callSign")}
                                    >
                                        Call Sign
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell>
                                    <TableSortLabel
                                        active={sortColumn === "capacity"}
                                        direction={sortColumn === "capacity" ? "asc" : "desc"}
                                        onClick={() => handleSort("capacity")}
                                    >
                                        Capacity
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell>
                                    <TableSortLabel
                                        active={sortColumn === "departureAirport"}
                                        direction={
                                            sortColumn === "departureAirport" ? "asc" : "desc"
                                        }
                                        onClick={() => handleSort("departureAirport")}
                                    >
                                        Departure Airport
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell>
                                    <TableSortLabel
                                        active={sortColumn === "arrivalAirport"}
                                        direction={sortColumn === "arrivalAirport" ? "asc" : "desc"}
                                        onClick={() => handleSort("arrivalAirport")}
                                    >
                                        Arrival Airport
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell>
                                    <TableSortLabel
                                        active={sortColumn === "airline.name"}
                                        direction={sortColumn === "airline.name" ? "asc" : "desc"}
                                        onClick={() => handleSort("airline.name")}
                                    >
                                        Airline Name
                                    </TableSortLabel>
                                </TableCell>

                                <TableCell align="center">Operations</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {sortedData.map((row, index) => (
                                <TableRow key={row.id}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{row.callSign}</TableCell>
                                    <TableCell>{row.capacity}</TableCell>
                                    <TableCell>{row.departureAirport}</TableCell>
                                    <TableCell>{row.arrivalAirport}</TableCell>
                                    <TableCell>{row.airline?.name}</TableCell>
                                    <TableCell align="center">
                                        <IconButton
                                            component={Link}
                                            sx={{ mr: 3 }}
                                            to={`/flights/${row.id}/details`}>
                                            <Tooltip title="View flight details" arrow>
                                                <ReadMoreIcon color="primary" />
                                            </Tooltip>
                                        </IconButton>

                                        <IconButton component={Link} sx={{ mr: 3 }} to={`/flights/${row.id}/edit`}>
                                            <EditIcon />
                                        </IconButton>

                                        <IconButton component={Link} sx={{ mr: 3 }} to={`/flights/${row.id}/delete`} >
                                            <DeleteForeverIcon sx={{ color: "red" }} />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>

                    </Table>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25, 50]}
                        component="div"
                        count={totalItems}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </TableContainer>
            )}
        </Container>
    );
};
export default FlightsTable;