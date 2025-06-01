import React from 'react';
import ReactDOM from 'react-dom/client';
import App from "./App.jsx";
import './index.css';
import './styles/reset.scss';
import './styles/header.scss';
import './styles/home/hero.scss';
import './styles/home/offer.scss';

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Tutorial credit: https://www.youtube.com/watch?v=kaquXEOj_qw
