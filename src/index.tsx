// index.tsx
/**
 * This file is an entry point of application, appending to document, forwarding entry point to app.tsx
*/

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

ReactDOM.render(
  // <React.StrictMode>
    <App />,
  // </React.StrictMode>,
  document.getElementById('root')
);
