import React, { Component } from "react";
import withStyles from "@material-ui/styles/withStyles";
import { withRouter } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

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

class ClassList extends Component {

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
        {
          classList.length > 0 ? classList.map(class1 => {
            return (
              <Grid item xs={12} md={4}>
                <Paper className={classes.paper}>
                  <div className={classes.box}>
                    <Typography
                      style={{ textTransform: "uppercase", color: '#000' }}
                      gutterBottom
                    >
                      {class1.name}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      {class1.description}
                    </Typography>
                  </div>
                  <div className={classes.alignRight}>
                    <Button
                      onClick={() => this.props.history.push('/class/' + class1._id)}
                      color="primary"
                      variant="contained"
                      className={classes.actionButtom}
                    >
                      Join Class
                    </Button>
                  </div>
                </Paper>
              </Grid>
            )
          }) : null
        }
      </Grid>
    )
  }
}

export default withRouter(withStyles(styles)(ClassList));
