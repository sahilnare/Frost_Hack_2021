import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';
import { withRouter } from 'react-router-dom';
import { Button, TextField, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import GoogleLogin from 'react-google-login';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const styles = theme => ({
  form: {
    paddingLeft: '100px',
    paddingRight: '100px',
    paddingBottom: '125px',
    flexBasis: '700px',
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2)
    }
  },
  title: {
    color: theme.palette.common.contrastText,
    marginTop: theme.spacing(3)
  },
  socialLogin: {
    margin: theme.spacing(4, 0)
  },
  fields: {
    marginTop: theme.spacing(2)
  },
  textField: {
    width: '100%',
    '& + & ': {
      marginTop: theme.spacing(2)
    }
  },
  role: {
    marginTop: theme.spacing(2)
  }
});

class LoginForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      role: 'student'
    };
  }

  handleFieldChange = e => {
    this.setState({[e.target.name]: e.target.value});
  }

  handleRadio = e => {
    this.setState({role: e.target.value});
  }

  googleLogin = (response) => {

    this.props.signInAction({name: profileObj.name, role: this.state.role, email: profileObj.email})
  }

  render() {
    const { classes } = this.props;
    return (
      <form className={classes.form}>
        <Typography className={classes.title} variant="h4">
          Sign in
        </Typography>
        <div className={classes.fields}>
        <FormLabel component="legend" className={classes.role}>Role:</FormLabel>
          <RadioGroup aria-label="role" name="role" value={this.state.role} onChange={this.handleRadio}>
            <FormControlLabel value="student" control={<Radio />} label="Student" />
            <FormControlLabel value="teacher" control={<Radio />} label="Teacher" />
          </RadioGroup>
        </div>

        <div className={classes.socialLogin}>
          <GoogleLogin
            clientId={"570424297412-pqm9jfn34blq2omv5m0baf7vpr6jmin0.apps.googleusercontent.com"}
            onSuccess={this.googleLogin}
            onFailure={this.googleLogin}
            cookiePolicy={'single_host_origin'}
            render={renderProps => (
              <Button
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                fullWidth
                variant="contained"
                style={{
                  borderRadius: 0,
                  background: '#de5246',
                  color: '#fff',
                  marginBottom: 10,
                  height: 60,
                  fontSize: 'calc(.27548vw + 12.71074px)',
                  fontWeight: 700
                }}>
                Login With Google
              </Button>
            )}
          />
        </div>
      </form>
    );
  }
}


export default withRouter(withStyles(styles)(LoginForm));
