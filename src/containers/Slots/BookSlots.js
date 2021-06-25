/* eslint-disable no-unreachable */
import "date-fns";
import { format } from "date-fns";
import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  RadioGroup,
} from "@material-ui/core";
import useStyles from "styles";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import session from "services/session";
import SlotsTable from "components/Slots/SlotsTable";
import Box from "@material-ui/core/Box";
import Modal from "@material-ui/core/Modal";

const mock = {
  date: "25-06-2021",
  pincode: "400706",
};
const Keys = {
  date: "date",
  pincode: "pincode",
};
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};
export const BookSlots = () => {
  const classes = useStyles();
  const [formData, setFormData] = useState({});
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [sessions, setSessions] = useState([]);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const { target } = e;
    const { name, value } = target;
    setFormData({ ...formData, [name]: value });
  };

  const getSlots = (e) => {
    const date = format(selectedDate, "dd-MM-yyyy");
    const data = { ...formData, date };
    console.log(data);
    session
      .getAllSessions(data)
      .then((res) => {
        console.log(res.data.data);
        setSessions([...res.data.data]);
      })
      .catch((err) => console.log(err));
  };

  const joinWaitlist = () => {
    handleOpen();
  };
  const bookSlot = () => {};

  return (
    <Container maxWidth="xl" className={classes.pdy}>
      <Typography variant="h5" color="primary" style={{ fontWeight: 600 }}>
        Slot Booking
      </Typography>

      <Grid container className={classes.alignRowCenter} spacing={3}>
        <Grid item sm={2}>
          <TextField
            type="text"
            id={Keys.pincode}
            name={Keys.pincode}
            placeholder="Enter your pincode"
            label="Pincode"
            fullWidth
            color="primary"
            margin="normal"
            value={formData[Keys.pincode]}
            onChange={(e) => {
              handleChange(e);
            }}
            required
          />
        </Grid>
        <Grid item sm={2}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              margin="normal"
              id="date-picker-dialog"
              label="Date picker dialog"
              format="dd/MM/yyyy"
              value={selectedDate}
              onChange={(date) => {
                setSelectedDate(date);
              }}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          </MuiPickersUtilsProvider>
        </Grid>
        <Grid item sm={"2"}>
          <Button
            variant="contained"
            type="button"
            color="primary"
            onClick={getSlots}
          >
            Search
          </Button>
        </Grid>
      </Grid>
      <Paper className={classes.paper}>
        <SlotsTable
          joinWaitlist={joinWaitlist}
          bookSlot={bookSlot}
          sessions={sessions}
        />
      </Paper>
      {/* <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        hello
        <Box sx={{ ...style, width: 400 }}>
          <Button onClick={handleOpen}>Open Child Modal</Button>
        </Box>
      </Modal> */}
    </Container>
  );
};
