import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import { Button } from "@material-ui/core";
import useStyles from "styles";

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
});

const rows = [
  {
    name: "9:00 - 10:00",
    history: [
      { date: "2020-01GHOGHANEE", customerId: "121122123456789012", amount: 3 },
      { date: "2020-01-02", customerId: "Anonymous", amount: 1 },
    ],
  },
  {
    name: "10:00 - 11:00",
    history: [
      { date: "2020-01-05", customerId: "123456789012", amount: 3 },
      { date: "2020-01-02", customerId: "Anonymous", amount: 1 },
    ],
  },
  {
    name: "11:00 - 12:00",
    history: [
      { date: "2020-01-05", customerId: "123456789012", amount: 3 },
      { date: "2020-01-02", customerId: "Anonymous", amount: 1 },
    ],
  },
  {
    name: "01:00 - 02:00",
    history: [
      { date: "2020-01-05", customerId: "123456789012", amount: 3 },
      { date: "2020-01-02", customerId: "Anonymous", amount: 1 },
    ],
  },
];

function Row({ row, slotName, confirmAppt }) {
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();
  const classesGlobal = useStyles();

  useEffect(() => {
    // switch (row.slot) {
    //   case "10:00AM-11:00AM":
    //     break;
    //   default:
    //     break;
    // }
  }, []);

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell style={{ width: "3px" }}>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {slotName}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Table size="small" aria-label="purchases">
                {row.length !== 0 ? (
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Photo Id Number</TableCell>
                      <TableCell>Age</TableCell>
                      <TableCell>Gender</TableCell>
                      <TableCell>Birth Year</TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  </TableHead>
                ) : null}
                <TableBody>
                  {row.length !== 0 ? (
                    row.map((obj) => (
                      <TableRow
                        className={
                          obj.isCancelled
                            ? classesGlobal.redBg
                            : obj.isConfirmed
                            ? classesGlobal.greenBg
                            : ""
                        }
                        key={obj.appointmentId}
                      >
                        <TableCell component="th" scope="row">
                          {obj.name}
                        </TableCell>
                        <TableCell>
                          {obj.photoIdType}-{obj.photoIdNumber}
                        </TableCell>
                        <TableCell>{obj.age}</TableCell>
                        <TableCell>{obj.gender}</TableCell>
                        <TableCell>{obj.birthYear}</TableCell>
                        <TableCell>
                          <Button
                            variant="contained"
                            color="primary"
                            type="button"
                            onClick={(e) => {
                              confirmAppt(e, obj.appointmentId);
                            }}
                            disabled={obj.isConfirmed || obj.isCancelled}
                          >
                            Confirm
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <div style={{ textAlign: "center", paddingBottom: "1rem" }}>
                      No appointments
                    </div>
                  )}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}
const mockSlots = [
  "09:00AM-10:00AM",
  "10:00AM-11:00AM",
  "11:00AM-12:00PM",
  "12:00PM-01:00PM",
  "01:00PM-02:00PM",
  "02:00PM-03:00PM",
  "03:00PM-04:00PM",
  "04:00PM-05:00PM",
];
const CollapsibleTable = ({ tableData, confirmAppt }) => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableBody>
          {mockSlots.map((slot) => {
            const newArr = tableData.filter((obj) => obj.slot === slot);
            return (
              <Row
                confirmAppt={confirmAppt}
                key={slot}
                slotName={slot}
                row={newArr}
              />
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CollapsibleTable;
