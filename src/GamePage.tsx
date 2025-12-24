import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Grid,
  LinearProgress,
  Stack,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { EnvironmentVariables } from './config';
import { jwtDecode } from 'jwt-decode';
import { TokenPayload } from './pages/PlayerProfilePage';
import { useAuth } from './components/auth/AuthProvider';

interface SessionInfo {
  session_id: string;
  table_name: string;
}

export const GamePage: React.FC = () => {
  const [openLeaveDialog, setOpenLeaveDialog] = useState(false);
  const [inGame, setInGame] = useState(false);
  const { token } = useAuth();
  const [error, setError] = useState(null);
  const [sessionInfo, setSessionInfo] = useState<SessionInfo>();

  useEffect(() => {
    const addr = EnvironmentVariables.ZIKEEPER_ENDPOINT;
    const decoded = jwtDecode<TokenPayload>(token || '');
    const username = decoded.username;
    const fetchSessionInfo = async () => {
      try {
        const response = await fetch(`${addr}/api/user/${username}/session`, {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        });

        if (response.ok) {
          const sessionInfo = await response.json();
          setInGame(true);
          setSessionInfo(sessionInfo.player_session);
        }

        setError(null);
      } catch (error: any) {
        setError(error);
      } finally {
      }
    };

    fetchSessionInfo();
  }, [inGame]);

  const onClickLeaveGame = () => {
    setOpenLeaveDialog(true);
  };

  const onClickJoinGame = () => {
    setInGame(true);
  };

  const showLeaveDialog = () => {
    return (
      <Dialog open={openLeaveDialog}>
        <DialogTitle>Leave Game</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to leave the current game?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={() => {
              setOpenLeaveDialog(false);
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              setOpenLeaveDialog(false);
              setInGame(false);
            }}
          >
            Accept
          </Button>
        </DialogActions>
      </Dialog>
    );
  };
  return (
    <>
      <Container maxWidth="sm">
        <Grid container spacing={2}>
          <Grid size={12}>
            <h1>Game</h1>
          </Grid>
          <Grid size={12}>
            {!inGame && <Divider />}
            {inGame && <LinearProgress color="warning" />}
          </Grid>
          <Grid size={12}>
            <h1>{sessionInfo?.session_id}</h1>
            <h1>{sessionInfo?.table_name}</h1>
          </Grid>
          <Grid size={12}>
            {!inGame && <Divider />}
            {inGame && <LinearProgress color="warning" />}
          </Grid>
          <Grid size={12}>
            <Container maxWidth="sm">
              {!inGame && (
                <Button
                  onClick={onClickJoinGame}
                  color={'primary'}
                  variant={'contained'}
                  style={{ height: 100 }}
                  fullWidth
                >
                  Join Game
                </Button>
              )}
              {inGame && (
                <Button
                  onClick={onClickLeaveGame}
                  color={'error'}
                  variant={'contained'}
                  style={{ height: 100 }}
                  fullWidth
                >
                  Leave Game
                </Button>
              )}
            </Container>
          </Grid>
        </Grid>
      </Container>
      {showLeaveDialog()}
    </>
  );
};
