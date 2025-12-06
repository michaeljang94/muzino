import React from 'react';
import { useAuth } from './components/auth/AuthProvider';
import { LoginPage } from './pages/LoginPage';
import { PlayerProfilePage } from './pages/PlayerProfilePage';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router';
import { Scoreboard } from './pages/Scoreboard';
import { PrivateRoute } from './components/auth/PrivateRoute';
import { AdminPanel } from './components/AdminPanel';
import { RegisterPage } from './pages/RegisterPage';
import { TablePage } from './pages/table/TablePage';
import { TablesPage } from './pages/table/TablesPage';

export const Router = () => {
  const { token } = useAuth();

  const tableRoutes = [
    {
      path: '/table/:id',
      element: <TablePage />,
    },
    {
      path: '/tables',
      element: <TablesPage />,
    },
  ];

  const adminRoutes = [
    {
      path: '/admin',
      element: (
        <>
          <AdminPanel />
          <Outlet />
        </>
      ),
    },
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
    ...tableRoutes,
  ]);

  return <RouterProvider router={router}></RouterProvider>;
};
