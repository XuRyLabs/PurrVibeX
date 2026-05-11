import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles.css';
import './landing.css';
import './pages/pages.css';
import { LanguageProvider } from './i18n.jsx';
import { AuthProvider } from './auth.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LanguageProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </LanguageProvider>
  </React.StrictMode>
);
