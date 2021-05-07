import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// Importing Material UI config
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './views/materialui/theme';
// CSS File
import './index.css';

// Rendering the app
ReactDOM.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <App />
  </ThemeProvider>,
  document.getElementById('root')
);
