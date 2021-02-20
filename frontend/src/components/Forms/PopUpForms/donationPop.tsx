import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import EditIcon from "@material-ui/icons/Edit";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DonationForm from "../donationForm";
import { IconButton } from "@material-ui/core";
import Tooltip from "@material-ui/core/Tooltip";

const useStyles = makeStyles((theme) => ({
  editButton: {
    color: green[600],
    cursor: `pointer`,
  },
}));

export default function DonationPopForm({
  donation,
  onSubmit,
  donors,
  bloodstock,
}: any) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const classes = useStyles();
  return (
    <div>
      <Tooltip title="Edit">
        <IconButton aria-label="edit" onClick={handleClickOpen}>
          <EditIcon className={classes.editButton} />
        </IconButton>
      </Tooltip>
      <Dialog
        open={open}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">Update donation</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <DonationForm
              onSubmit={onSubmit}
              donation={donation}
              donors={donors}
              bloodstock={bloodstock}
              name="edit"
              onClick={handleClose}
            />
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}
