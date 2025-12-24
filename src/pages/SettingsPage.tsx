import { Button, Container, Divider, Grid } from '@mui/material';
import React from 'react';
import { useAuth } from '../components/auth/AuthProvider';

export const SettingsPage: React.FC = () => {
  const { setToken } = useAuth();

  const handleLogOut = () => {
    setToken('');
  };
  return (
    <>
      <Container>
        <Grid container spacing={2}>
          <Grid size={12}>
            <h1>Settings</h1>
          </Grid>
          <Grid size={12}>
            <Divider />
          </Grid>
          <Grid size={12}>
            <Button color="error" variant="contained" size="large" onClick={handleLogOut}>
              Log Out
            </Button>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};
