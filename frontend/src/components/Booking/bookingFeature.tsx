import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Box from "@material-ui/core/Box";
import { Paper, Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";

import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import BookingForm from "../Forms/bookingForm";
import { postBooking } from "../../services/bookingServices";
import SnackPar from "../Common/snackpar";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(7),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "10px",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },

  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Booking() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [booking, setBooking] = useState<Array<{}>>([]);
  const [errors, setErrors] = useState(null);
  const [message, setMessage] = useState("");

  const handleClick = (msg: string) => {
    setMessage(msg);
    setOpen(true);
  };

  function Alert(props: any) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const handleClose = (event: any, reason: any) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleSubmit = async (datas: any) => {
    console.log(datas);
    try {
      const { data } = await postBooking(datas);
      const newbooking = [...booking, data];
      setBooking(newbooking);
      handleClick("Sucessfully posted!");
      window.location.pathname = "/home";
    } catch (err) {
      handleClick("err!");
      setErrors(err.message);
    }
  };
  return (
    <Container component="main" maxWidth="md">
      <SnackPar
        errors={errors}
        handleClose={handleClose}
        success={message}
        open={open}
      />
      <Paper>
        <CssBaseline />
        <div className={classes.paper}>
          {errors && (
            <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
              <Alert onClose={handleClose} severity="error">
                {errors}
              </Alert>
            </Snackbar>
          )}
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" className="mb-4">
            Booking
          </Typography>

          <BookingForm onSubmit={handleSubmit} />
        </div>
      </Paper>
    </Container>
  );
}
