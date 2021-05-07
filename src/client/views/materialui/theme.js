import { red } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';

// A custom theme for this website
const theme = createMuiTheme({
  typography: {
    fontFamily: [
      'Poppins',
      'sans-serif',
    ].join(','),
  },
  palette: {
    // PRIMARY COLOR
    primary: {
      main: '#5928E5',
    },
    // SECONDARY COLOR
    secondary: {
      main: '#FFD4D9',
    },
    success: {
      main: '#4caf50'
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },
  },
});

export default theme;
