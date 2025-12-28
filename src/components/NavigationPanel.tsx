import { AppBar, Box, Tab, Tabs } from '@mui/material';
import { useState } from 'react';
import { PlayerProfilePage } from '../pages/PlayerProfilePage';
import { UsersPage } from '../pages/user/UsersPage';
import { Scoreboard } from '../pages/Scoreboard';
import { TablesPage } from '../pages/table/TablesPage';
import { useNavigate } from 'react-router-dom';

import AccountBoxIcon from '@mui/icons-material/AccountBox';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import GroupIcon from '@mui/icons-material/Group';
import BackupTableIcon from '@mui/icons-material/BackupTable';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import SettingsIcon from '@mui/icons-material/Settings';

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
    <AppBar position="sticky" color="inherit">
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
              label="Profile"
              onClick={() => {
                navigate('/');
              }}
              iconPosition="top"
              icon={<AccountBoxIcon />}
            />
            {isAdmin && (
              <Tab
                label="Scoreboard"
                onClick={() => {
                  navigate('/scoreboard');
                }}
                iconPosition="top"
                icon={<EmojiEventsIcon />}
              />
            )}
            {isAdmin && (
              <Tab
                label="Users"
                onClick={() => {
                  navigate('/users');
                }}
                iconPosition="top"
                icon={<GroupIcon />}
              />
            )}
            {isAdmin && (
              <Tab
                label="Tables"
                onClick={() => {
                  navigate('/tables');
                }}
                iconPosition="top"
                icon={<BackupTableIcon />}
              />
            )}
            <Tab
              label="Game"
              onClick={() => {
                navigate('/game');
              }}
              iconPosition="top"
              icon={<SportsEsportsIcon />}
            />
            <Tab
              label="Settings"
              onClick={() => {
                navigate('/settings');
              }}
              iconPosition="top"
              icon={<SettingsIcon />}
            />
          </Tabs>
        </Box>
      </Box>
    </AppBar>
  );
};
