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
import DonationForm from "../Forms/donationForm";
import Progress from "../Loading/progress";
import {
  deleteDonation,
  getDonations,
  postDonations,
  updateDonation,
} from "../../services/donationServices";
import {
  getBloodstock,
  updateBloodstock,
} from "../../services/bloodstockServices";
import { getDonors } from "../../services/donorServices";
import SnackPar from "../Common/snackpar";
import DonationPopForm from "../Forms/PopUpForms/donationPop";
import FilterSize from "../Common/filter";
import Search from "../Search/search";
import DeletePopUp from "../Forms/PopUpForms/deletePop";
import auth from "../../services/authServices";
import moment from "moment";
import { IconButton, Tooltip } from "@material-ui/core";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "table-cell",
  },
  table: {
    minWidth: 200,
  },
  gridRoot: {
    flexGrow: 1,
  },
  greenLight: {
    color: green[600],
    height: "34px",
  },
  report: {
    margin: theme.spacing(1),
    color: green[600],
    cursor: `pointer`,
  },
  paper: {
    padding: theme.spacing(3),
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

  editButton: {
    color: green[600],
    cursor: `pointer`,
  },
  fab: {
    margin: theme.spacing(2),
    color: theme.palette.getContrastText(pink[500]),
    backgroundColor: green[600],
  },
}));

const isSearched = (value: string) => ({ donors }: any) =>
  donors.contact.toLowerCase().includes(value.toLowerCase());

export default function DonationTable() {
  const classes = useStyles();
  const [donations, setDonations] = useState<Array<{}>>([]);
  const [donors, setDonors] = useState<Array<{}>>([]);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState(null);
  const [value, setValue] = useState<string>("");
  const [bloodstock, setBloodStock] = useState<Array<{}>>([]);
  const [isLoading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [size, setSize] = useState(5);
  const [donorItems, setDonorItems] = useState(0);
  const [bloodtypeItems, setBloodTypeItems] = useState(0);
  const { admin }: any = auth.getCurrentUser();
  useEffect(() => {
    const fetchdonations = async (page: number, size: number) => {
      const { data } = await getDonations(page, size);
      setTotalPages(data.totalPages);
      setTotalItems(data.totalItems);
      setDonations(data.donations);
      setLoading(false);
    };

    fetchdonations(page - 1, size);
  }, [page, size]);

  useEffect(() => {
    const fetchDonors = async (page: number, size: number) => {
      const { data } = await getDonors((page = 0), size);
      setDonorItems(data.totalItems);
      setDonors(data.donors);
    };

    fetchDonors(page - 1, donorItems);
  }, [page, donorItems]);

  useEffect(() => {
    const fetchBloodStock = async (page: number, size: number) => {
      const { data } = await getBloodstock((page = 0), size);
      setBloodTypeItems(data.totalItems);
      setBloodStock(data.bloodstock);
    };
    fetchBloodStock(page - 1, bloodtypeItems);
  }, [page, bloodtypeItems]);

  const fetchPaginatedData = (e: any, page: number) => {
    setPage(page);
  };
  const handleSize = (size: number) => {
    setSize(size);
    setPage(1);
  };

  const handleSubmit = async ({ row }: any) => {
    console.log(row);
    try {
      const { data } = await postDonations(row);
      await getBloodstock(row.stockId);
      const newdonations = [...donations, data];
      setDonations(newdonations);
      handleClick("Sucessfully posted!");
    } catch (err) {
      handleClick("Sucessfully posted!");
      setErrors(err.message);
    }
  };
  const handleDelete = async (id: number) => {
    try {
      const clonedonations = [...donations];
      const newdonations = clonedonations.filter(
        (donation: any) => donation.donationId !== id
      );
      setDonations(newdonations);
      await deleteDonation(id);
      handleClick("Sucessfully deleted!");
    } catch (err) {
      handleClick("Sucessfully deleted!");
      setErrors(err.message);
      const clonedonations = [...donations];
      setDonations(clonedonations);
    }
  };

  const handleUpdate = async ({ row, id, donationData }: any) => {
    try {
      const { data } = await updateDonation({ row, id });
      const clonedonations = [...donations];
      const index = clonedonations.indexOf(donationData);
      clonedonations[index] = { ...data };
      setDonations(clonedonations);
      handleClick("Sucessfully updated!");
    } catch (err) {
      handleClick("Sucessfully updated!");
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
      <Container style={{ width: "100%", marginBottom: 10 }}>
        <Box display="flex" p={1}>
          <Box p={1} flexGrow={1}>
            <Search value={value} onChange={handleChange} by="Phone Number" />
          </Box>
          <Box p={2}>
            <FilterSize onSize={handleSize} totalItems={totalItems} />
          </Box>
          <Box p={3}>
            <Tooltip title="View Report">
              <IconButton className={classes.report} aria-label="report">
                <Link
                  className={classes.greenLight}
                  to={{
                    pathname: "/dashboard/alldonationview",
                    state: {
                      donations,
                    },
                  }}
                >
                  <VisibilityIcon fontSize="large" />
                </Link>
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </Container>

      <div className={classes.gridRoot}>
        <Grid container spacing={1}>
          <Grid item xs={7}>
            {isLoading ? (
              <Progress />
            ) : (
              <TableContainer component={Paper} className={classes.root}>
                <Table className={classes.table} aria-label="simple table">
                  <TableHead className={classes.head}>
                    <TableRow>
                      <TableCell>Donor Name</TableCell>
                      <TableCell>Blood Name</TableCell>
                      <TableCell>Phone Number</TableCell>
                      <TableCell>Donation Date</TableCell>
                      <TableCell>Amount</TableCell>

                      <TableCell align="center">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  {donations && (
                    <TableBody>
                      {donations
                        .filter(isSearched(value))
                        .map((donation: any) => (
                          <TableRow key={donation.donationId}>
                            <TableCell>
                              {donation.donors.firstname}{" "}
                              {donation.donors.secondname}{" "}
                              {donation.donors.lastname}
                            </TableCell>
                            <TableCell>
                              {donation.donors.bloodtypes.bloodname}
                            </TableCell>
                            <TableCell>{donation.donors.contact}</TableCell>
                            <TableCell>
                              {moment(donation.donors.createdAt).format(
                                "DD/MM/YYYY"
                              )}
                            </TableCell>
                            <TableCell>{`${donation.amount} unit`}</TableCell>

                            {admin && (
                              <TableCell style={{ display: "flex" }}>
                                <DonationPopForm
                                  onSubmit={handleUpdate}
                                  donation={donation}
                                  bloodstock={bloodstock}
                                />

                                <DeletePopUp
                                  item={donation.donationId}
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
          <Grid item xs={5}>
            <Paper elevation={0} variant="outlined" className={classes.paper}>
              <h3>Donation Form</h3>
              <DonationForm
                onSubmit={handleSubmit}
                name="add"
                donation="donation"
                bloodstock={bloodstock}
              />
            </Paper>
          </Grid>
        </Grid>
      </div>
    </Fragment>
  );
}
