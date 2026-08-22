import React from 'react';
import ReactDOM from 'react-dom/client';
import AppV2 from './v2/AppV2.tsx';
import './v2/v2.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppV2 />
  </React.StrictMode>,
);
