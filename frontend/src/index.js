import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import App from "./App";
import axios from "axios";
import AuthorizationService from "./service/AuthorizationService"

axios.defaults.headers['Authorization'] = AuthorizationService.authHeader().Authorization

ReactDOM.render(
  <React.StrictMode>
      <App/>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
