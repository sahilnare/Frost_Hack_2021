import React, { Component } from "react";
import withStyles from "@material-ui/styles/withStyles";
import { withRouter } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import CreateClass from "./forms/CreateClass";
import ClassList from "./components/ClassList";
// const backgroundShape = require("../images/shape.svg");
import axios from 'axios';
import Navbar from './components/Navbar'

const styles = theme => ({
  root: {
    flexGrow: 1,
    overflow: "hidden",
    // background: `url(${backgroundShape}) no-repeat`,
    // backgroundSize: "cover",
    // backgroundPosition: "0 400px",
    paddingBottom: 200
  },
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
  topBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 32
  },
  actionButtom: {
    textTransform: "uppercase",
    margin: theme.spacing(1),
    width: 152
  },
  block: {
    padding: theme.spacing(2)
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

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      createClassDialog: false,
      classList: []
    };
  }

  componentDidMount() {
    const {userData} = this.props;
    const token = localStorage.frost_token;
    if(userData.role === "student") {
      axios.get('/api/class/getAllClasses', {
        headers: {
          "Content-Type": "application/json",
          token: token
        }
      }).then(res => {
        console.log(res.data);
        this.setState({classList: res.data.classes});
      }).catch(err => {
        console.log(err);
      });
    }
    else if(userData.role === "teacher") {
      axios.post('/api/class/getMyClasses', {teacher: userData.id}, {
        headers: {
          "Content-Type": "application/json",
          token: token
        }
      }).then(res => {
        console.log(res);
      }).catch(err => {
        console.log(err);
      });
    }

  }

  openCreateClass = event => {
    this.setState({ createClassDialog: true });
  };

  closeCreateClass = event => {
    this.setState({ createClassDialog: false });
  };

  updateClass = (classData) => {
    this.setState(prevState => {
      return {
        ...prevState,
        classList: [...prevState.classList, classData]
      }
    })
  }

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Navbar />
        <div className={classes.root}>
          <Grid container justify="center">
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
                      Create Class
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      Click here to create a new class group
                    </Typography>
                  </div>
                  <div className={classes.alignRight}>
                    <Button
                      onClick={this.openCreateClass}
                      color="primary"
                      variant="contained"
                      className={classes.actionButtom}
                    >
                      Create Class
                    </Button>
                  </div>
                </Paper>
              </Grid>
            </Grid>
            <ClassList classList={this.state.classList} />
          </Grid>
          <CreateClass
            userData={this.props.userData}
            updateClass={this.updateClass}
            open={this.state.createClassDialog}
            onClose={this.closeCreateClass}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(withStyles(styles)(Main));
