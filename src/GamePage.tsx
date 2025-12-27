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

import './pages/game/GamePage.css';

interface SessionInfo {
  session_id: string;
  table_name: string;
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
          setSessionInfo(sessionInfo.player_session);
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

        const response = await fetch(`${addr}/api/table/${sessionInfo?.table_name}`, {
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

    if (sessionInfo?.table_name) {
      fetchTableInfo();
    }
  }, [inGame]);

  const onClickLeaveGame = () => {
    setOpenLeaveDialog(true);
  };

  const onClickJoinGame = () => {};

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
          <Grid
            size={12}
            display={inGame ? 'flow' : 'flex'}
            alignContent={'center'}
            justifyContent="center"
          >
            {!inGame && <h1>Waiting...</h1>}
            {inGame && <h1>{sessionInfo?.table_name}</h1>}
            {inGame && <h3>{tableInfo?.game}</h3>}
            {/* {inGame && <h4>{sessionInfo?.session_id}</h4> } */}
          </Grid>
          <Grid size={12}>
            {!inGame && <Divider />}
            {inGame && <LinearProgress color="warning" />}
          </Grid>
          {!inGame && (
            <Grid size={12} display="flex" alignContent={'center'} justifyContent="center">
              <div className="main">
                <div className="dog">
                  <div className="dog__paws">
                    <div className="dog__bl-leg leg">
                      <div className="dog__bl-paw paw"></div>
                      <div className="dog__bl-top top"></div>
                    </div>
                    <div className="dog__fl-leg leg">
                      <div className="dog__fl-paw paw"></div>
                      <div className="dog__fl-top top"></div>
                    </div>
                    <div className="dog__fr-leg leg">
                      <div className="dog__fr-paw paw"></div>
                      <div className="dog__fr-top top"></div>
                    </div>
                  </div>

                  <div className="dog__body">
                    <div className="dog__tail"></div>
                  </div>

                  <div className="dog__head">
                    <div className="dog__snout">
                      <div className="dog__nose"></div>
                      <div className="dog__eyes">
                        <div className="dog__eye-l"></div>
                        <div className="dog__eye-r"></div>
                      </div>
                    </div>
                  </div>

                  <div className="dog__head-c">
                    <div className="dog__ear-l"></div>
                    <div className="dog__ear-r"></div>
                  </div>
                </div>
              </div>
            </Grid>
          )}
          {inGame && <Grid size={12}></Grid>}
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
