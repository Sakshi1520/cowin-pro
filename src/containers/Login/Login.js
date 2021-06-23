import React, { useEffect, useState } from "react";
import { Paper, Typography } from "@material-ui/core";
import { Container, TextField } from "@material-ui/core";
import useStyles from "styles";
import GetOtp from "components/Login/GetOtp";
import EnterOtp from "components/Login/EnterOtp";
import { ReactComponent as LoginHeart } from "assets/login_heart.svg";

const Keys = {
  mobileNo: "mobileNumber",
};
const Login = () => {
  const classes = useStyles();
  const [formData, setFormData] = useState({});
  const [currentValidators, setCurrentValidators] = useState({});
  const [otpSent, setOtpSent] = useState(false);

  useEffect(() => {
    Object.keys(Keys).forEach((key) => {
      currentValidators[Keys[key]] = true;
    });
    setCurrentValidators({ ...currentValidators });
  }, []);

  const isValid = () => {
    let copy = { ...currentValidators };
    let isErrorFree = false;
    isErrorFree = Object.keys(copy).every((key) => copy[key] === true);
    return isErrorFree;
  };

  const handleGetOtp = (e) => {
    e.preventDefault();
    // console.log("otp sent to", e.target.elements[Keys.mobileNo].value);
    setFormData({
      ...formData,
      [Keys.mobileNo]: e.target.elements[Keys.mobileNo].value,
    });
    if (isValid()) {
      setOtpSent(true);
    } else {
      console.error("wrong no");
    }
  };
  const handleOtpSubmit = (e) => {
    e.preventDefault();
    // console.log("otp sent to", e.target.elements[Keys.mobileNo].value);
    setFormData({
      ...formData,
      [Keys.otp]: e.target.elements[Keys.otp].value,
    });
    if (isValid()) {
      console.log("verify", formData);
      // setOtpSent(true);
    } else {
      console.error("wrong otp");
    }
  };

  function customValidator(event, type) {
    const { value, name } = event.target;

    switch (type) {
      case "mobileNumber":
        currentValidators[name] = /^([0-9- +]){10,13}$/i.test(value);
        break;
      case "otp":
        currentValidators[name] = /^([0-9- +]){4}$/i.test(value);
        break;
      default:
        break;
    }
    setCurrentValidators({ ...currentValidators });
  }

  return (
    <Container maxWidth="sm" style={{ position: "relative" }}>
      <Paper elevation={3} className={classes.paperLogin}>
        <LoginHeart className={classes.loginHeart} />
        {!otpSent ? (
          <GetOtp
            handleFormSubmit={handleGetOtp}
            customValidator={customValidator}
            currentValidators={currentValidators}
          />
        ) : (
          <EnterOtp
            handleOtpSubmit={handleOtpSubmit}
            customValidator={customValidator}
            currentValidators={currentValidators}
          />
        )}
      </Paper>
    </Container>
  );
};

export default Login;
