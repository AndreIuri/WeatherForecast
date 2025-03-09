// index.tsx or main.tsx (root entry file)
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <BrowserRouter>  {/* Ensure this matches your deployment base */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);