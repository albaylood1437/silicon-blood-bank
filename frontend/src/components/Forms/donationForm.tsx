import React from "react";
import { Field, Form, Formik, FormikProps } from "formik";
import * as Yup from "yup";
import { makeStyles } from "@material-ui/core/styles";
import { green, pink } from "@material-ui/core/colors";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import { getDonors } from "../../services/donorServices";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "100%",
      height: "38ch",
    },
  },
  color: {
    backgroundColor: green[600],
    color: theme.palette.getContrastText(pink[500]),
  },
  formControl: {
    marginRight: theme.spacing(1),
    minWidth: 200,
  },
}));

interface Props {
  onSubmit: (data: any) => void;
  name: string;
  donation?: any;
  bloodstock: any;
  onClick?: () => void;
}

const DonationForm: React.FC<Props> = ({
  onSubmit,
  bloodstock,
  name,
  donation,
  onClick,
}) => {
  const [donors, setDonors] = React.useState<Array<{}>>([]);

  const InputField = ({ field, form, ...props }: any) => {
    return <TextField {...props} {...field} />;
  };

  const fetchDonors = async (bloodtype: any) => {
    const { data } = await getDonors();
    const donors = data.donors.filter(
      ({ bloodtypes }: any) => bloodtypes.bloodname === bloodtype
    );
    setDonors(donors);
  };

  const BloodStockField = ({ field, form, ...props }: any) => {
    return (
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">StockId</InputLabel>
        <Select {...props} {...field}>
          {bloodstock.map((stock: any) => (
            <MenuItem
              key={stock.stockId}
              onClick={() => fetchDonors(stock.bloodtypes.bloodname)}
              value={stock.stockId}
            >
              {stock.bloodtypes.bloodname}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  };
  const DonorField = ({ field, form, ...props }: any) => {
    return (
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">DonorId</InputLabel>
        <Select {...props} {...field}>
          {donors.map((donor: any) => (
            <MenuItem key={donor.donorId} value={donor.donorId}>
              {donor.firstname} {donor.secondname} {donor.lastname}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  };

  const validationSchema: any = Yup.object({
    stockId: Yup.number().required("stockId is required"),
    donorId: Yup.number().required("donorId is required"),
    amount: Yup.number().required("amount is required"),
  });

  const addValues = {
    stockId: undefined,
    donorId: undefined,
    amount: undefined,
  };

  const editValues = donation && {
    stockId: donation.stockId,
    donorId: donation.donorId,
    amount: donation.amount,
  };
  const values = name === "edit" ? editValues : addValues;
  const classes = useStyles();
  return (
    <Formik
      onSubmit={(data, { resetForm }) => {
        onSubmit({
          row: data,
          id: donation.donationId,
          donationData: donation,
        });
        if (name !== "edit") resetForm();
      }}
      initialValues={values}
      validationSchema={validationSchema}
    >
      {({ errors, touched, isValid }: FormikProps<any>) => (
        <Form className={classes.root}>
          <Box display="flex" p={1}>
            <Box p={1} flexGrow={1}>
              <div
                style={{
                  paddingBottom: "20px",
                  paddingRight: "20px",
                }}
              >
                <Field
                  labelId="Stock Type"
                  name="stockId"
                  id="stockId"
                  label="Stock Type"
                  component={BloodStockField}
                />
              </div>
              <div
                style={{
                  paddingBottom: "20px",
                  paddingRight: "20px",
                }}
              >
                <Field
                  labelId="donorId"
                  name="donorId"
                  id="donorId"
                  label="Donor ID"
                  component={DonorField}
                />
              </div>
              <div
                style={{
                  paddingBottom: "20px",
                  paddingRight: "20px",
                }}
              >
                <Field
                  variant="outlined"
                  name="amount"
                  label="Amount"
                  type="number"
                  helperText={
                    errors.amount && touched.amount ? errors.amount : null
                  }
                  error={touched.amount && Boolean(errors.amount)}
                  component={InputField}
                />
              </div>
            </Box>
            <Box p={1}>
              <Button
                variant="contained"
                color="primary"
                className={classes.color}
                type="submit"
                onClick={onClick}
                disabled={!isValid}
              >
                Submit
              </Button>
            </Box>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default DonationForm;
