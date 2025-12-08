import { Button, Container, Grid, TextField } from '@mui/material';
import React, { useState } from 'react';
import { EnvironmentVariables } from '../../config';
import { useAuth } from '../../components/auth/AuthProvider';
import { useNavigate } from 'react-router-dom';

export const CreateTablePage: React.FC = () => {
  const [tableName, setTableName] = useState('');
  const { token } = useAuth();
  const navigate = useNavigate();

  const handleCreateTable = async () => {
    const addr = EnvironmentVariables.ZIKEEPER_ENDPOINT;
    const response = await fetch(`${addr}/api/table/create`, {
      method: 'POST',
      body: JSON.stringify({
        name: tableName,
      }),
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });

    navigate('/tables');
  };

  return (
    <>
      <Container maxWidth="md">
        <Grid container>
          <Grid size={12}>
            <h1>Create Table</h1>
          </Grid>
          <Grid size={12}>
            <Container maxWidth="md">
              <Grid size={12}>
                <TextField
                  variant="outlined"
                  label="name"
                  margin="normal"
                  onChange={e => setTableName(e.target.value)}
                />
              </Grid>
              <Grid size={12}>
                <Button
                  variant="contained"
                  onClick={() => {
                    handleCreateTable();
                  }}
                >
                  Create
                </Button>
              </Grid>
            </Container>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};
