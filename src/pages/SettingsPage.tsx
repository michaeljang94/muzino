import { Button, Container, Divider, Grid, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../components/auth/AuthProvider';
import { EnvironmentVariables } from '../config';
import { useJwt } from 'react-jwt';
import { TokenPayload } from './PlayerProfilePage';

interface UserInfo {
  id: string;
  username: string;
  name: string;
  role: string;
  score: number;
}

export interface SettingsPageProps {
  username: string;
}

export const SettingsPage: React.FC<SettingsPageProps> = ({ username }) => {
  const { token, setToken } = useAuth();
  const [userInfo, setUserInfo] = useState<UserInfo>();

  const handleLogOut = () => {
    setToken('');
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const addr = EnvironmentVariables.ZIKEEPER_ENDPOINT;

        const response = await fetch(`${addr}/api/user/${username}`, {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        });

        const res = await response.json();
        setUserInfo(res.user);
      } catch (error: any) {
      } finally {
      }
    };

    fetchUser(); // Call the async function
  }, []);

  return (
    <>
      <Container maxWidth="sm">
        <Grid container spacing={2}>
          <Grid size={12}>
            <h1>Settings</h1>
          </Grid>
          <Grid size={12}>
            <Divider />
          </Grid>
          <Grid size={12}>
            <TextField fullWidth disabled value={userInfo?.id} label="id"></TextField>
          </Grid>
          <Grid size={6}>
            <TextField fullWidth disabled value={userInfo?.username} label="username"></TextField>
          </Grid>
          <Grid size={6}>
            <TextField fullWidth disabled value={userInfo?.name} label="name"></TextField>
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
