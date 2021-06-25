import { Typography } from "@material-ui/core";
import { Container, Paper, Grid } from "@material-ui/core";
// import ListAltIcon from "@material-ui/icons/ListAlt";
import React from "react";
import useStyles from "styles";
import List from "assets/list.jpg";
import WaitList from "assets/waitlist.jpg";
import Data from "assets/data.jpg";
import { Link } from "react-router-dom";

const Vaccinator = () => {
  const classes = useStyles();

  return (
    <>
      <Container
        className={classes.pdy}
        maxWidth="xl"
        style={{ position: "relative" }}
      >
        <Typography variant="h4" color="primary">
          Welcome!
        </Typography>
        <Grid container spacing={3}>
          <Grid item sm={4}>
            <Paper elevation={3} className={classes.paperTile}>
              <Link to="vaccinator/list">
                <img src={List} className={classes.tileImage} alt="" />
                <Typography variant={"h6"}>View Appointment List</Typography>
              </Link>
            </Paper>
          </Grid>
          <Grid item sm={4}>
            <Paper elevation={3} className={classes.paperTile}>
              <Link to="vaccinator/waitlist">
                <img src={WaitList} className={classes.tileImage} alt="" />
                <Typography variant={"h6"}>Update Waiting List</Typography>
              </Link>
            </Paper>
          </Grid>
          <Grid item sm={4}>
            <Paper elevation={3} className={classes.paperTile}>
              <Link to="vaccinator/waitlist">
                <img src={Data} className={classes.tileImage} alt="" />
                <Typography variant={"h6"}>Data Analysis</Typography>
              </Link>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Vaccinator;
