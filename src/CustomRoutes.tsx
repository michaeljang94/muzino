import React from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { RegisterPage } from './pages/RegisterPage';
import { LoginPage } from './pages/LoginPage';
import { PrivateRoute } from './components/auth/PrivateRoute';
import { PlayerProfilePage } from './pages/PlayerProfilePage';
import { NavigationPanel } from './components/NavigationPanel';
import { useAuth } from './components/auth/AuthProvider';
import { TablesPage } from './pages/table/TablesPage';
import { TablePage } from './pages/table/TablePage';
import { UsersPage } from './pages/user/UsersPage';
import { useJwt } from 'react-jwt';
import { CreateTablePage } from './pages/table/CreateTablePage';
import { EditUserPage } from './pages/user/EditUserPage';
import { Scoreboard } from './pages/Scoreboard';
import { MissingRoute } from './pages/MissingRoute';
import { SettingsPage } from './pages/SettingsPage';
import { GamePage } from './pages/game/GamePage';

interface TokenPayload {
  username: string;
  role: string;
}

export const CustomRoutes: React.FC = () => {
  const { token } = useAuth();
  const { decodedToken, isExpired } = useJwt<TokenPayload>(token || '');

  const isAdmin = decodedToken?.role === 'admin';
  const username = decodedToken?.username || '';
  return (
    <>
      {token && <NavigationPanel isAdmin={isAdmin} />}
      <Routes>
        {isAdmin && (
          <>
            <Route path="/tables" element={<TablesPage />} />
            <Route path="/table/create" element={<CreateTablePage />} />
            <Route path="/table/:id" element={<TablePage />} />
            <Route path="/users" element={<UsersPage />} />

            <Route path="/user/:id/edit" element={<EditUserPage />} />

            <Route path="/scoreboard" element={<Scoreboard />} />
          </>
        )}

        {token && (
          <Route path="/">
            <Route index element={<PlayerProfilePage />} />
            <Route path="/" element={<PlayerProfilePage />} />
            <Route path="/player" element={<PlayerProfilePage />} />
            <Route path="/game" element={<GamePage />} />
            <Route path="/settings" element={<SettingsPage username={username} />} />
          </Route>
        )}

        {!token && (
          <Route path="/">
            <Route index element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Route>
        )}

        <Route path="*" element={<MissingRoute />} />
      </Routes>
    </>
  );
};
