import React from 'react';
import { useAuth } from './components/auth/AuthProvider';
import { LoginPage } from './pages/LoginPage';
import { createHashRouter } from 'react-router-dom';
import { PlayerProfilePage } from './pages/PlayerProfilePage';
import { RouterProvider } from 'react-router';
import { Scoreboard } from './pages/Scoreboard';
import { PrivateRoute } from './components/auth/PrivateRoute';

export const Router = () => {
  const { token } = useAuth();

  const unauthenticatedRoutes = [
    {
      path: '/login',
      element: <LoginPage />,
    },
    {
      path: '/',
      element: <LoginPage />,
    },
  ];

  const authenticatedRoutes = [
    {
      path: '/',
      element: <PrivateRoute />,
      children: [
        {
          path: '/',
          element: <PlayerProfilePage />,
        },
        {
          path: '/player',
          element: <PlayerProfilePage />,
        },
        {
          path: '/scoreboard',
          element: <Scoreboard />,
        },
      ],
    },
  ];

  const router = createHashRouter([
    ...authenticatedRoutes,
    ...(!token ? unauthenticatedRoutes : []),
  ]);

  return <RouterProvider router={router}></RouterProvider>;
};
