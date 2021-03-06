import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { withRouter } from "react-router-dom";
import withStyles from "@material-ui/styles/withStyles";


const styles = theme => ({
 root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
});

  class ButtonAppBar extends React.Component {

  render() {
    const classes = this.props.classes;
    return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Frost Hack
          </Typography>
          <Button onClick={() => this.props.history.push('/notes')} color="inherit">Notes</Button>
          <Button onClick={() => this.props.history.push('/record')} color="inherit">Record</Button>
          <Button onClick={this.props.logOutFunc} color="inherit">Log Out</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
  }
}

export default withRouter(withStyles(styles)(ButtonAppBar));
