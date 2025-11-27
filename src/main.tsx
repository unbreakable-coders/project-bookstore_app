import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { ToastsContainer } from './components/atoms/Toasts';
import './styles/globals.css';
import App from './App';

import './i18next';
import { ThemeProvider } from './context/ThemeContext';
import { HolidayThemeProvider } from './context/HolidayThemeContext';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60,
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <HolidayThemeProvider>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </QueryClientProvider>
      </ThemeProvider>
    </HolidayThemeProvider>
  </StrictMode>,
);

createRoot(document.getElementById('toast-root') as HTMLElement).render(
  <ToastsContainer />,
);
