import React, { useEffect, useState } from 'react';
import {
  Box,
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
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

import './Scoreboard.css';
import { Label } from '@mui/icons-material';

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

  const renderRankRow = (user: User) => {
    const headerByRank = (userRank: number, content: string) => {
      switch (userRank) {
        case 1:
          return <h1>{content}</h1>;
        case 2:
          return <h2>{content}</h2>;
        case 3:
          return <h3>{content}</h3>;
        default:
          return <h4>{content}</h4>;
      }
    };

    return (
      <>
        <Grid size={12} style={{ backgroundColor: 'white' }}>
          <Grid container>
            <Grid size={2} display={'flex'} justifyContent={'center'} alignItems={'center'}>
              <EmojiEventsIcon
                style={{ color: getRankColor(user.rank), scale: 1.5, paddingRight: 10 }}
              />
              {headerByRank(user.rank, user.rank.toString())}
            </Grid>
            <Grid size={5} display={'flex'} justifyContent={'center'} alignItems={'center'}>
              {headerByRank(user.rank, user.username)}
            </Grid>
            <Grid size={5} display={'flex'} justifyContent={'center'} alignItems={'center'}>
              {headerByRank(user.rank, user.score.toLocaleString())}
            </Grid>
          </Grid>
        </Grid>
      </>
    );
  };

  if (error) {
    return <>{error}</>;
  }

  // return (
  //   <>
  //     <Container maxWidth="sm">
  //       <Grid container spacing={2}>
  //         <Grid size={12}>
  //           <h1>Scoreboard</h1>
  //         </Grid>
  //         <Grid size={12}>
  //           <Divider />
  //         </Grid>
  //         {users?.map(user => (
  //           <>{renderRankRow(user)}</>
  //         ))}
  //       </Grid>
  //     </Container>
  //   </>
  // );

  return (
    <>
      <Container maxWidth="sm">
        <Grid container spacing={2}>
          <Grid size={12}>
            <h1 style={{ fontFamily: 'emoji', textAlign: 'center' }}>Scoreboard</h1>
          </Grid>
          <Grid size={12}>
            <Divider />
          </Grid>

          <Grid size={12}>
            <Container maxWidth="sm">
              <TableContainer
                sx={{ border: '2px solid black', borderRadius: '10px', boxShadow: '4px 4px black' }}
              >
                <Table>
                  {/* <TableHead>
                    <TableRow>
                      <TableCell align="center">Rank</TableCell>
                      <TableCell align="center">Username</TableCell>
                      <TableCell align="center">Score</TableCell>
                    </TableRow>
                  </TableHead> */}
                  <TableBody>
                    {users?.map(user => (
                      <TableRow>
                        <TableCell align="center" sx={{ fontFamily: 'emoji', fontSize: '20px' }}>
                          <EmojiEventsIcon
                            sx={{ color: getRankColor(user.rank), scale: 1.5, marginRight: 2 }}
                          />
                          {user.rank}
                        </TableCell>
                        <TableCell align="center" sx={{ fontFamily: 'emoji', fontSize: '20px' }}>
                          {user.username}
                        </TableCell>
                        <TableCell align="center" sx={{ fontFamily: 'emoji', fontSize: '25px' }}>
                          {Number(user.score).toLocaleString()}
                        </TableCell>
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
