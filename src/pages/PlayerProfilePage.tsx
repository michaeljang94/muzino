import React from 'react';
import { Text } from 'react-native';

import './PlayerProfilePage.css';
import { Button, Container, Grid, Stack } from '@mui/material';

import qrcode from '../qrcode.svg';

export interface PlayerProfilePageProps {
  name?: string;
  money?: string;
}

export const PlayerProfilePage: React.FC<PlayerProfilePageProps> = ({ name, money }) => {
  const playerName = name || 'muone';
  const playerMoney = money || '$1,000';

  return (
    // <div className="player-default-div">
    <Container maxWidth="sm">
      <Grid container spacing={2}>
        <Grid size={6}>
          <h1>{playerName}</h1>
        </Grid>
        <Grid size={6}>
          <h1
            style={{
              textAlign: 'center',
            }}
          >
            {playerMoney}
          </h1>
        </Grid>
      </Grid>
      <hr />
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
              <Button variant="contained">Join Game</Button>
              <Button variant="contained">Text</Button>
            </Stack>
          </Container>
        </Grid>
      </Grid>
      <hr />
    </Container>
    // </div>
  );
};
