import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { StateProvider } from './contexts/StateContext';
import App from './App';
import './styles/tailwind.css';

const root = document.getElementById('root');

if (!root) {
  throw new Error('root not found');
}

createRoot(root).render(
  <StrictMode>
    <StateProvider>
      <App />
    </StateProvider>
  </StrictMode>
);
