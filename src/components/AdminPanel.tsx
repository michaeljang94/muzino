import { Box, Tab, Tabs } from '@mui/material';
import { useState } from 'react';
import { PlayerProfilePage } from '../pages/PlayerProfilePage';
import { UsersPage } from '../pages/UsersPage';
import { Scoreboard } from '../pages/Scoreboard';
import { TablesPage } from '../pages/table/TablesPage';
import { useNavigate } from 'react-router-dom';

export const AdminPanel = () => {
  const [value, setValue] = useState(0);
  const navigate = useNavigate();

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
          <Tab
            label="My Profile"
            onClick={() => {
              navigate('/');
            }}
          />
          <Tab label="Scoreboard" />
          <Tab label="Users" />
          <Tab
            label="Tables"
            onClick={() => {
              navigate('/tables');
            }}
          />
        </Tabs>
      </Box>

      {/* 
      {value === 0 && <PlayerProfilePage />}
      {value === 1 && <Scoreboard />}
      {value === 2 && <UsersPage />}
      {value === 3 && <TablesPage />} */}
    </Box>
  );
};
