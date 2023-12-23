import React, { FunctionComponent, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

const AuthLayout: FunctionComponent = () => (
  <div id='auth-layout'>
    <Suspense fallback='Loading component...'>
      <Outlet />
    </Suspense>
  </div>
);

export default AuthLayout;
