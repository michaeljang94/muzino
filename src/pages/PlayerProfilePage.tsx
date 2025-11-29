import React from 'react';
import { Text } from 'react-native';

import './PlayerProfilePage.css';
import { Button, Container, Grid, Stack } from '@mui/material';

import logo from '../logo.svg';

export const PlayerProfilePage: React.FC = () => {
  const profileName = 'muone';

  return (
    // <div className="player-default-div">
    <Container>
      <h1>{profileName}</h1>
      <hr />
      <Grid container spacing={2}>
        <Grid size={6}>
          <img src={logo} alt="logo" width={500} height={500} />
        </Grid>
        <Grid size={6}>
          <Stack spacing={2}>
            <Button variant="contained">Join Game</Button>
            <Button variant="contained">Text</Button>
          </Stack>
        </Grid>
      </Grid>
    </Container>
    // </div>
  );
};
