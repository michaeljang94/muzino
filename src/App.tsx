import { HashRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import { Scoreboard } from './pages/Scoreboard';
import { PlayerProfilePage } from './pages/PlayerProfilePage';
import { Tabs, Tab, Container, Box } from '@mui/material';
import { useState } from 'react';
import { AdminPortal } from './pages/AdminPortal';

export const App = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Admin Portal" />
          <Tab label="My Profile" />
          <Tab label="Scoreboard" />
        </Tabs>
      </Box>
      {value === 0 && <AdminPortal />}
      {value === 1 && <PlayerProfilePage />}
      {value === 2 && <Scoreboard />}
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
  //     <Routes>
  //       <Route path="/scoreboard" element={<Scoreboard />} />
  //       <Route path="/player" element={<PlayerProfilePage />} />
  //     </Routes>
  //   </HashRouter>
  // );
};
