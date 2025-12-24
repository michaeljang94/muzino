import { Box, Tab, Tabs } from '@mui/material';
import { useState } from 'react';
import { PlayerProfilePage } from '../pages/PlayerProfilePage';
import { UsersPage } from '../pages/user/UsersPage';
import { Scoreboard } from '../pages/Scoreboard';
import { TablesPage } from '../pages/table/TablesPage';
import { useNavigate } from 'react-router-dom';

export interface NavigationPanelProps {
  isAdmin: boolean;
}

export const NavigationPanel: React.FC<NavigationPanelProps> = ({ isAdmin }) => {
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
          {isAdmin && (
            <Tab
              label="Scoreboard"
              onClick={() => {
                navigate('/scoreboard');
              }}
            />
          )}
          {isAdmin && (
            <Tab
              label="Users"
              onClick={() => {
                navigate('/users');
              }}
            />
          )}
          {isAdmin && (
            <Tab
              label="Tables"
              onClick={() => {
                navigate('/tables');
              }}
            />
          )}
          <Tab
            label="Game"
            onClick={() => {
              navigate('/game');
            }}
          />
          <Tab
            label="Settings"
            onClick={() => {
              navigate('/settings');
            }}
          />
        </Tabs>
      </Box>
    </Box>
  );
};
