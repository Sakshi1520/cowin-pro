import React, { useEffect, useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Button } from "@material-ui/core";
import useStyles from "styles";

export default function SlotsTable({ sessions, joinWaitlist, bookSlot }) {
  let [newSessionList, setNewSessionList] = useState([]);
  const classes = useStyles();
  useEffect(() => {
    newSessionList = sessions.map((obj) => {
      obj.availableCapacity = obj.sessions[0].availableCapacity;
      return obj;
    });
    setNewSessionList([...newSessionList]);
    console.log(newSessionList);
  }, [sessions]);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 450 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="left">District</TableCell>
            <TableCell align="left">Fee Type</TableCell>
            <TableCell align="left">Slots available</TableCell>
            <TableCell align="left"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {newSessionList.map((row) => (
            <TableRow
              key={row.centerId}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="left">{row.district}</TableCell>
              <TableCell align="left">{row.feeType}</TableCell>
              <TableCell align="left">{row.availableCapacity}</TableCell>
              <TableCell align="left">
                {row.availableCapacity ? (
                  <Button
                    variant="outlined"
                    className={classes.btnBook}
                    type="button"
                    color="primary"
                    onClick={bookSlot}
                    size="small"
                  >
                    Book Slot
                  </Button>
                ) : (
                  <Button
                    variant="outlined"
                    className={classes.btnJoin}
                    type="button"
                    color="secondary"
                    onClick={joinWaitlist}
                    size="small"
                  >
                    Join Waitlist
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
