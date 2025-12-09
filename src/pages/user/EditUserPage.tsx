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

  const [userId, setUserId] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [score, setScore] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const addr = EnvironmentVariables.ZIKEEPER_ENDPOINT;

        const response = await fetch(`${addr}/api/user/${id}`, {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        });

        const res = await response.json();
        setUser(res.user);

        setUserId(res.user.id);
        setName(res.user.name);
        setUsername(res.user.username);
        setScore(res.user.score);
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
          <Grid size={12}>
            <TextField fullWidth label="user id" value={userId} disabled />
          </Grid>
          <Grid size={6}>
            <TextField
              fullWidth
              label="username"
              value={username}
              onChange={event => {
                setUsername(event.target.value);
              }}
            />
          </Grid>
          <Grid size={6}>
            <TextField
              fullWidth
              label="name"
              value={name}
              onChange={event => {
                setName(event.target.value);
              }}
            />
          </Grid>
          <Grid size={12}>
            <TextField
              fullWidth
              label="score"
              value={score}
              onChange={event => setScore(event.target.value)}
            />
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
