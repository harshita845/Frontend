import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import store from './app/store';
import AppRoutes from './routes';
import ScrollToTop from './shared/components/ScrollToTop';

// Create premium custom Material UI theme matching Tailwind Forest Green + Teal
const theme = createTheme({
  palette: {
    primary: {
      main: '#14B8A6', // Vibrant Turquoise Teal
      dark: '#0D9488',
      light: '#E0F2FE',
    },
    secondary: {
      main: '#E11D48', // Crimson Red
      dark: '#BE123C',
      light: '#FFF1F2',
    },
    error: {
      main: '#E11D48',
    },
    background: {
      default: '#F8FAFC', // Slate 50
      paper: '#FFFFFF',
    },
    text: {
      primary: '#1E293B', // Slate 800
      secondary: '#64748B', // Slate 500
    },
  },
  typography: {
    fontFamily: ['Outfit', 'Inter', 'sans-serif'].join(','),
    h1: { fontWeight: 800 },
    h2: { fontWeight: 800 },
    h3: { fontWeight: 700 },
    button: {
      textTransform: 'none',
      fontWeight: 700,
    },
  },
  shape: {
    borderRadius: 16, // Rounded elements everywhere
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 24, // Pill buttons matching Netmeds/Tata 1mg
          boxShadow: 'none',
          padding: '8px 24px',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(20, 184, 166, 0.15)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 24,
          boxShadow: '0 4px 20px -2px rgba(20, 184, 166, 0.08)',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          backgroundColor: '#F8FAFC',
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#E2E8F0',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#14B8A6',
          },
        },
      },
    },
  },
});

export default function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <ScrollToTop />
          <AppRoutes />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
}
