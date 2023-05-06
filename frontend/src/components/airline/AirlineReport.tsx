
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
import { PassengerBooking } from "../../models/PassengerBooking";
import { AirlineCapacity } from "../../models/AirlineCapacity";

interface TableRowData extends AirlineCapacity { }

export const AirlineReport = () => {
  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState<TableRowData[]>([]);

  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);



  useEffect(() => {
    setLoading(true);
    fetch(`${BACKEND_API_URL}/airlines/statistics?page=${page}&size=${rowsPerPage}`)
      .then((response) => response.json())
      .then((data) => {

        setTableData(data.content);
        setTotalPages(data.totalPages);
        setLoading(false);
      });
  }, [page, rowsPerPage]);

  const handleChangePage = (event: any, newPage: number) => {
    setPage(newPage);
    console.log("newPage", newPage);
  };


  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  return (
    <Container>
      <h1 style={{ margin: "100px 0 30px 0" }}>Airlines Ordered By Average Flight Capacity</h1>
      {loading && <CircularProgress />}
      {!loading && tableData.length === 0 && <p>No airlines found</p>}
      
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
                {/* <TableCell>

                  Fleet Size

                </TableCell>
                <TableCell>

                  Website

                </TableCell> */}
                <TableCell>

                  Country

                </TableCell>
                <TableCell>

                  Average flights capacity

                </TableCell>
                <TableCell align="center">Operations</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData.map((row, index) => (
                <TableRow key={row.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.iataCode}</TableCell>
                  {/* <TableCell>{row.fleetSize}</TableCell> */}
                  {/* <TableCell>{row.website}</TableCell> */}
                  <TableCell>{row.country}</TableCell>
                  <TableCell>{row.averageFlightCapacity.toFixed(2)}</TableCell>
                  <TableCell align="center">
                    <IconButton
                      component={Link}
                      sx={{ mr: 3 }}
                      to={`/airlines/${row.id}/details`}>
                      <Tooltip title="View airline details" arrow>
                        <ReadMoreIcon color="primary" />
                      </Tooltip>
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
export default AirlineReport;