import React, { useState } from "react";
import {
  Grid,
  TextField,
  Button,
  Paper,
  Container,
  Typography,
} from "@material-ui/core";
import useStyles from "styles";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { useHistory } from "react-router-dom";

const Keys = {
  vacantNo: "vacantNo",
};
export const WaitList = () => {
  const classes = useStyles();
  const history = useHistory();

  const [vacantSlots, setVacantSlots] = useState(null);
  const sendNotif = () => {
    const data = vacantSlots;
    //send vaccinator id
    console.log("sending notif", data);
  };
  return (
    <Container className={classes.pdy} maxWidth="md">
      <Paper style={{ position: "relative" }} className={classes.paper}>
        <ArrowBackIcon
          style={{ position: "absolute", left: "15px", top: "15px" }}
          onClick={() => history.goBack()}
        />
        <Typography
          variant="h5"
          color="primary"
          style={{ fontWeight: 600 }}
          gutterBottom
        >
          Push Notifications for Waitlist
        </Typography>

        <Grid container sm={6} gutterBottom>
          <Grid item sm={12}>
            <TextField
              type="number"
              id={Keys.vacantNo}
              name={Keys.vacantNo}
              placeholder="Enter vacant doses number"
              value={vacantSlots}
              label="Number of vacant slots"
              color="primary"
              margin="normal"
              className={classes.mb3}
              onChange={(e) => {
                setVacantSlots(e.target.value);
              }}
              fullWidth
              required
            />
          </Grid>
          <Grid align="center" item sm={12}>
            <Button
              type="button"
              variant="contained"
              onClick={sendNotif}
              color="primary"
            >
              Send Notification
            </Button>
          </Grid>
        </Grid>
        <Paper elevation={0} className={classes.chotaPaper}>
          <Typography variant="p">
            <ul>
              <Typography variant="h6">Info:</Typography>
              <li>Update the waitlist with the vacant number of slots. </li>
              <li>Vacant slots will be updated on the main booking page.</li>
              <li>
                {" "}
                SMS Notification will be sent to all the beneficiaries who have
                registered under the waitlist.
              </li>
              <li>
                They can revert to this notification by booking their slots from
                the main booking page.
              </li>
              <li>
                Waitlist users will be given a one-hour window to turn up at the
                vaccination centre with all required documents.
              </li>
              <li>
                Vaccination centres are requested to update vacancies with a
                strategy to utilize vaccine doses from all opened vials before
                they hit the 4-hour expiry mark, throughout the day.
              </li>
            </ul>
          </Typography>
        </Paper>
      </Paper>
    </Container>
  );
};
