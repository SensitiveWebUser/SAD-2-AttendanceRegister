import { createTheme } from '@mui/material';

const darkTheme = createTheme({
  typography: {
    h1: {
      fontSize: '1.7rem',
      color: 'primary.white',
    },
    h2: {
      fontSize: '1.5rem',
      color: 'primary.white',
    },
    h3: {
      fontSize: '1.2rem',
      color: 'primary.white',
    },
    body1: {
      fontSize: '1.0rem',
      color: 'primary.white',
    },
  },
  palette: {
    mode: 'dark',
    primary: {
      main: '#91E5F6',
      white: '#fff',
    },
    secondary: {
      main: '#84D2F6',
    },
    error: {
      main: '#FF3B00',
    },
    background: {
      default: '#24252a',
    },
  },
  components: {
    MuiTable: {
      color: 'primary.white',
    },
    MuiTableCell: {
      color: 'primary.white',
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarColor: '#6b6b6b #2b2b2b',
          '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
            backgroundColor: '#2b2b2b',
            width: 8,
          },
          '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
            backgroundColor: '#6b6b6b',
            minHeight: 24,
          },
          '&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus':
            {
              backgroundColor: '#959595',
            },
          '&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active':
            {
              backgroundColor: '#959595',
            },
          '&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover':
            {
              backgroundColor: '#959595',
            },
          '&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner': {
            backgroundColor: '#2b2b2b',
          },
        },
      },
    },
  },
});

export default darkTheme;
