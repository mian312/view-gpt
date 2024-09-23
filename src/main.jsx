import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { ConsentProvider } from './contexts/ConsentContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ConsentProvider>
      <App />
    </ConsentProvider>
  </StrictMode>
);
