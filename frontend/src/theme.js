import { createTheme } from '@mui/material/styles';


const mainTheme = createTheme({

        palette: {
    primary: {
      main: '#980003',
      light: '#e40824',
      dark: '#870507',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#fb0059',
      light: '#f9347a',
      dark: '#aa003d',
      contrastText: '#ffffff',
    },
    background: {
      default: '#5e5e5e',
      paper: '#6b6b6b',
    },
    text: {
      primary: '#ffffff',
      secondary: 'rgba(234,234,234,0.7)',
      disabled: 'rgba(203,202,202,0.5)',
      hint: 'rgba(191,191,191,0.5)',
    },
    divider: 'rgba(164,164,164,0.12)',
    success: {
      main: '#4baf4f',
      light: '#6ebd71',
      dark: '#337936',
      contrastText: 'rgba(0,0,0,0.87)',
    },
    info: {
      main: '#2097f5',
      light: '#4aa9f5',
      dark: '#1566a6',
      contrastText: '#ffffff',
    },
    warning: {
      main: '#ff9800',
      light: '#ffab36',
      dark: '#b36a00',
      contrastText: 'rgba(0,0,0,0.87)',
    },
    error: {
      main: '#f34336',
      light: '#f3655b',
      dark: '#a42c23',
      contrastText: '#ffffff',
    },
  },
});

export {mainTheme};