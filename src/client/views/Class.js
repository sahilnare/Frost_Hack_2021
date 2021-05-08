import React, { Component } from "react";
import withStyles from "@material-ui/styles/withStyles";
import { withRouter } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Question from "./components/Question";
import Navbar from './components/Navbar';
import axios from 'axios';

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
  details: {
    width: '60%',
    marginTop: '100px'
  }
});

class Class extends Component {

  constructor(props) {
    super(props);
    this.state = {
      createClassDialog: false,
      name: '',
      meetlink: '',
      semester: '',
      teacher: '',
      questions: []
    };
  }

  componentDidMount() {
    const token = localStorage.frost_token;
    axios.post('/api/class/getClass', {classId: this.props.match.params.classId}, {
      headers: {
        "Content-Type": "application/json",
        token: token
      }
    }).then(res => {
      this.setState({
        name: res.data.classData.name,
        teacher: res.data.teacherName,
        meetlink: res.data.classData.meetlink,
        semester: res.data.classData.semester,
        description: res.data.classData.description
      });
    }).catch(err => {
      console.log(err);
    });
    if(this.props.userData.role === "teacher") {
      const token = localStorage.frost_token;
      axios.post('/api/class/getAllQuestions', {classId: this.props.match.params.classId}, {
        headers: {
          "Content-Type": "application/json",
          token: token
        }
      }).then(res => {
        console.log(res.data);
        this.setState({
          questions: res.data.questions
        });
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

  updateQues = (quesData) => {
    this.setState(prevState => {
      return {
        ...prevState,
        questions: [...prevState.questions, quesData]
      }
    });
    this.setState({ createClassDialog: false });
  }

  render() {
    const { classes, classList, userData } = this.props;

    return (
      <React.Fragment>
        <Navbar logOutFunc={this.props.logOutFunc} />
          {
            userData.role === "teacher" ? (
              <>
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
                  classId={this.props.match.params.classId}
                  meetlink={this.state.meetlink}
                  updateQues={this.updateQues}
                  open={this.state.createClassDialog}
                  onClose={this.closeCreateClass}
                />
              </Grid>
              <Grid
                spacing={4}
                alignItems="center"
                justify="center"
                container
                direction="column"
                style={{marginTop: '40px'}}
              >
                {
                  this.state.questions.length > 0 ? this.state.questions.map(question => {
                    return (
                      <Accordion>
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="content"
                          id="header"
                        >
                          <Typography className={classes.heading}>{question.title}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Typography>
                            {question.option1}{" | "}
                          </Typography>
                          <Typography>
                            {question.option2}{" | "}
                          </Typography>
                          <Typography>
                            {question.option3}{" | "}
                          </Typography>
                          <Typography>
                            {question.option4}
                          </Typography>
                        </AccordionDetails>
                      </Accordion>
                    )
                  }) : null
                }
              </Grid>
            </>
          ) : null
        }
        <Grid
          spacing={4}
          alignItems="center"
          justify="center"
          container
        >
          <List className={classes.details} component="nav" aria-label="details">
            <ListItem button>
              <ListItemText primary={"Teacher: " + this.state.teacher} />
            </ListItem>
            <Divider />
            <ListItem button>
              <ListItemText primary={"Semester: " + this.state.semester} />
            </ListItem>
            <Divider />
            <ListItem button>
              <ListItemText primary={"Description: " + this.state.description} />
            </ListItem>
            <Divider />
            <ListItem button component="a" href={this.state.meetlink} target="_blank">
              <ListItemText primary={"Meet link: " + this.state.meetlink} />
            </ListItem>
          </List>
        </Grid>
      </React.Fragment>
    )
  }
}

export default withRouter(withStyles(styles)(Class));
