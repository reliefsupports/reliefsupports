import React from 'react';
import ReactDOM from 'react-dom/client';

import Providers from 'providers';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { init as httpInit } from 'utils/http';

httpInit();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Providers>
      <App />
    </Providers>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
