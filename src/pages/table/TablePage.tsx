import {
  Box,
  Container,
  Grid,
  List,
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { EnvironmentVariables } from '../../config';

interface Player {
  name: string;
}

interface Session {
  session_id: string;
}

export const TablePage: React.FC = () => {
  const { id } = useParams();

  const [tableName, setTableName] = useState('');
  const [game, setGame] = useState('');
  const [players, setPlayers] = useState<Player[]>([]);
  const [sessions, setSessions] = useState<Session[]>([]);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [sessionValue, setSessionValue] = React.useState('');

  const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);

  const handleMenuItemClick = (event: React.MouseEvent<HTMLElement>, index: number) => {
    setSelectedIndex(index);
    setAnchorEl(null);
    setSessionValue(sessions[index]?.session_id);
  };

  useEffect(() => {
    const fetchTableDetails = async () => {
      try {
        const addr = EnvironmentVariables.ZIKEEPER_ENDPOINT;

        const response = await fetch(`${addr}/api/table/${id}`);

        const table = await response.json();

        setTableName(table.table.name);
        setGame(table.table.game);
      } catch (error: any) {
      } finally {
      }
    };

    const fetchGameSessionPlayers = async () => {
      try {
        const sessionId = sessionValue;
        const addr = EnvironmentVariables.ZIKEEPER_ENDPOINT;
        const response = await fetch(`${addr}/api/table/${id}/session/${sessionId}/players`);

        const players = await response.json();

        setPlayers(players.players);
      } catch (error: any) {
      } finally {
      }
    };

    const fetchSessionsForTable = async () => {
      try {
        const addr = EnvironmentVariables.ZIKEEPER_ENDPOINT;
        const response = await fetch(`${addr}/api/table/${id}/sessions`);
        const sessions = await response.json();

        setSessions(sessions?.table_sessions);
        setSessionValue(sessions?.table_sessions[selectedIndex]?.session_id);
      } catch (error: any) {
      } finally {
      }
    };

    fetchTableDetails();
    fetchSessionsForTable();
    fetchGameSessionPlayers();
  }, [sessionValue]);

  const tableHeaders = ['Name', 'Bet', 'Turn'];

  return (
    <>
      <Container maxWidth="md">
        <Grid container spacing={2}>
          <Grid size={6}>
            <h1>{tableName}</h1>
          </Grid>
          <Grid size={6}>
            <h1>{game}</h1>
          </Grid>
          <Grid size={12}>
            <h1>Session</h1>
            <List component="nav" aria-label="Device settings" sx={{ bgcolor: 'background.paper' }}>
              <ListItemButton
                id="lock-button"
                aria-haspopup="listbox"
                aria-controls="lock-menu"
                aria-label="Session ID"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClickListItem}
              >
                <ListItemText
                  primary="Session ID"
                  secondary={sessions && sessions[selectedIndex]?.session_id}
                />
              </ListItemButton>
            </List>
            <Menu
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              slotProps={{
                list: {
                  'aria-labelledby': 'lock-button',
                  role: 'listbox',
                },
              }}
            >
              {sessions?.map((session, index) => (
                <MenuItem
                  selected={index === selectedIndex}
                  onClick={event => handleMenuItemClick(event, index)}
                >
                  {session?.session_id}
                </MenuItem>
              ))}
            </Menu>
          </Grid>
          <Grid size={12}>
            <h1>Players</h1>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    {tableHeaders.map(header => (
                      <TableCell>{header}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {players?.map(player => (
                    <>
                      <TableRow hover>
                        <TableCell>{player.name}</TableCell>
                      </TableRow>
                    </>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};
