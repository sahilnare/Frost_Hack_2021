import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';
import { withRouter } from 'react-router-dom';
import { Button, TextField, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import GoogleLogin from 'react-google-login';

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
  progress: {
    display: 'block',
    marginTop: theme.spacing(2),
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  loginButton: {
    marginTop: theme.spacing(2),
    width: '100%'
  },
  register: {
    marginTop: theme.spacing(2),
    color: theme.palette.text.secondary
  },
  registerUrl: {
    color: theme.palette.primary,
    fontWeight: 'bold',
    '&:hover': {
      color: theme.palette.primary
    }
  },
  fieldError: {
    color: theme.palette.danger,
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(1)
  },
  submitError: {
    color: theme.palette.danger,
    alignText: 'center',
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(2)
  }
});

class LoginForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      role: ''
    };
  }

  handleFieldChange = e => {
    this.setState({[e.target.name]: e.target.value});
  }

  googleLogin = (response) => {

    console.log(response.profileObj);
  }

  render() {
    const { classes } = this.props;
    return (
      <form className={classes.form}>
        <Typography className={classes.title} variant="h2">
          Sign in
        </Typography>
        <div className={classes.fields}>
          <TextField
            className={classes.textField}
            label="Name"
            name="name"
            onChange={event => this.handleFieldChange(event)}
            type="text"
            value={this.state.name}
            variant="outlined"
          />
          <TextField
            className={classes.textField}
            label="Role"
            name="role"
            onChange={event => this.handleFieldChange(event)}
            type="text"
            value={this.state.role}
            variant="outlined"
          />
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
                  background: '#fff',
                  color: '#de5246',
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
