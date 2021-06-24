import React, { useEffect, useState } from "react";
import { Paper, Typography } from "@material-ui/core";
import { Container, TextField } from "@material-ui/core";
import useStyles from "styles";
import GetOtp from "components/Login/GetOtp";
import EnterOtp from "components/Login/EnterOtp";
import { ReactComponent as LoginHeart } from "assets/login_heart.svg";
import userService from "services/user";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";

const Keys = {
  mobileNo: "phno",
  otp: "code",
};
const Login = () => {
  const classes = useStyles();
  const history = useHistory();
  const [formData, setFormData] = useState({});
  const [currentValidators, setCurrentValidators] = useState({});
  const [otpSent, setOtpSent] = useState(false);

  const isValid = () => {
    let copy = { ...currentValidators };
    let isErrorFree = false;
    isErrorFree = Object.keys(copy).every((key) => copy[key] === true);
    return isErrorFree;
  };

  const handleGetOtp = (e) => {
    e.preventDefault();
    console.log("otp sent to", e.target.elements[Keys.mobileNo]);
    setFormData({
      ...formData,
      [Keys.mobileNo]: e.target.elements[Keys.mobileNo].value,
    });
    if (isValid()) {
      setOtpSent(true);
      console.log("hello ", formData);

      // eslint-disable-next-line no-unreachable
      userService
        .login(formData)
        .then((res) => {})
        .catch((err) => toast.error("OTP could not be sent, Please try again"));
    } else {
      toast.error("Please recheck entered number & try again");
    }
  };

  const handleChange = (e) => {
    const { target } = e;
    const { name, value } = target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmitOtp = (e) => {
    e.preventDefault();
    // console.log("otp sent to", e.target.elements[Keys.mobileNo]);

    setFormData({
      ...formData,
      [Keys.otp]: e.target.elements[Keys.otp].value,
    });

    if (isValid()) {
      userService
        .verifyOtp(formData)
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            if (res.data.isValidOTP) {
              localStorage.setItem("user", res.data._id);
              //store _id in session
              if (res.data.isRegisteredUser) {
                console.log("go to register");
                history.push("/register");
              } else {
                console.log("go to slot booking");
                // history.push("/slotbooking")
              }
            } else {
              toast.error("Otp is incorrect please re-enter");
            }
          } else {
            console.log("res is not 200", res);
          }
        })
        .catch((err) => toast.error("Couldn't please retry"));
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
        currentValidators[name] = /^([0-9- +]){10}$/i.test(value);
        break;
      case "otp":
        currentValidators[name] = /^([0-9- +]){6}$/i.test(value);
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
            handleChange={handleChange}
            formData={formData}
          />
        ) : (
          <EnterOtp
            handleSubmitOtp={handleSubmitOtp}
            customValidator={customValidator}
            currentValidators={currentValidators}
            handleChange={handleChange}
            formData={formData}
          />
        )}
      </Paper>
    </Container>
  );
};

export default Login;
