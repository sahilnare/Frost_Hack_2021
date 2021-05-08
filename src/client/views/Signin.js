import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Grid } from '@material-ui/core';
import { IconButton } from '@material-ui/core';
import { ArrowBack as ArrowBackIcon } from '@material-ui/icons';
import Typography from "@material-ui/core/Typography";
import LoginForm from './LoginForm';
import axios from 'axios';

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    height: '100vh'
  },
  grid: {
    height: '100%'
  },
  heading: {
    fontSize: '42px',
    textAlign: 'center'
  },
  bgWrapper: {
    [theme.breakpoints.down('md')]: {
      display: 'none'
    }
  },
  bg: {
    backgroundColor: theme.palette.common.neutral,
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage: 'url(https://images.unsplash.com/photo-1509062522246-3755977927d7)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    opacity: 0.5
  },
  content: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  contentHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: theme.spacing(5),
    paddingBototm: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  },

  contentBody: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      justifyContent: 'center'
    }
  }
});

class Signin extends Component {
  // handleBack = () => {
  //   const { history } = this.props;
  //   history.goBack();
  // };

  signInAction = (cred) => {
    axios.post('/api/auth/googlelogin', cred, {
      headers: {
        "Content-Type": "application/json",
      }
    }).then(res => {
      // console.log(res);
      this.props.logInFunc(res.data.cred.user);
      localStorage.setItem("frost_token", res.data.cred.token);
    }).catch(err => {
      console.log(err);
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Grid className={classes.grid} container>
          <Grid className={classes.bgWrapper} item lg={5}>
            <div className={classes.bg} />
          </Grid>
          <Grid className={classes.content} item lg={7} xs={12}>
            <div className={classes.contentHeader}>
              <Typography color='black' className={classes.heading} variant="h2" style={{marginLeft: "-80px"}}>
                Sign In
              </Typography>
            </div>
            <div className={classes.contentBody}>
              <LoginForm signInAction={this.signInAction} />
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

Signin.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default withStyles(styles)(Signin);
