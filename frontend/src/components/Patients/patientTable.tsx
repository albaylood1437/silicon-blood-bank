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
import PatientForm from "../Forms/patientForm";
import Progress from "../Loading/progress";
import {
  deletePatient,
  getPatients,
  postPatients,
  updatePatient,
} from "../../services/patientServices";
import { getBloodstock } from "../../services/bloodstockServices";
import SnackPar from "../Common/snackpar";
import PatientPopForm from "../Forms/PopUpForms/patientPop";
import FilterSize from "../Common/filter";
import Search from "../Search/search";
import DeletePopUp from "../Forms/PopUpForms/deletePop";
import auth from "../../services/authServices";
import moment from "moment";

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

const isSearched = (value: string) => ({ patientname }: any) =>
  patientname.toLowerCase().includes(value.toLowerCase());

export default function PatientTable() {
  const classes = useStyles();
  const [patients, setPatients] = useState<Array<{}>>([]);
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
  const [bloodtypeItems, setBloodTypeItems] = useState(0);
  const { admin }: any = auth.getCurrentUser();
  useEffect(() => {
    const fetchpatients = async (page: number, size: number) => {
      const { data } = await getPatients(page, size);
      setTotalPages(data.totalPages);
      setTotalItems(data.totalItems);
      setPatients(data.patients);
      setLoading(false);
    };

    fetchpatients(page - 1, size);
  }, [page, size]);

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
      const { data } = await postPatients(row);
      await getBloodstock(row.stockId);
      const newpatients = [...patients, data];
      setPatients(newpatients);
      handleClick("Sucessfully posted!");
    } catch (err) {
      handleClick("Sucessfully posted!");
      setErrors(err.message);
    }
  };
  const handleDelete = async (id: number) => {
    try {
      const clonepatients = [...patients];
      const newpatients = clonepatients.filter(
        (patient: any) => patient.patientId !== id
      );
      setPatients(newpatients);
      await deletePatient(id);
      handleClick("Sucessfully deleted!");
    } catch (err) {
      handleClick("Sucessfully deleted!");
      setErrors(err.message);
      const clonepatients = [...patients];
      setPatients(clonepatients);
    }
  };

  const handleUpdate = async ({ row, id, patientData }: any) => {
    try {
      const { data } = await updatePatient({ row, id });
      const clonepatients = [...patients];
      const index = clonepatients.indexOf(patientData);
      clonepatients[index] = { ...data };
      setPatients(clonepatients);
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
          <Box p={0}>
            <FilterSize onSize={handleSize} totalItems={totalItems} />
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
                      <TableCell>Patient Id</TableCell>

                      <TableCell>Patient Name</TableCell>
                      <TableCell>Amount</TableCell>
                      <TableCell align="center">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  {patients && (
                    <TableBody>
                      {patients
                        .filter(isSearched(value))
                        .map((patient: any) => (
                          <TableRow key={patient.patientId}>
                            <TableCell>{patient.patientId} </TableCell>

                            <TableCell>{patient.patientname} </TableCell>
                            <TableCell>{`${patient.amount} unit`}</TableCell>

                            {admin && (
                              <TableCell style={{ display: "flex" }}>
                                <PatientPopForm
                                  onSubmit={handleUpdate}
                                  patient={patient}
                                  bloodstock={bloodstock}
                                />

                                <DeletePopUp
                                  item={patient.patientId}
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
              <h3>patient Form</h3>
              <PatientForm
                onSubmit={handleSubmit}
                name="add"
                patient="patient"
                bloodstock={bloodstock}
              />
            </Paper>
          </Grid>
        </Grid>
      </div>
    </Fragment>
  );
}
