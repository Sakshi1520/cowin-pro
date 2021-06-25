import React from "react";
import "@fontsource/roboto";
import Routes from "./Routes";
import {
  AppBar,
  Toolbar,
  Button,
  CssBaseline,
  Container,
  Typography,
} from "@material-ui/core";
import logo from "./assets/cowin_logo.jpg";
import useStyles from "styles";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { toast, ToastContainer } from "react-toastify";

const loggedIn = false;
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#002060",
    },
    secondary: {
      main: "#600000",
    },
    yellowDark: "#fbbe134",
    redLight: "#ffb8b8",
    greenLight: "#b8ffd2",
  },
});
function App() {
  const classes = useStyles();
  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <div className={classes.rootWrapper}>
          <AppBar color="white">
            <Container maxWidth="md">
              <Toolbar className={classes.toolbar}>
                <img width={200} height={60} src={logo} alt="cowin logo" />
                {loggedIn && (
                  <Button variant="outlined" color="primary">
                    LogIn
                  </Button>
                )}
              </Toolbar>
            </Container>
          </AppBar>
          <main>
            <Container maxWidth="lg" component="div">
              <Routes />
            </Container>
          </main>
          <footer className={classes.footer}>
            <Typography variant="caption">
              For Grievances & Feedback : support@cowin.gov.in | Privacy Policy
              | Terms of Service | Copyright © 2021 COWIN-PRO. All Rights
              Reserved
            </Typography>
          </footer>
        </div>
      </ThemeProvider>
      <ToastContainer autoClose={5000} position={toast.POSITION.BOTTOM_RIGHT} />
    </>
  );
}

export default App;
