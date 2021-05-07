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

class InstructionDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  handleChange = (e) => {
    e.preventDefault();
    const { value, name } = e.target;
    switch(name) {
        case "name":
        {
          this.setState({name: value});
          break;
        }
        case "description":
        {
          this.setState({description: value});
          break;
        }
        case "semester":
        {
          this.setState({semester: value});
          break;
        }
        case "meetlink":
        {
          this.setState({meetlink: value});
          break;
        }
        default:
          break;
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state);
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
                <TextField id="name"
                 onChange={this.handleChange}
                 name="name"
                 label="Name"
                 fullWidth
                 value={this.state.name} />
                <TextField id="description"
                 onChange={this.handleChange}
                 name="description"
                 label="Description"
                 fullWidth
                 value={this.state.description} />
                <TextField id="semester"
                 onChange={this.handleChange}
                 name="semester"
                 label="Semester"
                 type="number"
                 fullWidth
                 value={this.state.semester} />
                <TextField id="meetlink"
                 onChange={this.handleChange}
                 name="meetlink"
                 label="Meet Link"
                 fullWidth
                 value={this.state.meetlink} />
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

export default withRouter(withStyles(styles)(InstructionDialog));
