import React, { useState } from 'react';

import Alert from '@mui/material/Alert';

import './PlayerProfilePage.css';
import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  LinearProgress,
  Stack,
} from '@mui/material';

import qrcode from '../qrcode.svg';

export interface PlayerProfilePageProps {
  name?: string;
  money?: string;
}

export const PlayerProfilePage: React.FC<PlayerProfilePageProps> = ({ name, money }) => {
  const playerName = name || 'muone';
  const playerMoney = money || '$1,000';

  const [inGame, setInGame] = useState(false);
  const [openLeaveDialog, setOpenLeaveDialog] = useState(false);

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

  return (
    // <div className="player-default-div">
    <>
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
        <hr />
      </Container>
      {showLeaveDialog()}
    </>
    // </div>
  );
};
