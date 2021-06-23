import React, { useEffect, useState } from "react";
import { Paper, Typography } from "@material-ui/core";
import { Grid, Button } from "@material-ui/core";
import { Container, TextField } from "@material-ui/core";
import useStyles from "styles";

const Keys = {
  mobileNo: "mobileNumber",
};

const GetOtp = ({ handleFormSubmit, customValidator, currentValidators }) => {
  const classes = useStyles();

  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <Typography
          variant="h5"
          color="primary"
          style={{ fontWeight: 600 }}
          gutterBottom
        >
          Register or SignIn for Vaccination
        </Typography>
        <Typography gutterBottom>
          An OTP will be sent to your mobile number for verification
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              type="number"
              id={Keys.mobileNo}
              name={Keys.mobileNo}
              placeholder="Enter your mobile number"
              label="Mobile Number"
              fullWidth
              color="primary"
              margin="normal"
              className={classes.mb3}
              error={!currentValidators[Keys.mobileNo]}
              helperText="Must be 10 digits"
              onChange={(e) => {
                customValidator(e, "mobileNumber");
              }}
            />
            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              color="primary"
            >
              Get OTP
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default GetOtp;
