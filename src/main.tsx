import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ToastsContainer } from './components/atoms/Toasts';
import './styles/globals.css';
import App from './App';

import './i18next';
import { ThemeProvider } from './context/ThemeContext';
import { HolidayThemeProvider } from './context/HolidayThemeContext';

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <HolidayThemeProvider>
      <ThemeProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </HolidayThemeProvider>
  </StrictMode>,
);

createRoot(document.getElementById('toast-root')!)?.render(<ToastsContainer />);
