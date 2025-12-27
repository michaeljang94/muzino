import React, { useEffect, useState } from 'react';
import {
  Container,
  Divider,
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
import { ScoreboardFirstPlace } from '../components/ScoreboardFirstPlace';

import './Scoreboard.css';

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

        setUsers(usersList.users);
        setError(null);
      } catch (error: any) {
        console.error(error);
        setError(error);
      } finally {
      }
    };

    fetchScoreboard();
  }, []);

  const getRankColor = (rank: Number) => {
    switch (rank) {
      case 1:
        return 'gold';
      case 2:
        return 'silver';
      case 3:
        return '#B87333';
      default:
        return 'white';
    }
  };

  if (error) {
    return <>{error}</>;
  }

  return (
    <>
      <Container maxWidth="sm">
        <Grid container spacing={2}>
          <Grid size={12}>
            <h1>Scoreboard</h1>
          </Grid>
          <Grid size={12}>
            <Divider />
          </Grid>
          <Grid size={12} alignContent="center" justifyContent="center" display="flex">
            <ScoreboardFirstPlace
              score={users?.find(e => e.rank === 1)?.score || 0}
              name={users?.find(e => e.rank === 1)?.username || ''}
            />
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
                      <TableRow style={{ backgroundColor: getRankColor(user.rank) }}>
                        <TableCell align="center">{user.rank}</TableCell>
                        <TableCell align="center">{user.username}</TableCell>
                        <TableCell align="center">{Number(user.score).toLocaleString()}</TableCell>
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
