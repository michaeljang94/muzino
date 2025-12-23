import React, { useEffect, useState } from 'react';

import Alert from '@mui/material/Alert';

import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  LinearProgress,
  Stack,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';

import qrcode from '../qrcode.svg';
import { Label, Scoreboard } from '@mui/icons-material';
import { useAuth } from '../components/auth/AuthProvider';
import { UsersPage } from './user/UsersPage';
import { EnvironmentVariables } from '../config';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useJwt } from 'react-jwt';
import { jwtDecode } from 'jwt-decode';

import AccountBalanceIcon from '@mui/icons-material/AccountBalance';

interface TokenPayload {
  username: string;
  role: string;
}

export const PlayerProfilePage: React.FC = () => {
  const [playerName, setPlayerName] = useState();
  const [playerScore, setPlayerScore] = useState();
  const [error, setError] = useState(null);

  const [inGame, setInGame] = useState(false);
  const [openLeaveDialog, setOpenLeaveDialog] = useState(false);

  const [playerRank, setPlayerRank] = useState();

  const [playerRole, setPlayerRole] = useState('');

  const { token } = useAuth();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const addr = EnvironmentVariables.ZIKEEPER_ENDPOINT;
        const decoded = jwtDecode<TokenPayload>(token || '');
        const username = decoded.username;

        setPlayerRole(decoded.role);

        const response = await fetch(`${addr}/api/user/${username}`, {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        });

        const user = await response.json();

        setPlayerName(user.user.username);
        setPlayerScore(user.user.score);

        setError(null);
      } catch (error: any) {
        setError(error);
      } finally {
      }
    };

    const fetchRank = async () => {
      try {
        const addr = EnvironmentVariables.ZIKEEPER_ENDPOINT;
        const decoded = jwtDecode<TokenPayload>(token || '');
        const username = decoded.username;

        setPlayerRole(decoded.role);

        if (decoded.role !== 'user') {
          return;
        }

        const response = await fetch(`${addr}/api/user/${username}/rank`, {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        });

        const user = await response.json();

        setPlayerRank(user.user.rank);

        setError(null);
      } catch (error: any) {
        setError(error);
      } finally {
      }
    };

    fetchUser(); // Call the async function
    fetchRank();
  }, [inGame]); // Empty array to run the effect only once (on mount)

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

  if (error) {
    return (
      <>
        <Container
          maxWidth="sm"
          style={{
            display: 'flex',
            justifyContent: 'center',
            minHeight: '100vh',
            flexDirection: 'column',
          }}
        >
          <Typography textAlign={'center'}>Error</Typography>
        </Container>
      </>
    );
  }

  return (
    // <div className="player-default-div">
    <>
      <Container maxWidth="sm">
        <Grid container spacing={0}>
          <Grid size={4}>
            {playerRole === 'user' && <h1 style={{ textAlign: 'left' }}>#{playerRank}</h1>}
            {playerRole !== 'user' && <h1>-</h1>}
          </Grid>
          <Grid size={8}>
            <h1
              style={{
                textAlign: 'right',
              }}
            >
              {playerName}
            </h1>
          </Grid>
          <Grid size={2} alignContent={'center'}>
            <IconButton color="inherit" size="large">
              <AccountBalanceIcon />
            </IconButton>
          </Grid>
          <Grid size={10}>
            <h1
              style={{
                textAlign: 'right',
              }}
            >
              {playerScore}
            </h1>
          </Grid>
        </Grid>
        {!inGame && <Divider></Divider>}
        {inGame && <LinearProgress color="warning" />}
        <Grid container spacing={2}>
          <Grid size={12}>
            <Container
              maxWidth="sm"
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                display: 'flex',
              }}
            >
              <img src={qrcode} alt="logo" width={350} height={350} />
            </Container>
          </Grid>
          <Grid size={12}>
            <Container maxWidth="sm">
              <Stack spacing={2}>
                {!inGame && (
                  <Button
                    onClick={onClickJoinGame}
                    color={'primary'}
                    variant={'contained'}
                    style={{ height: 100 }}
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
                  >
                    Leave Game
                  </Button>
                )}
              </Stack>
            </Container>
          </Grid>
        </Grid>
      </Container>
      {showLeaveDialog()}
    </>
    // </div>
  );
};
