import React from 'react';
import App from './App';
import { AuthProvider } from './AuthPage';
import { createRoot } from 'react-dom/client'; // Import createRoot from react-dom/client
import '@mui/material/styles';


const root = createRoot(document.getElementById('root'));

root.render(
  <AuthProvider>
    <App />
  </AuthProvider>
);