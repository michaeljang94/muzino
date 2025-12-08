import React, { useEffect, useState } from 'react';
import { EnvironmentVariables } from '../../config';
import { Button, Container, Divider, Grid } from '@mui/material';
import { PaginationTable } from '../../components/PaginationTable';
import axios from 'axios';
import { useAuth } from '../../components/auth/AuthProvider';
import { useNavigate } from 'react-router-dom';

interface Table {
  name: string;
}

export const TablesPage: React.FC = () => {
  const { token } = useAuth();
  const [tables, setTables] = useState<Table[]>([]);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchTables = async () => {
      try {
        const addr = EnvironmentVariables.ZIKEEPER_ENDPOINT;

        const response = await fetch(`${addr}/api/tables`, {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        });

        const tablesList = await response.json();

        setTables(tablesList.tables ?? []);
      } catch (error: any) {
        console.error(error);
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
            <h1>Tables</h1>
          </Grid>
          <Grid size={12}>
            <Button
              variant="contained"
              onClick={() => {
                navigate('/table/create');
              }}
            >
              Create Table
            </Button>
          </Grid>
          <Grid size={12} marginBottom={2} marginTop={2}>
            <Divider></Divider>
          </Grid>
          <Grid size={12}>
            {tables.length > 0 && (
              <PaginationTable tableHeaders={[]} tableData={tables} dataType="TABLE" />
            )}
          </Grid>
        </Grid>
      </Container>
    </>
  );
};
