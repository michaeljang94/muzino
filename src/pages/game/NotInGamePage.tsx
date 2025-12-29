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

import './GamePage.css';

export const NotInGamePage: React.FC = () => {
  const onClickJoinGame = () => {};

  return (
    <>
      <Container maxWidth="sm">
        <Grid container spacing={2}>
          <Grid size={12} display={'flex'} alignContent={'center'} justifyContent="center">
            <h1 style={{ fontFamily: 'emoji' }}>Waiting...</h1>
          </Grid>
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
          <Grid size={12}>
            <Divider />
          </Grid>
          <Grid size={12}>
            <Container maxWidth="sm">
              <Button
                onClick={onClickJoinGame}
                color={'primary'}
                variant={'contained'}
                style={{ height: 100 }}
                fullWidth
              >
                Join Game
              </Button>
            </Container>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};
