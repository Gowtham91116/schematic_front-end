import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import './css/style.css';
import './css/satoshi.css';
import 'jsvectormap/dist/css/jsvectormap.css';
import 'flatpickr/dist/flatpickr.min.css';
import { GoogleOAuthProvider } from '@react-oauth/google';


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="1062156057892-oqukd3of5sdc2vmdb0solhomfu3regdm.apps.googleusercontent.com">
    <Router>
      <App />
    </Router>
    </GoogleOAuthProvider>;
  </React.StrictMode>,
);
