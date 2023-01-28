import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import BackEndConnection from "./components/BackendConnection";
const backend = BackEndConnection.INSTANCE();


let pathKey = window.location.pathname.replaceAll("/", "")

backend.redirect_if_needed(pathKey, (url) => {
  if (url !== '') {
    window.location = url;
  } else {
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  }
});



