import React, { FunctionComponent, Suspense } from 'react';
import { Link, Outlet, useMatches } from 'react-router-dom';

import { RouteObject } from '../../utils/models';
import { useAuthContext } from '../../providers/AuthProvider';

const AccountLayout: FunctionComponent = () => {
  const crumbs = useMatches().filter((match) => match.pathname.startsWith('/account/'));

  const { logout } = useAuthContext();

  const terminateSession = (): void => {
    logout();
  };

  return (
    <>
      <nav>
        <Link to='dashboard'>Dashboard</Link>&nbsp;|&nbsp;
        <Link to='settings'>Settings</Link>&nbsp;|&nbsp;
        <Link to='profile'>Profile</Link>&nbsp;|&nbsp;
        <button onClick={terminateSession}>Logout</button>
      </nav>
      <div id='breadcrumbs'>
        Crumbs:{' '}
        {crumbs.map((crumb, index) => (
          <Link key={index} to={crumb.pathname}>
            {(crumb.handle as RouteObject['handle'])?.crumb}
          </Link>
        ))}
      </div>
      <main>
        <Suspense fallback='Loading component...'>
          <Outlet />
        </Suspense>
      </main>
    </>
  );
};

export default AccountLayout;
