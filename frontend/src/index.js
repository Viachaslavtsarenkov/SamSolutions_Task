import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import AuthorsList from "./component/authors/AuthorsList";
import axios from 'axios'
import SignUP from "./component/auth/SignUp";

ReactDOM.render(
  <React.StrictMode>
      <SignUP/>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
