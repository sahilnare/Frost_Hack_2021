import React, { Component } from "react";
import withStyles from "@material-ui/styles/withStyles";
import { withRouter } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Navbar from "./components/Navbar"

const styles = theme => ({
  grid: {
    width: 1200,
    marginTop: 40,
    [theme.breakpoints.down("sm")]: {
      width: "calc(100% - 20px)"
    }
  },
  paper: {
    padding: theme.spacing(3),
    textAlign: "left",
    color: theme.palette.text.secondary
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
        {
          notes.length > 0 ? notes.map(note => {
            return (
              <Grid item xs={12} md={4}>
                <Paper className={classes.paper}>
                  <div className={classes.box}>
                    <Typography
                      style={{ textTransform: "uppercase", color: '#000' }}
                      gutterBottom
                    >
                      {note.class}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      {note.date}
                    </Typography>
                  </div>
                  <div className={classes.alignRight}>
                    <Button
                      onClick={openpdf}
                      color="primary"
                      variant="contained"
                      className={classes.actionButtom}
                    >
                      View Note
                    </Button>
                  </div>
                </Paper>
              </Grid>
            )
          }) : null
        }
      </Grid>
      </div>
    )
  }
}

export default withRouter(withStyles(styles)(NotesList));