import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './frontend/App';

import BackEndConnection from './frontend/components/tools/BackEndConnection';

import './index.css';

const backend = BackEndConnection.INSTANCE();

let pathKey = window.location.pathname.replaceAll("/", "");

backend.redirect_if_needed(pathKey, (data) => {
  console.log(data.result)
  if (data.msg === 'correct email') {
    window.location = '/reset-password';
  } else {
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  }
});