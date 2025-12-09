import { Button, Container, Grid, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { EnvironmentVariables } from '../../config';
import { useAuth } from '../../components/auth/AuthProvider';

interface User {
  id: string;
  name: string;
  score: number;
  username: string;
}

export const EditUserPage: React.FC = () => {
  const { id } = useParams();
  const { token } = useAuth();
  const [user, setUser] = useState<User>();
  const [username, setUsername] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const addr = EnvironmentVariables.ZIKEEPER_ENDPOINT;

        const response = await fetch(`${addr}/api/user/${id}`, {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        });

        const user = await response.json();
        setUser(user.user);
        setUsername('asdasdad');
      } catch (error: any) {
      } finally {
      }
    };

    fetchUser(); // Call the async function
  }, []);

  return (
    <>
      <Container maxWidth="md">
        <Grid container spacing={2}>
          <Grid size={12}>
            <h1>{id}</h1>
          </Grid>
          <Grid size={6}>
            <TextField fullWidth label="username" placeholder={user?.username} />
          </Grid>
          <Grid size={6}>
            <TextField fullWidth label="name" placeholder={user?.name} />
          </Grid>
          <Grid size={12}>
            <TextField fullWidth label="score" placeholder={user?.score.toString()} />
          </Grid>
          <Grid size={6}>
            <Button fullWidth variant="contained" style={{ height: 75 }}>
              Cancel
            </Button>
          </Grid>
          <Grid size={6}>
            <Button fullWidth variant="contained" color="error" style={{ height: 75 }}>
              Save
            </Button>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};
