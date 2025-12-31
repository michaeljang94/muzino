import {
  Alert,
  AlertTitle,
  Button,
  Container,
  Divider,
  Grid,
  IconButton,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { EnvironmentVariables } from '../../config';
import { jwtDecode } from 'jwt-decode';
import { TokenPayload } from '../PlayerProfilePage';
import { useAuth } from '../../components/auth/AuthProvider';
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';

import useWebSocket, { ReadyState } from 'react-use-websocket';
import { AddPlayerToSessionModal } from '../table/AddPlayerToSessionModal';

import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import { RemovePlayerFromSessionModal } from '../table/RemovePlayerFromSessionModal';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import { TransferMoneyModal } from '../TransferMoneyModal';

interface TableSession {
  session_id: string;
  table_name: string;
  dealer: string;
  status: string;
  pool: number;
}

interface Players {
  name: string;
}

interface SessionInfo {
  table_session: TableSession;
  players: Players[];
}

type GameState = 'waiting' | 'gaming';

export const DealerGamePage: React.FC = () => {
  const [tableSession, setTableSession] = useState<SessionInfo>();
  const { token } = useAuth();

  const addr = EnvironmentVariables.ZIKEEPER_ENDPOINT;
  const decoded = jwtDecode<TokenPayload>(token || '');
  const username = decoded.username;

  const [snackBarSuccess, setSnackBarSuccess] = useState(false);
  const [snackbarShow, setSnackbarShow] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('Something went wrong.');

  const [addPlayerToSessionDialogOpen, setAddPlayerToSessionDialogOpen] = useState(false);
  const [removePlayerFromSessionDialogOpen, setRemovePlayerFromSessionDialogOpen] = useState(false);

  const [playerToRemove, setPlayerToRemove] = useState('');

  const [transferMoneyDialogOpen, setTransferMoneyDialogOpen] = useState(false);
  const [transferToUsername, setTransferToUsername] = useState('');

  const handleAddPlayerToSession = () => {
    setAddPlayerToSessionDialogOpen(true);
  };

  const handleAddPlayerToSessionOnClose = () => {
    setAddPlayerToSessionDialogOpen(false);
  };
  useEffect(() => {
    const fetchTableSessionDetails = async () => {
      try {
        const response = await fetch(`${addr}/api/dealer/${username}/session`, {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        });

        if (response.ok) {
          const sessionInfo = await response.json();
          setTableSession(sessionInfo);
        }
      } catch (error: any) {
        setSnackBarSuccess(false);
        setSnackbarShow(true);
        setSnackbarMessage(error.Error);
      } finally {
      }
    };

    fetchTableSessionDetails();
  }, [snackbarShow, addPlayerToSessionDialogOpen]);

  const handleGameState = async (state: GameState) => {
    try {
      const response = await fetch(
        `${addr}/api/table/${tableSession?.table_session.table_name}/session/${tableSession?.table_session.session_id}/status/update`,
        {
          headers: {
            Authorization: 'Bearer ' + token,
          },
          method: 'POST',
          body: JSON.stringify({
            status: state,
          }),
        }
      );

      if (!response.ok) {
        throw 'Failed to start game.';
      }

      setSnackbarShow(true);
      setSnackbarMessage('Started game.');
      setSnackBarSuccess(true);
    } catch (error: any) {
      setSnackBarSuccess(false);
      setSnackbarShow(true);
      setSnackbarMessage(error);
    } finally {
    }
  };

  const handleRemovePlayerFromSession = async (username: string) => {
    try {
      const addr = EnvironmentVariables.ZIKEEPER_ENDPOINT;

      const response = await fetch(
        `${addr}/api/table/${tableSession?.table_session.table_name}/session/${tableSession?.table_session.session_id}/player/delete`,
        {
          method: 'POST',
          headers: {
            Authorization: 'Bearer ' + token,
          },
          body: JSON.stringify({
            username: username,
          }),
        }
      );

      const res = await response.json();

      if (!response.ok) {
        throw 'Removing player from session failed';
      }

      setSnackBarSuccess(true);
      setSnackbarShow(true);
      setSnackbarMessage(`Successfully removed ${username} from session`);

      setRemovePlayerFromSessionDialogOpen(false);
    } catch (error: any) {
      console.error(error);
      setSnackBarSuccess(false);
      setSnackbarShow(true);
      setSnackbarMessage('Removing player from session failed');
    } finally {
    }
  };

  const renderNoSession = () => {
    return <></>;
  };

  if (!tableSession) {
    return renderNoSession();
  }

  return (
    <>
      <Container maxWidth="sm">
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
          <Grid size={9}>
            <h1>{tableSession?.table_session.table_name}</h1>
            <h4>{tableSession?.table_session.session_id}</h4>
          </Grid>
          <Grid size={3}>
            <h2>{tableSession?.table_session.status}</h2>
          </Grid>
          <Grid size={2}>Pool</Grid>
          <Grid size={10} textAlign={'right'}>
            {tableSession?.table_session.pool}
          </Grid>
          <Grid size={12}>
            <Divider />
          </Grid>
          <Grid size={12}>
            <Button
              sx={{ boxShadow: '4px 4px black', border: '2px solid black', height: '75px' }}
              fullWidth
              variant="contained"
              startIcon={<PlayCircleFilledWhiteIcon />}
              onClick={handleAddPlayerToSession}
            >
              Add Player
            </Button>
          </Grid>
          <Grid size={12}>
            <Container maxWidth="sm">
              <TableContainer
                sx={{ border: '2px solid black', borderRadius: '10px', boxShadow: '4px 4px black' }}
              >
                <Table>
                  <TableBody>
                    {tableSession?.players?.map(player => (
                      <>
                        <TableRow>
                          <TableCell>{player.name}</TableCell>
                          <TableCell align="center">
                            <IconButton
                              color="success"
                              onClick={() => {
                                setTransferToUsername(player.name);
                                setTransferMoneyDialogOpen(true);
                              }}
                            >
                              <CurrencyExchangeIcon />
                            </IconButton>
                          </TableCell>
                          <TableCell align="center">
                            <IconButton
                              color="error"
                              onClick={() => {
                                // handleRemovePlayerFromSession(player.name);
                                setRemovePlayerFromSessionDialogOpen(true);
                                setPlayerToRemove(player.name);
                              }}
                            >
                              <PersonRemoveIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      </>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Container>
          </Grid>
          <Grid size={12}>
            <Divider />
          </Grid>
          <Grid size={12}>
            <Button
              sx={{ boxShadow: '4px 4px black', border: '2px solid black', height: '75px' }}
              fullWidth
              variant="contained"
              color={tableSession.table_session.status === 'waiting' ? 'primary' : 'error'}
              startIcon={<PlayCircleFilledWhiteIcon />}
              onClick={() => {
                tableSession.table_session.status === 'waiting'
                  ? handleGameState('gaming')
                  : handleGameState('waiting');
              }}
            >
              {tableSession.table_session.status === 'gaming' ? 'Stop Game' : 'Start Game'}
            </Button>
          </Grid>
        </Grid>
      </Container>
      <AddPlayerToSessionModal
        open={addPlayerToSessionDialogOpen}
        onClose={handleAddPlayerToSessionOnClose}
        tableName={tableSession.table_session.table_name}
        sessionId={tableSession.table_session.session_id}
      />
      <RemovePlayerFromSessionModal
        open={removePlayerFromSessionDialogOpen}
        onClose={() => {
          setRemovePlayerFromSessionDialogOpen(false);
        }}
        onClick={() => {
          handleRemovePlayerFromSession(playerToRemove);
        }}
        username={playerToRemove}
      />
      <TransferMoneyModal
        open={transferMoneyDialogOpen}
        onClose={() => {
          setTransferMoneyDialogOpen(false);
        }}
        transferTo={transferToUsername}
      />
    </>
  );
};
