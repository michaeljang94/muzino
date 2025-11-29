import { HashRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import { Scoreboard } from './pages/Scoreboard';
import { PlayerProfilePage } from './pages/PlayerProfilePage';
import { Tabs, Tab, Container, Box } from '@mui/material';
import { useState } from 'react';
import { AdminPortal } from './pages/AdminPortal';
import { UsersPage } from './pages/UsersPage';

export const App = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          variant="scrollable"
          scrollButtons="auto"
        >
          {/* <Tab label="Admin Portal" /> */}
          <Tab label="My Profile" />
          <Tab label="Scoreboard" />
          <Tab label="Users" />
          <Tab label="Tables" />
        </Tabs>
      </Box>
      {/* {value === 0 && <AdminPortal />} */}
      {value === 0 && <PlayerProfilePage />}
      {value === 1 && <Scoreboard />}
      {value === 2 && <UsersPage />}
    </Box>
  );

  // return (
  //   <HashRouter>
  //     <nav>
  //       <ul>
  //         <li>
  //           <Link to="">Portal</Link>
  //         </li>
  //         <li>
  //           <Link to="/player">Player</Link>
  //         </li>
  //         <li>
  //           <Link to="/scoreboard">Scoreboard</Link>
  //         </li>
  //       </ul>
  //     </nav>
  // <Routes>
  //   <Route path="/scoreboard" element={<Scoreboard />} />
  //   <Route path="/player" element={<PlayerProfilePage />} />
  // </Routes>
  // </HashRouter>
  // );
};
