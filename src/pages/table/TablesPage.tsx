import React, { useEffect, useState } from 'react';
import { EnvironmentVariables } from '../../config';
import { Button, Container, Grid } from '@mui/material';
import { PaginationTable } from '../../components/PaginationTable';
import axios from 'axios';

interface Table {
  name: string;
}

export const TablesPage: React.FC = () => {
  const [tables, setTables] = useState<Table[]>([]);

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

        const response = await fetch(`${addr}/api/tables`);

        const tablesList = await response.json();

        setTables(tablesList.tables);

        console.log(tablesList.tables);
      } catch (error: any) {
        console.error(error);
      } finally {
      }
    };

    fetchTables();
  }, []);

  console.log(tables);

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
