import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { StateProvider } from './contexts/StateContext';
import App from './App';

import './styles/tailwind.css';

ReactDOM.render(
  <StrictMode>
    <StateProvider>
      <App />
    </StateProvider>
  </StrictMode>,
  document.getElementById('root')
);
