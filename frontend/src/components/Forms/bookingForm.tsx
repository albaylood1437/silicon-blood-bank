import React from "react";
import { Field, Form, Formik, FormikProps } from "formik";
import * as Yup from "yup";
import { makeStyles } from "@material-ui/core/styles";
import { green, pink } from "@material-ui/core/colors";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
} from "@material-ui/core";
import { getBloodTypes } from "../../services/bloodtypeServices";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useField, useFormikContext } from "formik";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "35ch",
      height: "10ch",
    },
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },

  color: {
    backgroundColor: green[600],
    height: "6ch",
    color: theme.palette.getContrastText(pink[500]),
  },
  formControl: {
    marginRight: theme.spacing(1),
    minWidth: 200,
  },
}));

interface Props {
  onSubmit: (datas: any) => void;
}

const InputField = ({ field, form, ...props }: any) => {
  return <TextField {...props} {...field} />;
};

const BookingForm: React.FC<Props> = ({ onSubmit }) => {
  const validationSchema: any = Yup.object({
    firstname: Yup.string().required("firstname is required"),
    secondname: Yup.string().required("secondname is required"),
    lastname: Yup.string().required("lastname is required"),
    city: Yup.string().required("city is required"),
    contact: Yup.number().required("contact is required"),
    bloodtypeId: Yup.number().required("bloodtype name is required"),
    gender: Yup.string().required("Gender is required"),
    appointment: Yup.date().required("date is required"),
  });

  const values = {
    firstname: "",
    secondname: "",
    lastname: "",
    city: "",
    contact: undefined,
    gender: "",
    bloodtypeId: undefined,
    appointment: "",
  };

  const classes = useStyles();
  const [bloodtypes, setBloodTypes] = React.useState<Array<{}>>([]);

  const DatePickerField = ({ ...props }: any) => {
    const { setFieldValue } = useFormikContext();
    const [field] = useField(props);
    return (
      <>
        <div>Appointment</div>
        <div
          style={{
            margin: "4px 0 15px 0",
            border: "2px solid #eee",
            display: "inline-block",
          }}
        >
          <DatePicker
            {...field}
            {...props}
            selected={(field.value && new Date(field.value)) || null}
            onChange={(val) => {
              setFieldValue(field.name, val);
            }}
          />
        </div>
      </>
    );
  };
  React.useEffect(() => {
    const fetchBloodTypes = async () => {
      const { data } = await getBloodTypes();
      setBloodTypes(data.bloodtypes);
    };
    fetchBloodTypes();
  }, []);

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

  const genderSelect = ({ field, form, ...props }: any) => {
    return (
      <FormControl component="fieldset">
        <FormLabel component="legend">Gender</FormLabel>
        <RadioGroup {...props} {...field}>
          {["male", "female"].map((option) => (
            <div style={{ display: "inline", width: "50%" }}>
              <FormControlLabel
                value={option}
                control={<Radio />}
                label={option}
              />
            </div>
          ))}
        </RadioGroup>
      </FormControl>
    );
  };

  return (
    <Container>
      <Formik
        onSubmit={(data, { resetForm }) => {
          onSubmit(data);
          resetForm();
        }}
        initialValues={values}
        validationSchema={validationSchema}
      >
        {({ errors, touched, isValid }: FormikProps<any>) => (
          <Form>
            <div className={classes.root}>
              <Field
                variant="outlined"
                name="firstname"
                label="First Name"
                helperText={
                  errors.firstname && touched.firstname
                    ? errors.firstname
                    : null
                }
                error={touched.firstname && Boolean(errors.firstname)}
                component={InputField}
              />
              <Field
                variant="outlined"
                name="secondname"
                label="Second Name"
                helperText={
                  errors.secondname && touched.secondname
                    ? errors.secondname
                    : null
                }
                error={touched.secondname && Boolean(errors.secondname)}
                component={InputField}
              />
              <Field
                variant="outlined"
                name="lastname"
                label="Last Name"
                helperText={
                  errors.lastname && touched.lastname ? errors.lastname : null
                }
                error={touched.lastname && Boolean(errors.lastname)}
                component={InputField}
              />
              <Field
                variant="outlined"
                name="city"
                label="city"
                helperText={errors.city && touched.city ? errors.city : null}
                error={touched.city && Boolean(errors.city)}
                component={InputField}
              />
              <Field
                variant="outlined"
                name="contact"
                label="Contact"
                helperText={
                  errors.contact && touched.contact ? errors.contact : null
                }
                error={touched.contact && Boolean(errors.contact)}
                component={InputField}
              />
              <Field
                labelId="gender"
                name="gender"
                id="gender"
                label="Gender"
                component={genderSelect}
              />
              <Field
                labelId="bloodtypeId"
                name="bloodtypeId"
                id="bloodtypeId"
                label="bloodtypeId"
                component={BloodTypeField}
              />
              <DatePickerField
                name="appointment"
                labelId="appointment"
                id="appointment"
                label="Appointment"
              />
            </div>

            <Button
              variant="contained"
              color="primary"
              className={classes.color}
              type="submit"
              disabled={!isValid}
            >
              Book
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default BookingForm;
