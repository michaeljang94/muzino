import { Box, Tab, Tabs } from '@mui/material';
import { useState } from 'react';
import { PlayerProfilePage } from '../pages/PlayerProfilePage';
import { Scoreboard } from '@mui/icons-material';
import { UsersPage } from '../pages/UsersPage';

export const AdminPanel = () => {
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
};
