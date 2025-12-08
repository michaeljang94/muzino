import React, { useEffect, useState } from 'react';
import { EnvironmentVariables } from '../../config';
import { Button, Container, Grid } from '@mui/material';
import { PaginationTable } from '../../components/PaginationTable';
import axios from 'axios';
import { useAuth } from '../../components/auth/AuthProvider';

interface Table {
  name: string;
}

export const TablesPage: React.FC = () => {
    const {token} = useAuth()
  const [tables, setTables] = useState<Table[]>([]);
    const [error, setError] = useState("")

  const handleCreateTable = (tableName: string) => {
    const addr = EnvironmentVariables.ZIKEEPER_ENDPOINT;
    axios.post(`${addr}/api/table/create`, {
      name: tableName,
    });
  };

  useEffect(() => {
    const fetchTables = async () => {
      try {
        const addr = EnvironmentVariables.ZIKEEPER_ENDPOINT;

        const response = await fetch(`${addr}/api/tables`, {
          headers: {
            "Authorization": "Bearer " + token
          }
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


  if (error != "") {
    return <></>
  }

  return (
    <>
      <Container maxWidth="md">
        <Grid container>
          <Grid size={12}>
            <h1>Tables</h1>
          </Grid>
          <Grid size={12}>
            <Button>Create Table</Button>
          </Grid>
          <Grid size={12}>
            <PaginationTable tableHeaders={[]} tableData={tables} dataType="TABLE" />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};
