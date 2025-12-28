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
  IconButton,
  LinearProgress,
  Stack,
  Tab,
  Tabs,
  TextField,
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
import PaidIcon from '@mui/icons-material/Paid';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

export interface TokenPayload {
  username: string;
  role: string;
}

export const PlayerProfilePage: React.FC = () => {
  const [playerName, setPlayerName] = useState();
  const [playerScore, setPlayerScore] = useState();
  const [error, setError] = useState(null);

  const [playerRank, setPlayerRank] = useState();

  const [playerRole, setPlayerRole] = useState('');

  const { token } = useAuth();

  useEffect(() => {
    const addr = EnvironmentVariables.ZIKEEPER_ENDPOINT;
    const decoded = jwtDecode<TokenPayload>(token || '');
    const username = decoded.username;
    setPlayerRole(decoded.role);

    const fetchUser = async () => {
      try {
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
  }, []); // Empty array to run the effect only once (on mount)

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
    <>
      <Container
        maxWidth="sm"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
        }}
      >
        <Grid container>
          <Grid size={12}>
            <div className="card">
              <div className="content">
                <div className="name">{playerName}</div>
                <div className="handle">
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <EmojiEventsIcon sx={{ color: 'black', scale: 0.75 }} />
                    {playerRole === 'user' && Number(playerRank).toLocaleString()}
                    {playerRole !== 'user' && '-'}
                  </Box>
                </div>
                <Grid container>
                  <Grid size={6} alignContent="center" justifyContent="center">
                    {/* <div className="title">
                      {playerRole === 'user' && (
                        <h1 style={{ textAlign: 'left' }}>#{playerRank}</h1>
                      )}
                      {playerRole !== 'user' && <h1>-</h1>}
                    </div> */}
                    <Box
                      sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}
                      width={200}
                    >
                      <PaidIcon sx={{ color: 'green', mr: 1, my: 1 }} />
                      <TextField
                        fullWidth
                        size="small"
                        variant="outlined"
                        value={Number(playerScore).toLocaleString()}
                        sx={{
                          alignContent: 'end',
                          input: { fontFamily: 'math', textAlign: 'right' },
                        }}
                      />
                    </Box>
                  </Grid>
                  <Grid size={6} alignContent="end" justifyContent={'right'} display="flex">
                    <img src={qrcode} alt="logo" width={100} height={100} />
                  </Grid>
                </Grid>
              </div>
              <div className="dots orange-dots"></div>
              <div className="dots pink-dots"></div>
            </div>
          </Grid>
        </Grid>
      </Container>
    </>
  );

  return (
    // <div classNameName="player-default-div">
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
        <Grid size={12}>
          <Divider />
        </Grid>
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
        </Grid>
      </Container>
    </>
    // </div>
  );
};
