import React, { lazy } from 'react';
import { Navigate, createBrowserRouter } from 'react-router-dom';

import App from './App';
import PageNotFound from '../pages/PageNotFound';

import AuthLayout from './layouts/AuthLayout';
const Login = lazy(() => import('../pages/auth/Login'));
const Register = lazy(() => import('../pages/auth/Register'));
const ForgotPassword = lazy(() => import('../pages/auth/ForgotPassword'));

import AccountLayout from './layouts/AccountLayout';
const Dashboard = lazy(() => import('../pages/account/Dashboard'));
const Widget1 = lazy(() => import('../pages/account/Widget1'));
const Settings = lazy(() => import('../pages/account/Settings'));
const Profile = lazy(() => import('../pages/account/Profile'));

import { RouteObject } from '@utils/models';

const ROUTES = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <PageNotFound />,
    children: [
      {
        path: 'auth',
        element: <AuthLayout />,
        children: [
          { element: <Navigate to='login' replace />, index: true },
          { path: 'login', element: <Login /> },
          { path: 'register', element: <Register /> },
          { path: 'forgot-password', element: <ForgotPassword /> }
        ]
      },
      {
        path: 'account',
        element: <AccountLayout />,
        children: [
          { element: <Navigate to='dashboard' replace />, index: true },
          {
            path: 'dashboard',
            element: <Dashboard />,
            handle: { crumb: 'Dashboard' } as RouteObject['handle'],
            children: [
              {
                path: 'widget-1',
                element: <Widget1 />,
                handle: { crumb: 'Widget 1' } as RouteObject['handle']
              }
            ]
          },
          {
            path: 'settings',
            element: <Settings />,
            handle: { crumb: 'Settings' } as RouteObject['handle']
          },
          {
            path: 'profile',
            element: <Profile />,
            handle: { crumb: 'Profile' } as RouteObject['handle']
          }
        ]
      }
    ]
  }
]);

export default ROUTES;
