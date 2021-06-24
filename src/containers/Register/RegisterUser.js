import { Grid } from "@material-ui/core";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  RadioGroup,
} from "@material-ui/core";

import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import React, { useEffect, useState } from "react";
import useStyles from "styles";
import userService from "services/user";
const Keys = {
  photoId: "photoIdType",
  photoIdNumber: "photoIdNumber",
  name: "name",
  gender: "gender",
  year: "birthYear",
};

const RegisterUser = () => {
  const classes = useStyles();
  const [formData, setFormData] = useState({});
  useEffect(() => {}, []);
  const handleChange = (e) => {
    const { target } = e;
    const { name, value } = target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const id = localStorage.getItem("user");
    console.log(formData, id);

    const params = {
      ...formData,
      id: id,
    };
    userService
      .registerUser(params)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Container maxWidth="sm" style={{ position: "relative" }}>
        <Paper elevation={3} className={classes.paper}>
          <Typography
            variant="h5"
            color="primary"
            style={{ fontWeight: 600 }}
            gutterBottom
          >
            Register for Vaccination
          </Typography>
          <Typography variant="subtitle2" align="center">
            Your Photo ID will be verified at the time of your vaccination
            appointment. Please provide the details of the Photo Id you will
            carry for vaccination.
          </Typography>
          <form onSubmit={handleFormSubmit} style={{ width: "100%" }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Photo ID Proof
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name={Keys.photoId}
                    value={formData[Keys.photoId]}
                    onChange={handleChange}
                  >
                    <MenuItem value={"aadhaar"}>Aadhaar Card</MenuItem>
                    <MenuItem value={"pan"}>Pan Card</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <TextField
                  type="number"
                  id={Keys.photoIdNumber}
                  name={Keys.photoIdNumber}
                  placeholder="Enter your aadhaar number"
                  label="Aadhaar Number"
                  fullWidth
                  color="primary"
                  margin="normal"
                  className={classes.mb3}
                  value={formData[Keys.photoIdNumber]}
                  // error={
                  //   currentValidators[Keys.photoIdNumber] !== undefined
                  //     ? !currentValidators[Keys.photoIdNumber]
                  //     : false
                  // }
                  helperText="Must be 12 digits"
                  onChange={(e) => {
                    handleChange(e);
                    // customValidator(e, "mobileNumber");
                  }}
                  required
                />
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  type="text"
                  id={Keys.name}
                  name={Keys.name}
                  placeholder="Enter your name"
                  label="Name (as in Aadhaar Card)"
                  fullWidth
                  color="primary"
                  margin="normal"
                  className={classes.mb3}
                  // error={
                  //   currentValidators[Keys.name] !== undefined
                  //     ? !currentValidators[Keys.name]
                  //     : false
                  // }
                  value={formData[Keys.name]}
                  onChange={(e) => {
                    handleChange(e);
                    // customValidator(e, "mobileNumber");
                  }}
                  required
                />
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <FormLabel>Gender</FormLabel>
                  <RadioGroup
                    aria-label="gender"
                    name={Keys.gender}
                    value={formData[Keys.gender]}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  >
                    <FormControlLabel
                      value="female"
                      control={<Radio />}
                      label="Female"
                    />
                    <FormControlLabel
                      value="male"
                      control={<Radio />}
                      label="Male"
                    />
                    <FormControlLabel
                      value="other"
                      control={<Radio />}
                      label="Others"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
            </Grid>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <TextField
                  type="number"
                  id={Keys.year}
                  name={Keys.year}
                  placeholder="Year of Birth (as in Aadhaar Card in YYYY format)"
                  label="Year of Birth"
                  fullWidth
                  color="primary"
                  margin="normal"
                  className={classes.mb3}
                  // error={
                  //   currentValidators[Keys.year] !== undefined
                  //     ? !currentValidators[Keys.year]
                  //     : false
                  // }
                  value={formData[Keys.year]}
                  onChange={(e) => {
                    handleChange(e);
                    // customValidator(e, "mobileNumber");
                  }}
                  required
                />
              </Grid>
            </Grid>
            <Grid container align="center">
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  color="primary"
                  align="center"
                  className={classes.mxAuto}
                >
                  Register
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </>
  );
};

export default RegisterUser;
