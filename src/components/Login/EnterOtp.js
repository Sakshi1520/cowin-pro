import React, { useEffect, useState } from "react";
import { Paper, Typography } from "@material-ui/core";
import { Grid, Button } from "@material-ui/core";
import { Container, TextField } from "@material-ui/core";
import useStyles from "styles";

const Keys = {
  otp: "otp",
};

const EnterOtp = ({ handleOtpSubmit, customValidator, currentValidators }) => {
  const classes = useStyles();

  return (
    <>
      <form onSubmit={handleOtpSubmit}>
        <Typography
          variant="h5"
          color="primary"
          style={{ fontWeight: 600 }}
          gutterBottom
        >
          OTP Verification
        </Typography>
        <Typography gutterBottom>
          An OTP has been sent to your number
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              type="number"
              id={Keys.otp}
              name={Keys.otp}
              placeholder="Enter OTP"
              label="OTP"
              fullWidth
              color="primary"
              margin="normal"
              className={classes.mb3}
              error={!currentValidators[Keys.otp]}
              helperText="Must be 4 digits"
              onChange={(e) => {
                customValidator(e, "otp");
              }}
            />
            <Typography paragraph variant="subtitle" size="small" gutterBottom>
              There might be some delay in receiving the OTP due to heavy
              traffic
            </Typography>
            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              color="primary"
            >
              Verify & proceed
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default EnterOtp;
