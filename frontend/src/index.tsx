import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { MuiThemeProvider, createTheme } from '@material-ui/core/styles';  
import { Paper, ThemeProvider } from "@mui/material";
import { height } from '@mui/system';
import { lightGreen, amber } from '@mui/material/colors';



const theme = createTheme({
  palette: {
    type: 'dark',
    primary: lightGreen,
    secondary: amber,
    background: {
      default: '#212121',
      paper: '#424242',
    },
  },
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThemeProvider theme = { theme }>
      <Paper elevation={0} style={{    
          height: window.innerHeight}}>
        <App />
      </Paper>
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
