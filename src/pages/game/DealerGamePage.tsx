import { Container, Grid } from '@mui/material';

export const DealerGamePage: React.FC = () => {
  return (
    <>
      <Container maxWidth="sm">
        <Grid container spacing={2}>
          <Grid size={12}>
            <h1>Table Name</h1>
          </Grid>
          <Grid size={12}>
            <h4>Status</h4>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};
