import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ToastsContainer } from './components/atoms/Toasts';
import './styles/globals.css';
import App from './App';

import './i18next';
import { ThemeProvider } from './context/ThemeContext';

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
);

createRoot(document.getElementById('toast-root')!)?.render(<ToastsContainer />);
