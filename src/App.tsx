import { HashRouter, Route, Link, useNavigate, Router, BrowserRouter } from 'react-router-dom';
import './App.css';
import { Scoreboard } from './pages/Scoreboard';
import { PlayerProfilePage } from './pages/PlayerProfilePage';
import { Tabs, Tab, Container, Box } from '@mui/material';
import { useState } from 'react';
import { UsersPage } from './pages/UsersPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { AuthProvider } from './components/auth/AuthProvider';
import { PrivateRoute } from './components/auth/PrivateRoute';
import { AdminPanel } from './components/AdminPanel';
import { CustomRoutes } from './CustomRoutes';

export const App = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  // return (
  //   <AuthProvider>
  //     <Router />
  //   </AuthProvider>
  // );
  return (
    <AuthProvider>
      <BrowserRouter>
        <CustomRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
};
