import React, { useEffect, useState } from 'react';
import { Scoreboard } from '../Scoreboard';
import { PaginationTable } from '../../components/PaginationTable';
import { EnvironmentVariables } from '../../config';
import { useAuth } from '../../components/auth/AuthProvider';
import { Button, Container, Divider, Grid, IconButton, Paper } from '@mui/material';
import {
  DataGrid,
  GridActionsCell,
  GridActionsCellItem,
  GridColDef,
  GridRenderCellParams,
} from '@mui/x-data-grid';
import OpenInNewSharpIcon from '@mui/icons-material/OpenInNewSharp';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();

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

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', flex: 1 },
    {
      field: 'username',
      headerName: 'Username',
      flex: 1,
    },
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'score', headerName: 'Score', type: 'number', flex: 1 },

    { field: 'role', headerName: 'Role', flex: 1 },
    {
      flex: 1,
      field: 'edit',
      type: 'actions',
      align: 'center',
      renderCell: params => (
        <GridActionsCell {...params}>
          <GridActionsCellItem
            icon={<OpenInNewSharpIcon color="primary" />}
            onClick={() => {
              navigate(`/user/${params.row.username}/edit`);
            }}
            label="Edit"
          />
        </GridActionsCell>
      ),
    },
  ];

  const paginationModel = { page: 0, pageSize: 5 };

  return (
    <>
      <Container maxWidth="sm">
        <Grid container>
          <Grid size={12}>
            <h1>Users</h1>
          </Grid>
          <Grid size={12}>
            <Divider />
          </Grid>
          <Grid size={12}>
            <DataGrid
              rows={users}
              columns={columns}
              initialState={{
                pagination: { paginationModel },
                columns: {
                  columnVisibilityModel: {
                    id: false,
                  },
                },
              }}
              pageSizeOptions={[5, 10]}
              sx={{ border: 0 }}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};
