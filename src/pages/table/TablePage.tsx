import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Container,
  Divider,
  Grid,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem,
  Snackbar,
  Stack,
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
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { EnvironmentVariables } from '../../config';
import { useAuth } from '../../components/auth/AuthProvider';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteIcon from '@mui/icons-material/Delete';

interface Player {
  name: string;
}

interface Session {
  session_id: string;
}

export const TablePage: React.FC = () => {
  const { id } = useParams();

  const { token } = useAuth();

  const [tableName, setTableName] = useState('');
  const [game, setGame] = useState('');
  const [players, setPlayers] = useState<Player[]>([]);
  const [sessions, setSessions] = useState<Session[]>([]);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [sessionValue, setSessionValue] = React.useState('');

  const [snackbarShow, setSnackbarShow] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackBarSuccess, setSnackBarSuccess] = useState(true);

  const navigate = useNavigate();

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

        const response = await fetch(`${addr}/api/table/${id}`, {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        });

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
        const response = await fetch(`${addr}/api/table/${id}/session/${sessionId}/players`, {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        });

        const players = await response.json();

        setPlayers(players.players);
      } catch (error: any) {
      } finally {
      }
    };

    const fetchSessionsForTable = async () => {
      try {
        const addr = EnvironmentVariables.ZIKEEPER_ENDPOINT;
        const response = await fetch(`${addr}/api/table/${id}/sessions`, {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        });
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

  const handleCreateSession = async () => {
    try {
      const addr = EnvironmentVariables.ZIKEEPER_ENDPOINT;

      const response = await fetch(`${addr}/api/table/${tableName}/session/create`, {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });

      const res = await response.json();

      if (!response.ok) {
        throw 'Creating session failed';
      }

      setSnackBarSuccess(true);
      setSnackbarShow(true);
      setSnackbarMessage(`Successfully created session: ${res.session_id}`);

      setSessionValue(res.session_id);
      setSelectedIndex(sessions ? sessions.length : 0);
    } catch (error: any) {
      console.error(error);
      setSnackBarSuccess(false);
      setSnackbarShow(true);
      setSnackbarMessage('Creating session failed');
    } finally {
    }
  };

  const handleDeleteSession = async () => {
    try {
      const addr = EnvironmentVariables.ZIKEEPER_ENDPOINT;

      if (!sessions) {
        throw 'no available sessions';
      }

      const sesh = sessions[selectedIndex]?.session_id;

      if (sesh === '' || sesh === undefined) {
        throw 'invalid session id';
      }

      const response = await fetch(`${addr}/api/table/${tableName}/session/delete`, {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + token,
        },
        body: JSON.stringify({
          session_id: sesh,
        }),
      });

      const res = await response.json();

      if (!response.ok) {
        throw 'Deleting session failed';
      }

      setSnackBarSuccess(true);
      setSnackbarShow(true);
      setSnackbarMessage(`Successfully removed session: ${sesh}`);

      setSessionValue('');
      setSelectedIndex(0);
    } catch (error: any) {
      console.error(error);
      setSnackBarSuccess(false);
      setSnackbarShow(true);
      setSnackbarMessage('Deleting session failed');
    } finally {
    }
  };

  const handleDeleteTable = () => {
    if (sessions && sessions.length != 0) {
      setSnackBarSuccess(false);
      setSnackbarShow(true);
      setSnackbarMessage(`Cannot delete table. Delete all sessions before deleting.`);
      return;
    }
  };

  const tableHeaders = ['Name', 'Bet', 'Turn'];

  return (
    <>
      <Container maxWidth="md">
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={snackbarShow}
          autoHideDuration={2500}
          onClose={() => {
            setSnackbarShow(false);
          }}
        >
          <Alert severity={snackBarSuccess ? 'success' : 'error'}>
            <AlertTitle>{snackBarSuccess ? 'Success' : 'Error'}</AlertTitle>
            {snackbarMessage}
          </Alert>
        </Snackbar>
        <Grid container spacing={2}>
          <Grid size={2} alignContent={'center'}>
            <IconButton
              size="large"
              onClick={() => {
                navigate('/tables');
                // navigate(0);
              }}
            >
              <ArrowBackIcon />
            </IconButton>
          </Grid>
          <Grid size={2}>
            <h1>{tableName}</h1>
            <h3>{game}</h3>
          </Grid>
          <Grid size={8} alignContent={'center'}>
            <IconButton
              size="large"
              style={{ float: 'right' }}
              color="error"
              onClick={handleDeleteTable}
            >
              <DeleteIcon />
            </IconButton>
          </Grid>
          <Grid size={12}>
            <Divider />
          </Grid>
          <Container maxWidth="md">
            <Grid size={12}>
              <h1>Session</h1>
              <Button variant="contained" onClick={handleCreateSession}>
                Create Session
              </Button>
              <Button
                variant="contained"
                onClick={handleDeleteSession}
                style={{ marginLeft: '10px' }}
                color="error"
              >
                Delete Session
              </Button>
              <List
                component="nav"
                aria-label="Device settings"
                sx={{ bgcolor: 'background.paper' }}
              >
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
          </Container>
        </Grid>
      </Container>
    </>
  );
};
