
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

interface TableRowData extends PassengerBooking { }

export const PassengerReport = () => {
  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState<TableRowData[]>([]);

  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);



  useEffect(() => {
    setLoading(true);
    fetch(`${BACKEND_API_URL}/passengers/abd?page=${page}&size=${rowsPerPage}`)
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
      <h1 style={{ margin: "100px 0 30px 0" }}>Passengers Ordered By Average Booking Price</h1>
      {loading && <CircularProgress />}
      {!loading && tableData.length === 0 && <p>No passengers found</p>}
      
      {!loading && tableData.length > 0 && (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>

                  First Name

                </TableCell>
                <TableCell>

                  Last Name

                </TableCell>
                {/* <TableCell>

                  Birth Date

                </TableCell> */}
                <TableCell>

                  Nationality

                </TableCell>
                {/* <TableCell>

                  Passport Number

                </TableCell> */}
                <TableCell>

                  Average booking price

                </TableCell>
                <TableCell align="center">Operations</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData.map((row, index) => (
                <TableRow key={row.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{row.firstName}</TableCell>
                  <TableCell>{row.lastName}</TableCell>
                  {/* <TableCell>{row.dateOfBirth}</TableCell> */}
                  <TableCell>{row.nationality}</TableCell>
                  {/* <TableCell>{row.passportNumber}</TableCell> */}
                  <TableCell>{row.averagePrice.toFixed(2)}</TableCell>
                  <TableCell align="center">
                    <IconButton
                      component={Link}
                      sx={{ mr: 3 }}
                      to={`/passengers/${row.id}/details`}>
                      <Tooltip title="View passenger details" arrow>
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
export default PassengerReport;