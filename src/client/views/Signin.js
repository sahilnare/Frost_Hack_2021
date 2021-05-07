import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import withStyles from '@material-ui/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  container: {
    maxWidth: 600,
    flexGrow: 1,
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  bottomMargin: {
    marginBottom: theme.spacing(2)
  }
});

class Signin extends Component {
  render() {
    const { classes } = this.props;
    return (
      <>
        <h1>Signin</h1>
      </>
    )
  }
}

export default withRouter(withStyles(styles)(Signin));
