
import React from 'react';
// Material UI components
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
    root: {

    },
    notFound: {
      color: "#6604ff",
      fontSize: "32px",
    }
});

function NotFound(props) {
    const classes = props.classes;
    return (
        <Grid style={{width: '100%', height: '100%'}} container direction="column" justify="center" alignItems="center">
          <Typography className={classes.notFound} component="h2" variant="h2" align="center">
            Page Not Found
          </Typography>
        </Grid>
    )
}

export default withStyles(styles)(NotFound);
