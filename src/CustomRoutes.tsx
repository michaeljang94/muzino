import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { RegisterPage } from './pages/RegisterPage';
import { LoginPage } from './pages/LoginPage';
import { PrivateRoute } from './components/auth/PrivateRoute';
import { PlayerProfilePage } from './pages/PlayerProfilePage';
import { AdminPanel } from './components/AdminPanel';
import { useAuth } from './components/auth/AuthProvider';
import { TablesPage } from './pages/table/TablesPage';
import { TablePage } from './pages/table/TablePage';

export const CustomRoutes: React.FC = () => {
  const { token } = useAuth();
  const isAdmin = token === 'admin';
  return (
    <>
      {isAdmin && <AdminPanel />}
      <Routes>
        {isAdmin && (
          <>
            <Route path="/tables" element={<TablesPage />} />
            <Route path="/table/:id" element={<TablePage />} />
          </>
        )}

        {token && (
          <Route path="/">
            <Route index element={<PlayerProfilePage />} />
            <Route path="/" element={<PlayerProfilePage />} />
            <Route path="/player" element={<PlayerProfilePage />} />
          </Route>
        )}

        {!token && (
          <Route path="/">
            <Route index element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Route>
        )}

        <Route path="*" element={<></>} />
      </Routes>
    </>
  );
};
