import React, { useEffect, useState } from 'react';
import { Scoreboard } from '../Scoreboard';
import { PaginationTable } from '../../components/PaginationTable';
import { EnvironmentVariables } from '../../config';
import { useAuth } from '../../components/auth/AuthProvider';
import { Container, Divider, Grid } from '@mui/material';

interface User {
  id: string;
  name: string;
  score: number;
  username: string;
  role: string;
}

export const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState(null);
  const { token } = useAuth();

  useEffect(() => {
    const fetchTables = async () => {
      try {
        const addr = EnvironmentVariables.ZIKEEPER_ENDPOINT;

        const response = await fetch(`${addr}/api/users`, {
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

    fetchTables();
  }, []);

  if (error) {
    return <>{error}</>;
  }

  return (
    <>
      <Container maxWidth="md">
        <Grid container>
          <Grid size={12}>
            <h1>Users</h1>
          </Grid>
          <Grid size={12}>
            <Divider />
          </Grid>
          <Grid size={12}>
            <PaginationTable
              tableHeaders={['Username', 'Score', 'Role']}
              tableData={users}
              dataType="PLAYER"
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};
