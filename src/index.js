import React from 'react';
import App from './App';
import { AuthProvider } from './AuthPage';
import { createRoot } from 'react-dom/client'; // Import createRoot from react-dom/client

const root = createRoot(document.getElementById('root'));

root.render(
  <AuthProvider>
    <App />
  </AuthProvider>
);