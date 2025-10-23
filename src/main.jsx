import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@mantine/core/styles.css';
import './index.css'

import App from './App.jsx'
import { AuthProviderWrapper } from "./context/auth.context";
import { BrowserRouter } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MantineProvider>
      <BrowserRouter>
        <AuthProviderWrapper>
          <App />
        </AuthProviderWrapper>
      </BrowserRouter>
    </MantineProvider>
  </StrictMode>
);
