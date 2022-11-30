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
    MuiTableSortLabel: {
      styleOverrides: {
        root: {
          color: '#fff',
          transition: 0.1,
          '&:hover': {
            color: 'salmon',
            transition: 0.1,
          },
          '&.Mui-active': {
            color: 'salmon',
          },
        },
        icon: {
          '& path': {
            fill: '#eee',
          },
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: '#fff',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          color: '#fff',
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          color: '#fff',
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          fill: '#fff',
        },
      },
    },
    MuiFilledInput: {
      styleOverrides: {
        root: {
          color: '#fff',
          '&::after': {
            borderBottomColor: '#fff',
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          color: '#fff',
        },
        notchedOutline: {
          borderColor: 'white',
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        root: {
          '&.MuiInput-underline::before': {
            borderBottomColor: 'rgba(255,255,255,0.3)',
          },
          '&.MuiInput-underline:hover:not(.Mui-disabled):before': {
            borderBottomColor: 'rgba(255,255,255,0.5)',
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        input: {
          '&.MuiInput-input': {
            color: 'white',
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: 'white',
          '&.Mui-focused': {
            color: 'white',
          },
        },
      },
    },
    MuiLoadingButton: {
      styleOverrides: {
        root: {
          '&.Mui-disabled': {
            color: '#ADADAD',
          },
        },
      },
    },
  },
});

export default darkTheme;
