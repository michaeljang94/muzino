import React, { useEffect, useState } from 'react';

import Alert from '@mui/material/Alert';

import './PlayerProfilePage.css';
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
  LinearProgress,
  Stack,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';

import qrcode from '../qrcode.svg';
import { Label, Scoreboard } from '@mui/icons-material';
import { useAuth } from '../components/auth/AuthProvider';
import { UsersPage } from './UsersPage';
import { EnvironmentVariables } from '../config';
import axios from 'axios';

export interface PlayerProfilePageProps {
  id?: string;
}

export const PlayerProfilePage: React.FC<PlayerProfilePageProps> = ({ id }) => {
  const [playerName, setPlayerName] = useState();
  const [playerScore, setPlayerScore] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [inGame, setInGame] = useState(false);
  const [openLeaveDialog, setOpenLeaveDialog] = useState(false);

  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const { token } = useAuth();

  id = id || token || '';

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const addr = EnvironmentVariables.ZIKEEPER_ENDPOINT;

        const response = await fetch(`${addr}/api/user/${id}`);

        const user = await response.json();

        console.log(user);

        setPlayerName(user.user.username);
        setPlayerScore(user.user.score);
      } catch (error: any) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser(); // Call the async function
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
        </DialogContent>
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
        <Grid container spacing={2}>
          <Grid size={6}>
            <h1
              style={{
                textAlign: 'center',
              }}
            >
              {playerName}
            </h1>
          </Grid>
          <Grid size={6}>
            <h1
              style={{
                textAlign: 'center',
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
