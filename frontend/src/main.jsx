/*
 *  FileName:-     main.jsx
 *  Description:-  React application entry point with Redux Provider, Router, and Toast
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { store } from '@stores/store';
import App from './App';
import '@styles/global.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <App />
        <Toaster
          position="top-right"
          reverseOrder={false}
          gutter={8}
          containerStyle={{
            top: 80,
            right: 16,
          }}
          toastOptions={{
            duration: 4000,
            style: {
              background: '#000000',
              color: '#ffffff',
              fontFamily: 'Inter, sans-serif',
              fontSize: '14px',
              fontWeight: '500',
              letterSpacing: '-0.01em',
              borderRadius: '8px',
              padding: '12px 16px',
              maxWidth: '380px',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
            },
            success: {
              iconTheme: {
                primary: '#00B4D8',
                secondary: '#000000',
              },
            },
            error: {
              iconTheme: {
                primary: '#FF6B35',
                secondary: '#000000',
              },
            },
          }}
        />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
