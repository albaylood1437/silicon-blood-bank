import Box from "@material-ui/core/Box";
import { green, pink } from "@material-ui/core/colors";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Pagination from "@material-ui/lab/Pagination";
import React, { Fragment, useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import {
  getBooking,
  postBooking,
  deleteBooking,
  updateBooking,
} from "../../services/bookingServices";
import BookingForm from "../Forms/bookingForm";
import Progress from "../Loading/progress";
import DeletePopUp from "../Forms/PopUpForms/deletePop";
import SnackPar from "../Common/snackpar";
import Search from "../Search/search";
import auth from "../../services/authServices";
import { getBloodTypes } from "../../services/bloodtypeServices";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "",
  },
  table: {
    minWidth: 100,
  },
  gridRoot: {
    flexGrow: 1,
  },

  paper: {
    padding: theme.spacing(2),
    textAlign: "left",
    color: theme.palette.text.secondary,
  },
  button: {
    cursor: `pointer`,
  },
  head: {
    backgroundColor: `#f5f5f5`,
    color: theme.palette.common.white,
    fontStyle: "fontWeightBold",
  },
  pagination: {
    margin: theme.spacing(2),
    marginTop: theme.spacing(5),
  },

  fab: {
    margin: theme.spacing(2),
    color: theme.palette.getContrastText(pink[500]),
    backgroundColor: green[600],
  },
}));

// const isSearched = (value: string) => ({ bloodtypes }: any) =>
//   bloodtypes.bloodname.toLowerCase().includes(value.toLowerCase());

export function BookingTable() {
  const classes = useStyles();
  const [booking, setBooking] = useState<Array<{}>>([]);
  const [bloodtypes, setBloodTypes] = useState<Array<{}>>([]);
  const [isLoading, setLoading] = useState(true);
  const [errors, setErrors] = useState(null);
  const [value, setValue] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [size, setSize] = useState(5);
  const { admin }: any = auth.getCurrentUser();
  const [bloodtypeItems, setBloodTypeItems] = useState(0);

  useEffect(() => {
    const fetchBooking = async (page: number, size: number) => {
      const { data } = await getBooking(page, size);
      setTotalItems(data.totalItems);
      setTotalPages(data.totalPages);
      setBooking(data.booking);
      setLoading(false);
    };
    fetchBooking(page - 1, size);
  }, [page, size]);

  useEffect(() => {
    const fetchBloodTypes = async (page: number, size: number) => {
      const { data } = await getBloodTypes((page = 0), size);
      setBloodTypeItems(data.totalItems);
      setBloodTypes(data.bloodtypes);
    };

    fetchBloodTypes(page - 1, bloodtypeItems);
  }, [page, bloodtypeItems]);

  const handleSubmit = async ({ row }: any) => {
    try {
      console.log(row);
      const { data } = await postBooking(row);
      const newbooking = [...booking, data];
      console.log(data);
      setBooking(newbooking);
      handleClick("Sucessfully posted!");
    } catch (err) {
      handleClick("err!");
      setErrors(err.message);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const clonebooking = [...booking];
      const newbooking = clonebooking.filter(
        (book: any) => book.bookingId !== id
      );
      setBooking(newbooking);
      await deleteBooking(id);
      handleClick("Sucessfully deleted!");
    } catch (err) {
      handleClick("err!");
      setErrors(err.message);
      const clonebooking = [...booking];
      setBooking(clonebooking);
    }
  };
  const fetchPaginatedData = (e: any, page: number) => {
    setPage(page);
  };
  const handleUpdate = async ({ row, id, bookData }: any) => {
    try {
      const { data } = await updateBooking({ row, id });
      const clonebooking = [...booking];
      const index = clonebooking.indexOf(bookData);
      clonebooking[index] = { ...data };
      setBooking(clonebooking);
      handleClick("Sucessfully updated!");
    } catch (err) {
      handleClick("err!");
      setErrors(err.message);
    }
  };

  const handleClick = (msg: string) => {
    setMessage(msg);
    setOpen(true);
  };

  const handleClose = (event: any, reason: any) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  const handleChange = (e: any) => {
    if (e.target.value) {
      setValue(e.target.value);
      setSize(totalItems);
    } else {
      setValue(e.target.value);
      setSize(5);
    }
  };

  return (
    <Fragment>
      <SnackPar
        errors={errors}
        handleClose={handleClose}
        success={message}
        open={open}
      />
      <Container style={{ width: "100%", marginBottom: 20 }}>
        <Box display="flex" p={1}>
          <Box p={1} flexGrow={1}>
            <Search value={value} onChange={handleChange} by="book Name" />
          </Box>
        </Box>
      </Container>

      <div className={classes.gridRoot}>
        <Grid container spacing={3}>
          <Grid item xs={5}>
            {isLoading ? (
              <Progress />
            ) : (
              <TableContainer component={Paper} className={classes.root}>
                <Table className={classes.table} aria-label="simple table">
                  <TableHead className={classes.head}>
                    <TableRow>
                      <TableCell>#ID</TableCell>
                      <TableCell>Blood Name</TableCell>
                      <TableCell>Amount</TableCell>
                      {admin && (
                        <TableCell align="center">Actions</TableCell>
                      )}{" "}
                    </TableRow>
                  </TableHead>
                  {booking && (
                    <TableBody>
                      {booking.map((book: any) => (
                        <TableRow key={book.bookingId}>
                          <TableCell component="th" scope="row">
                            {book.bookingId}
                          </TableCell>
                          <TableCell>{book.bloodtypes.bloodname}</TableCell>
                          <TableCell>{book.amount}</TableCell>

                          {admin && (
                            <TableCell style={{ display: "flex" }}>
                              <DeletePopUp
                                item={book.bookingId}
                                onDelete={handleDelete}
                              />
                            </TableCell>
                          )}
                        </TableRow>
                      ))}
                    </TableBody>
                  )}
                </Table>
              </TableContainer>
            )}
            {totalPages !== 0 ? (
              <Pagination
                className={classes.pagination}
                count={totalPages}
                page={page}
                onChange={fetchPaginatedData}
                color="primary"
              />
            ) : null}
          </Grid>
          <Grid item xs={7}>
            {admin && (
              <Paper elevation={0} variant="outlined" className={classes.paper}>
                <h3>book Form</h3>
                <BookingForm
                  onSubmit={handleSubmit}
                />
              </Paper>
            )}
          </Grid>
        </Grid>
      </div>
    </Fragment>
  );
}
