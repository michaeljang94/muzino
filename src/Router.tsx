import React from 'react';
import { useAuth } from './components/auth/AuthProvider';
import { LoginPage } from './pages/LoginPage';
import { PlayerProfilePage } from './pages/PlayerProfilePage';
import { createBrowserRouter, RouterProvider } from 'react-router';
import { Scoreboard } from './pages/Scoreboard';
import { PrivateRoute } from './components/auth/PrivateRoute';
import { AdminPanel } from './components/AdminPanel';
import { RegisterPage } from './pages/RegisterPage';

export const Router = () => {
  const { token } = useAuth();

  const adminRoutes = [
    {
      path: '/admin',
      element: <AdminPanel/>,
    }
  ];

  const unauthenticatedRoutes = [
    {
      path: '/register',
      element: <RegisterPage />,
    },
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

  const router = createBrowserRouter([
    ...authenticatedRoutes,
    ...(!token ? unauthenticatedRoutes : []),
    ...adminRoutes,
  ]);

  return <RouterProvider router={router}></RouterProvider>;
};
