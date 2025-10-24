import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import './index.css'

import App from './App.jsx'
import { AuthProviderWrapper } from "./context/auth.context";
import { BrowserRouter } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MantineProvider>
      <Notifications />
      <BrowserRouter>
        <AuthProviderWrapper>
          <App />
        </AuthProviderWrapper>
      </BrowserRouter>
    </MantineProvider>
  </StrictMode>
);
