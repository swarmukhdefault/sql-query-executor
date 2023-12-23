import React, { FunctionComponent, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router';

import { useAuthContext } from '@providers/AuthProvider';
import FeatureToggle from '@components/FeatureToggle';

import '@assets/styles/App.scss';

const App: FunctionComponent = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { isAuthenticated } = useAuthContext();

  useEffect(() => {
    if (isAuthenticated()) {
      if (location.pathname === '/' || location.pathname.startsWith('/auth')) {
        navigate('/account');
      }
    } else {
      if (location.pathname === '/' || location.pathname.startsWith('/account')) {
        navigate('/auth');
      }
    }
  }, [isAuthenticated]);

  return (
    <>
      <Outlet />
      {import.meta.env.VITE_DEPLOYMENT_ENVIRONMENT !== 'production' && <FeatureToggle />}
    </>
  );
};

export default App;
