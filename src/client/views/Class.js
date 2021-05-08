import React, { Component } from "react";
import withStyles from "@material-ui/styles/withStyles";
import { withRouter } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Question from "./components/Question"

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

class Class extends Component {

    constructor(props) {
    super(props);
    this.state = {
      createClassDialog: false,
    };
  }

    openCreateClass = event => {
    this.setState({ createClassDialog: true });
  };

  closeCreateClass = event => {
    this.setState({ createClassDialog: false });
  };

  render() {
    const { classes, classList } = this.props;
    return (
      <Grid
        spacing={4}
        alignItems="center"
        justify="center"
        container
        className={classes.grid}
      >
        <Grid item xs={12} md={4}>
                <Paper className={classes.paper}>
                  <div className={classes.box}>
                    <Typography
                      style={{ textTransform: "uppercase" }}
                      color="secondary"
                      gutterBottom
                    >
                      Create Question
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      Click here to create Questions
                    </Typography>
                  </div>
                  <div className={classes.alignRight}>
                    <Button
                      onClick={this.openCreateClass}
                      color="primary"
                      variant="contained"
                      className={classes.actionButtom}
                    >
                      Create
                    </Button>
                  </div>
                </Paper>
              </Grid>
            <Question
            userData={this.props.userData}
            updateClass={this.updateClass}
            open={this.state.createClassDialog}
            onClose={this.closeCreateClass}
          />
      </Grid>
    )
  }
}

export default withRouter(withStyles(styles)(Class));
