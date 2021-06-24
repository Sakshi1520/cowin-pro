import { makeStyles } from "@material-ui/core/styles";
import { flexbox } from "@material-ui/system";

const useStyles = makeStyles((theme) => ({
  rootWrapper: {
    minHeight: "100vh",
    paddingTop: "4rem",
  },
  container: {
    padding: theme.spacing(8, 0, 6),
    // marginTop: theme.spacing(8),
  },
  toolbar: {
    dispaly: flexbox,
    justifyContent: "space-between",
  },
  mb2: {
    marginBottom: theme.spacing(2),
  },
  mb3: {
    marginBottom: theme.spacing(3),
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(8),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  paperLogin: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(10),
      paddingTop: theme.spacing(18),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
  },
  loginHeart: {
    display: "none",
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      display: "block",
      position: "absolute",
      top: "-60px",
      border: "20px solid white",
      borderRadius: "50%",
      backgroundColor: "white",
    },
  },
  pd6: {
    padding: theme.spacing(6),
  },
  w100: {
    width: "100%",
  },
  footer: {
    display: "flex",
    position: "fixed",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    bottom: "0",
    padding: "1rem",
    backgroundColor: "#002060",
    color: "white",
    alignContent: "center",
  },
  mxAuto: {
    margin: "0 auto",
  },
}));

export default useStyles;
