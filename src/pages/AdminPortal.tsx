import { Box, Button, Container, Grid } from '@mui/material';
import React from 'react';

export const AdminPortal: React.FC = () => {
  return (
    <Container maxWidth="sm">
      <Grid container>
        <Grid size={6}>
          <Button variant="contained">Give Money</Button>
        </Grid>
        <Grid size={6}>
          <Button variant="contained">Take Money</Button>
        </Grid>
      </Grid>
    </Container>
  );
};
