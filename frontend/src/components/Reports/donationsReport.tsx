import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import { blue } from "@material-ui/core/colors";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import AssignmentIcon from "@material-ui/icons/Assignment";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Box, Container, IconButton, Tooltip } from "@material-ui/core";
import generatePDF from "../../services/donationReport";
// import { useField, useFormikContext } from "formik";
import DatePicker from "react-datepicker";
import moment from "moment";
const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
    maxWidth: "99.999994%",
  },
  report: {
    margin: theme.spacing(1),
    color: blue[600],
    cursor: `pointer`,
  },
  head: {
    backgroundColor: `#f5f5f5`,
    color: theme.palette.common.white,
    fontStyle: "fontWeightBold",
  },
  uniqueName: {
    border: `1px solid rgba(224, 224, 224, 1)`,
  },
}));

export default function AllDonationView(props: any) {
  const [value, setValue] = React.useState<Date | null>(null);
  console.log(value);
  const classes = useStyles();
  const DatePickerField = () => {
    const [startDate, setStartDate] = React.useState<Date | null>(new Date());
    // const { setFieldValue } = useFormikContext();
    // const [field] = useField(props);
    return (
      <>
        <div>Filter</div>
        <div
          style={{
            margin: "4px 0 15px 0",
            border: "2px solid #eee",
            display: "inline-block",
          }}
        >
          <DatePicker
            selected={value}
            onChange={(val: Date | null): void => {
              setStartDate(val);
              setValue(val);
            }}
          />
        </div>
      </>
    );
  };

  return (
    <>
      {props.location.state !== undefined ? (
        <>
          <Container style={{ marginBottom: "-40px" }}>
            <Box display="flex" p={1}>
              <Box p={1} flexGrow={1}>
                <DatePickerField />
              </Box>
              <Box p={1}>
                <Tooltip title="Create Report">
                  <IconButton
                    className={classes.report}
                    onClick={() => generatePDF(props.location.state.donations)}
                    aria-label="report"
                  >
                    <AssignmentIcon fontSize="large" />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>
          </Container>
          <RenderDonations
            donations={props.location.state.donations}
            value={value}
          />
        </>
      ) : (
        <h4>Select Report</h4>
      )}
    </>
  );
}

const RenderDonations = ({ donations, value }: any) => {
  const isFiltered = (value: any) => ({ createdAt }: any) =>
    moment(createdAt).format("DD/MM/YYYY") ===
    moment(value).format("DD/MM/YYYY");
  const classes = useStyles();

  return (
    <>
      <h2>Donations Report</h2>
      <TableContainer component={Paper}>
        <Table
          className={classes.table}
          size="medium"
          aria-label="a dense table"
        >
          <TableHead className={classes.head}>
            <TableRow>
              <TableCell>Donation Name</TableCell>
              <TableCell align="left">Blood Type</TableCell>
              <TableCell align="left">Donation Date</TableCell>
              <TableCell align="left">Amount</TableCell>
            </TableRow>
          </TableHead>
          {donations && (
            <TableBody>
              {value === null
                ? donations.map((donation: any) => (
                    <TableRow key={donation.donationId}>
                      <TableCell className={classes.uniqueName}>
                        {donation.donors.firstname} {donation.donors.secondname}{" "}
                        {donation.donors.lastname}
                      </TableCell>
                      <TableCell className={classes.uniqueName}>
                        {donation.donors.bloodtypes.bloodname}
                      </TableCell>
                      <TableCell className={classes.uniqueName}>
                        {moment(donation.createdAt).format("DD/MM/YYYY")}
                      </TableCell>
                      <TableCell className={classes.uniqueName}>
                        {donation.amount}
                      </TableCell>
                    </TableRow>
                  ))
                : donations.filter(isFiltered(value)).map((donation: any) => (
                    <TableRow key={donation.donationId}>
                      <TableCell className={classes.uniqueName}>
                        {donation.donors.firstname} {donation.donors.secondname}{" "}
                        {donation.donors.lastname}
                      </TableCell>
                      <TableCell className={classes.uniqueName}>
                        {donation.donors.bloodtypes.bloodname}
                      </TableCell>
                      <TableCell className={classes.uniqueName}>
                        {moment(donation.createdAt).format("DD/MM/YYYY")}
                      </TableCell>
                      <TableCell className={classes.uniqueName}>
                        {donation.amount}
                      </TableCell>
                    </TableRow>
                  ))}
            </TableBody>
          )}
        </Table>
      </TableContainer>
    </>
  );
};
