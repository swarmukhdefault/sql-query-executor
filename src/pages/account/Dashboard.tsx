import React, { FunctionComponent } from 'react';
import { Link, Outlet } from 'react-router-dom';

const Dashboard: FunctionComponent = () => (
  <div>
    Dashboard&nbsp;
    <Link to='/account/dashboard/widget-1'>View widget-1</Link>
    <div id='widgets'>
      <Outlet />
    </div>
  </div>
);

export default Dashboard;
