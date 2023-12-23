import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import ROUTES from './routing/Routes';
import AuthProvider from '@providers/AuthProvider';

import '@assets/styles/index.scss';

ReactDOM.createRoot(document.getElementById('app')!).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={ROUTES} />
    </AuthProvider>
  </StrictMode>
);
