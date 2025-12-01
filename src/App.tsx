import { HashRouter, Route, Link } from 'react-router-dom';
import './App.css';
import { Scoreboard } from './pages/Scoreboard';
import { PlayerProfilePage } from './pages/PlayerProfilePage';
import { Tabs, Tab, Container, Box } from '@mui/material';
import { useState } from 'react';
import { AdminPortal } from './pages/AdminPortal';
import { UsersPage } from './pages/UsersPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { AuthProvider } from './components/auth/AuthProvider';
import { PrivateRoute } from './components/auth/PrivateRoute';
import { AdminPanel } from './components/AdminPanel';
import { Router } from './Router';

export const App = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  // return (
  // <Box sx={{ width: '100%' }}>
  //   <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
  //     <Tabs
  //       value={value}
  //       onChange={handleChange}
  //       aria-label="basic tabs example"
  //       variant="scrollable"
  //       scrollButtons="auto"
  //     >
  //       {/* <Tab label="Admin Portal" /> */}
  //       <Tab label="My Profile" />
  //       <Tab label="Scoreboard" />
  //       <Tab label="Users" />
  //       <Tab label="Tables" />
  //     </Tabs>
  //   </Box>
  //   {/* {value === 0 && <AdminPortal />} */}
  //   {value === 0 && <PlayerProfilePage />}
  //   {value === 1 && <Scoreboard />}
  //   {value === 2 && <UsersPage />}
  // </Box>
  // );

  return (
    <AuthProvider>
      {/* <HashRouter>
        <Routes>
          <Route path="/">
            <Route index element={<LoginPage />}></Route>
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/scoreboard" element={<Scoreboard />} />
            <Route
              path="/player"
              element={
                <PrivateRoute>
                  <PlayerProfilePage />
                </PrivateRoute>
              }
            />
          </Route>
        </Routes>
      </HashRouter> */}
      <Router />
    </AuthProvider>
  );
};
