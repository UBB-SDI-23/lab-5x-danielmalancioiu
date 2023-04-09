
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
import { Passenger } from "../../models/Passenger";

interface TableRowData extends Passenger { }

export const PassengersTable = () => {
    const [loading, setLoading] = useState(false);
    const [tableData, setTableData] = useState<TableRowData[]>([]);
    const [sortedData, setSortedData] = useState<TableRowData[]>([]);
    const [sortColumn, setSortColumn] = useState<string>("");

    useEffect(() => {
        setLoading(true);
        fetch(`${BACKEND_API_URL}/passengers`)
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
            <h1 style={{ margin: "100px 0 30px 0" }}>All passengers</h1>
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
                                <TableCell>
                                    <TableSortLabel
                                        active={sortColumn === "firstName"}
                                        direction={
                                            sortColumn === "firstName" ? "asc" : "desc"
                                        }
                                        onClick={() => handleSort("firstName")}
                                    >
                                        First Name
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell>
                                    <TableSortLabel
                                        active={sortColumn === "lastName"}
                                        direction={
                                            sortColumn === "lastName" ? "asc" : "desc"
                                        }
                                        onClick={() => handleSort("lastName")}
                                    >
                                        Last Name
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell>
                                    <TableSortLabel
                                        active={sortColumn === "dateOfBirth"}
                                        direction={sortColumn === "dateOfBirth" ? "asc" : "desc"}
                                        onClick={() => handleSort("dateOfBirth")}
                                    >
                                        Birth Date
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell>
                                    <TableSortLabel
                                        active={sortColumn === "nationality"}
                                        direction={sortColumn === "nationality" ? "asc" : "desc"}
                                        onClick={() => handleSort("nationality")}
                                    >
                                        Nationality
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell>
                                    <TableSortLabel
                                        active={sortColumn === "passportNumber"}
                                        direction={sortColumn === "passportNumber" ? "asc" : "desc"}
                                        onClick={() => handleSort("passportNumber")}
                                    >
                                        Passport Number
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell align="center">Operations</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {sortedData.map((row,index) => (
                                <TableRow key={row.id}>
                                    <TableCell>{index+1}</TableCell>
                                    <TableCell>{row.firstName}</TableCell>
                                    <TableCell>{row.lastName}</TableCell>
                                    <TableCell>{row.dateOfBirth}</TableCell>
                                    <TableCell>{row.nationality}</TableCell>
                                    <TableCell>{row.passportNumber}</TableCell>
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
                </TableContainer>
            )}
        </Container>
    );
};
export default PassengersTable;