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
import { EnvironmentVariables } from '../../config';
import { jwtDecode } from 'jwt-decode';
import { TokenPayload } from '../PlayerProfilePage';
import { useAuth } from '../../components/auth/AuthProvider';

import { GameWaitPage } from './GameWaitPage';

interface SessionInfo {
  player_session: PlayerSessionInfo
  table_session: TableSessionInfo
}

interface PlayerSessionInfo {
  session_id: string;
  table_name: string;
}

interface TableSessionInfo {
  dealer: string;
}

interface TableInfo {
  name: string;
  game: string;
}

export const GamePage: React.FC = () => {
  const [openLeaveDialog, setOpenLeaveDialog] = useState(false);
  const [inGame, setInGame] = useState(false);
  const { token } = useAuth();
  const [error, setError] = useState(null);
  const [sessionInfo, setSessionInfo] = useState<SessionInfo>();
  const [tableInfo, setTableInfo] = useState<TableInfo>();

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
          setSessionInfo(sessionInfo);
        }

        setError(null);
      } catch (error: any) {
        setError(error);
      } finally {
      }
    };

    const fetchTableInfo = async () => {
      try {
        const addr = EnvironmentVariables.ZIKEEPER_ENDPOINT;

        const response = await fetch(`${addr}/api/table/${sessionInfo?.player_session.table_name}`, {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        });

        const table = await response.json();

        setTableInfo(table.table);
      } catch (error: any) {
      } finally {
      }
    };

    fetchSessionInfo();

    if (sessionInfo?.player_session.table_name) {
      fetchTableInfo();
    }
  }, [inGame]);

  const onClickLeaveGame = () => {
    setOpenLeaveDialog(true);
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

  if (!inGame) {
    return <GameWaitPage />;
  }


  console.log(sessionInfo)
  return (
    <>
      <Container maxWidth="sm">
        <Grid container spacing={2}>
          <Grid
            size={8}
            display={inGame ? 'flow' : 'flex'}
            alignContent={'center'}
            justifyContent="center"
          >
            <h1>{sessionInfo?.player_session.table_name}</h1>
            <h3>{tableInfo?.game}</h3>
          </Grid>
          <Grid size={4}>
            <h1>{sessionInfo?.table_session?.dealer}</h1>
          </Grid>
          <Grid size={12}>
            <LinearProgress color="warning" />
          </Grid>
          <Grid size={12}>
            <h4>Total Money</h4>
          </Grid>
          <Grid size={12}>
            <h4>Players</h4>
          </Grid>
          <Grid size={12}>
            <LinearProgress color="warning" />
          </Grid>
          <Grid size={12}>
            <Container maxWidth="sm">
              <Button
                onClick={onClickLeaveGame}
                color={'error'}
                variant={'contained'}
                style={{ height: 100 }}
                fullWidth
              >
                Leave Game
              </Button>
            </Container>
          </Grid>
        </Grid>
      </Container>
      {showLeaveDialog()}
    </>
  );
};
