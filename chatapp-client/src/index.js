import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import './main.scss';
import { Provider } from 'react-redux';
import store from './store';

import { Toaster } from 'react-hot-toast';

const root = ReactDOM.createRoot(document.getElementById('root'));

const toastOptions = {
  duration: 1000,
};

root.render(
  <Provider store={store}>
    <App />
    <Toaster position="top-right" toastOptions={toastOptions} />
  </Provider>
);
