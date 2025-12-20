import React, { useEffect, useState } from 'react';
import {
  Container,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { EnvironmentVariables } from '../config';
import { useAuth } from '../components/auth/AuthProvider';

interface User {
  id: string;
  name: string;
  score: number;
  username: string;
  rank: number;
}

export const Scoreboard: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState(null);
  const { token } = useAuth();

  useEffect(() => {
    const fetchScoreboard = async () => {
      try {
        const addr = EnvironmentVariables.ZIKEEPER_ENDPOINT;

        const response = await fetch(`${addr}/api/users/scoreboard`, {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        });

        const usersList = await response.json();

        if (usersList.error) {
          throw usersList.error;
        }

        setUsers(usersList.Users);
        setError(null);
      } catch (error: any) {
        console.error(error);
        setError(error);
      } finally {
      }
    };

    fetchScoreboard();
  }, []);

  if (error) {
    return <>{error}</>;
  }

  return (
    <>
      <Container maxWidth="md">
        <Grid container>
          <Grid size={12}>
            <h1>Scoreboard</h1>
          </Grid>
          <Grid size={12}>
            <Container maxWidth="sm">
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">Rank</TableCell>
                      <TableCell align="center">Username</TableCell>
                      <TableCell align="center">Score</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {users?.map(user => (
                      <TableRow>
                        <TableCell align="center">{user.rank}</TableCell>
                        <TableCell align="center">{user.username}</TableCell>
                        <TableCell align="center">{user.score}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Container>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};
