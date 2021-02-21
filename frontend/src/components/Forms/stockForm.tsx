import React from "react";
// import { Form } from "../Formik/FormOfstocks";
import * as Yup from "yup";
import { makeStyles } from "@material-ui/core/styles";
import { green, pink } from "@material-ui/core/colors";
import Container from "@material-ui/core/Container";
import { Field, Form, Formik, FormikProps } from "formik";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import { FormControl, InputLabel, MenuItem } from "@material-ui/core";
import { Select } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: 0,
      width: "35ch",
      height: "10ch",
    },
  },
  formControl: {
    marginRight: theme.spacing(1),
    minWidth: 200,
  },
  color: {
    backgroundColor: green[600],
    color: theme.palette.getContrastText(pink[500]),
  },
}));

interface Props {
  onSubmit: (data: any) => void;
  stock: any;
  bloodtypes: any;
  name: string;
  onClick?: () => void;
}

const InputField = ({ field, form, ...props }: any) => {
  return <TextField {...props} {...field} />;
};

const StockForm: React.FC<Props> = ({
  onSubmit,
  stock,
  bloodtypes,
  name,
  onClick,
}) => {
  const validationSchema: any = Yup.object().shape({
    bloodtypeId: Yup.number().required("Blood Type Id"),
    amount: Yup.number().required("Amount"),
  });

  const BloodTypeField = ({ field, form, ...props }: any) => {
    return (
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">
          bloodtypeId
        </InputLabel>
        <Select {...props} {...field}>
          {bloodtypes.map((bloodtype: any) => (
            <MenuItem key={bloodtype.bloodtypeId} value={bloodtype.bloodtypeId}>
              {bloodtype.bloodname}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  };

  const addValues = {
    bloodtypeId: undefined,
    amount: undefined,
  };

  const editValues = stock && {
    bloodtypeId: stock.bloodtypeId,
    amount: stock.amount,
  };
  const values = name === "edit" ? editValues : addValues;
  const classes = useStyles();
  return (
    <Container>
      <Formik
        onSubmit={(data, { resetForm }) => {
          onSubmit({ row: data, id: stock.stockId, stockData: stock });
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
                    labelId="bloodtypeId"
                    name="bloodtypeId"
                    id="bloodtypeId"
                    label="Bloodtype ID"
                    component={BloodTypeField}
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
                  onClick={onClick}
                  className={classes.color}
                  type="submit"
                  disabled={!isValid}
                >
                  Submit
                </Button>
              </Box>
            </Box>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default StockForm;
