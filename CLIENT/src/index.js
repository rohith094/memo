import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from "react-hot-toast";

const rootElement = document.getElementById('root');

const appRoot = ReactDOM.createRoot(rootElement);

appRoot.render(
  <>
  <Toaster />
  <BrowserRouter>
    <App />
  </BrowserRouter>
  </>
);
