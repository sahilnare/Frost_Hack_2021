import React, { Component } from "react";
import withStyles from "@material-ui/styles/withStyles";
import { withRouter } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Navbar from "./components/Navbar";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  grid: {
    width: 1200,
    marginTop: 40,
    [theme.breakpoints.down("sm")]: {
      width: "calc(100% - 20px)"
    }
  },
  actionButtom: {
    textTransform: "uppercase",
    margin: theme.spacing(1),
    width: 152
  },
  box: {
    marginBottom: 40,
    height: 65
  },
  alignRight: {
    display: "flex",
    justifyContent: "flex-end"
  },
  table: {
    minWidth: 650,
  },
});


function openpdf() {
    window.open('https://stackoverflow.com/questions/15944245/how-to-open-pdf-on-a-new-tab');
}

class NotesList extends Component {

  render() {
    const notes = [{
        class: "JavaScript",
        date: "09/05/2021",
        id: "141324234"
    },
    {
        class: "Python",
        date: "09/05/2021",
        id: "512344345"
    }
];

    const { classes } = this.props;
    return (
      <div>
      <Navbar />
      <Grid
        spacing={4}
        alignItems="center"
        justify="center"
        container
        className={classes.grid}
      >
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Question</TableCell>
              <TableCell align="right">Student Name</TableCell>
              <TableCell align="right">Answered</TableCell>
              <TableCell align="right">Correct Answer</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell component="th" scope="row">
                In which type of machine learning algorithms, do we have to provide labelled data?
              </TableCell>
              <TableCell align="right">Sahil Nare</TableCell>
              <TableCell align="right">Yes</TableCell>
              <TableCell align="right">Yes</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      </Grid>
      </div>
    )
  }
}

export default withRouter(withStyles(styles)(NotesList));
