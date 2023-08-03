import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';

import config from '../config.js';

document.title = config.configs.title;
const root = document.getElementById('root');
const rootElement = ReactDOM.createRoot(root);
rootElement.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);