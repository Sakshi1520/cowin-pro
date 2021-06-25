import { Typography } from "@material-ui/core";
import { Container, Paper } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import vaccinatorService from "services/vaccinator";
import useStyles from "styles";
import CollapsibleTable from "components/Vaccinator/Table";
import { Grid, TextField, Button } from "@material-ui/core";

const mockData = {
  // date: new Date().toJSON().slice(0, 10).split("-").reverse().join("-"),
  date: "25-06-2021",
  centerId: "746216",
};
const Keys = {
  vacantNo: "vacantNo",
};
const UsersList = () => {
  const classes = useStyles();
  const [tableData, setTableData] = useState([]);
  const [vacantSlots, setVacantSlots] = useState(null);

  useEffect(() => {
    makeGetAllApptCall(mockData);
  }, []);

  const confirmAppt = (e, apptId) => {
    vaccinatorService
      .confirmApptById({ appointmentId: apptId })
      .then((res) => {
        // console.log(res.data);
        makeGetAllApptCall(mockData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const makeGetAllApptCall = (data) => {
    vaccinatorService
      .getAllApptByCenter(data)
      .then((res) => {
        const users = res.data.users;
        setTableData([...users]);
        console.log(res.data.users);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Container
        className={classes.pdy}
        maxWidth="xl"
        style={{ position: "relative" }}
      >
        <Grid container>
          <Grid item sm={6}>
            <Typography
              variant="h5"
              color="primary"
              style={{ fontWeight: 600 }}
            >
              VACCINATOR NAME
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi,
              quos.
            </Typography>
          </Grid>
        </Grid>

        <CollapsibleTable confirmAppt={confirmAppt} tableData={tableData} />
      </Container>
    </>
  );
};

export default UsersList;
