
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

interface TableRowData extends Airline { }

export const AirlinesTable = () => {
    const [loading, setLoading] = useState(false);
    const [tableData, setTableData] = useState<TableRowData[]>([]);
    const [sortedData, setSortedData] = useState<TableRowData[]>([]);
    const [sortColumn, setSortColumn] = useState<string>("");
    const [page, setPage] = useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = useState<number>(10);

    // useEffect(() => {
    //     setLoading(true);
    //     fetch(`${BACKEND_API_URL}/airlines`)
    //         .then((response) => response.json())
    //         .then((data: TableRowData[]) => {
    //             setTableData(data);
    //             setSortedData(data);
    //             setLoading(false);
    //         });
    // }, []);

    useEffect(() => {
        setLoading(true);
        fetch(`${BACKEND_API_URL}/airlines?page=${page}&size=${rowsPerPage}&sort=${sortColumn}`)
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
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const totalItems = sortedData.length;
    const startIndex = page * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const displayedData = Array.isArray(sortedData) ? sortedData.slice(startIndex, endIndex) : [];


    return (
        <Container>
            <h1 style={{ margin: "100px 0 30px 0" }}>All airlines</h1>
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
                                    <TableSortLabel
                                        active={sortColumn === "name"}
                                        direction={
                                            sortColumn === "name" ? "asc" : "desc"
                                        }
                                        onClick={() => handleSort("name")}
                                    >
                                        Name
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell>
                                    <TableSortLabel
                                        active={sortColumn === "iataCode"}
                                        direction={
                                            sortColumn === "iataCode" ? "asc" : "desc"
                                        }
                                        onClick={() => handleSort("iataCode")}
                                    >
                                        Iata Code
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell>
                                    <TableSortLabel
                                        active={sortColumn === "fleetSize"}
                                        direction={sortColumn === "fleetSize" ? "asc" : "desc"}
                                        onClick={() => handleSort("fleetSize")}
                                    >
                                        Fleet Size
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell>
                                    <TableSortLabel
                                        active={sortColumn === "website"}
                                        direction={sortColumn === "website" ? "asc" : "desc"}
                                        onClick={() => handleSort("website")}
                                    >
                                        Website
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell>
                                    <TableSortLabel
                                        active={sortColumn === "country"}
                                        direction={sortColumn === "country" ? "asc" : "desc"}
                                        onClick={() => handleSort("country")}
                                    >
                                        Country
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell align="center">Operations</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {sortedData.map((row, index) => (
                                <TableRow key={row.id}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{row.name}</TableCell>
                                    <TableCell>{row.iataCode}</TableCell>
                                    <TableCell>{row.fleetSize}</TableCell>
                                    <TableCell>{row.website}</TableCell>
                                    <TableCell>{row.country}</TableCell>
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
export default AirlinesTable;