import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';
import React from 'react';

export const RegisterPage: React.FC = () => {
  const createNumbers = (length: number) => {
    return Array.from({ length: length }, (_, index) => index + 1);
  };

  return (
    <>
      <Container
        maxWidth="xs"
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          minHeight: '100vh',
        }}
      >
        <Card>
          <CardHeader title="MUZINO" style={{ flexDirection: 'column' }} />
          <CardContent>
            <Grid container spacing={2}>
              <Grid size={6}>
                <TextField fullWidth variant="outlined" label="First Name" />
              </Grid>
              <Grid size={6}>
                <TextField fullWidth variant="outlined" label="Last Name" />
              </Grid>
              <Grid size={4}>
                <TextField fullWidth select variant="outlined" label="Year">
                  {createNumbers(10).map(option => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid size={4}>
                <TextField fullWidth select variant="outlined" label="Class">
                  {createNumbers(15).map(option => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid size={4}>
                <TextField fullWidth select variant="outlined" label="Number">
                  {createNumbers(40).map(option => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>
          </CardContent>
          <CardActions>
            <Button fullWidth size="large" variant="contained">
              Register
            </Button>
          </CardActions>
        </Card>
      </Container>
    </>
  );
};
