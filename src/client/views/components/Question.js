import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import withStyles from '@material-ui/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const styles = theme => ({
  container: {
    maxWidth: 1000,
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px 0px 30px'
  },
  bottomMargin: {
    marginBottom: theme.spacing(2)
  },
  form: {
    marginBottom: '25px',
    padding: '0 30px'
  }
});

class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {
      question: '',
      option1: '',
      option2: '',
      option3: '',
      option4: '',
      correctAnswer: ''
    };
  }

  handleChange = (e) => {
    e.preventDefault();
    const { value, name } = e.target;
    this.setState({[name]: value});
  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state);
    const {question, option1, option2, option3, option4} = this.state;
    axios.post('/api/class/createClass', {
      question,
      option1,
      option2,
      option3,
      option4,
      teacher: this.props.userData.id
    }, {
      headers: {
        "Content-Type": "application/json",
      }
    }).then(res => {
      console.log(res.data);
      // this.props.updateClass(res.data.classData);
    }).catch(err => {
      console.log(err);
    });
  }

handleRadio = e => {
    this.setState({correctAnswer: e.target.value});
  }

  render() {
    const { classes, open, onClose } = this.props;
    return (
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        scroll='body'
      >
        <DialogContent>
            <div className={classes.container}>
              <form className={classes.form} noValidate autoComplete="off">
                <TextField id="question"
                 onChange={this.handleChange}
                 name="question"
                 label="Question"
                 fullWidth
                 value={this.state.qustion} />
                <TextField id="option1"
                 onChange={this.handleChange}
                 name="option1"
                 label="Option 1"
                 fullWidth
                 value={this.state.option1} />
                <TextField id="option2"
                 onChange={this.handleChange}
                 name="option2"
                 label="Option 2"
                 fullWidth
                 value={this.state.option2} />
                <TextField id="option3"
                 onChange={this.handleChange}
                 name="option3"
                 label="Option 3"
                 fullWidth
                 value={this.state.option3} />
                 <TextField id="option4"
                 onChange={this.handleChange}
                 name="option4"
                 label="Option 4"
                 fullWidth
                 value={this.state.option4} />
                  <FormLabel component="legend" className={classes.role}>Correct Answer:</FormLabel>
                 <RadioGroup aria-label="role" name="role" value={this.state.correctAnswer} onChange={this.handleRadio}>
                <FormControlLabel value="option1" control={<Radio />} label="Option 1" />
             <FormControlLabel value="option2" control={<Radio />} label="Option 2" />
             <FormControlLabel value="option3" control={<Radio />} label="Option 3" />
             <FormControlLabel value="option4" control={<Radio />} label="Option 4" />
            </RadioGroup>
              </form>
              <Button className={classes.saveButton} variant='contained' color='primary' onClick={this.handleSubmit}>
                Save
              </Button>
            </div>
        </DialogContent>
      </Dialog>
    )
  }
}

export default withRouter(withStyles(styles)(Question));
