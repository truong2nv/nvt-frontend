import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import './index.css'
import App from './App'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Provider } from 'react-redux';
import { store } from './store';

const theme = createTheme({
  palette: {
    mode: 'light', // hoặc 'dark'
    primary: {
      main: '#1976d2',
    },
    background: {
      default: '#f5f5f5',
    },
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <App />
        </Provider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
)