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
import React, { useState } from 'react';
import { EnvironmentVariables } from '../config';
import { useNavigate } from 'react-router-dom';

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [loading, setLoading] = useState(false);

  const createNumbers = (length: number) => {
    return Array.from({ length: length }, (_, index) => index + 1);
  };

  const handleRegister = async () => {
    try {
      setLoading(true);

      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: userName }),
      };

      const addr = EnvironmentVariables.ZIKEEPER_ENDPOINT;
      const port = EnvironmentVariables.ZIKEEPER_PORT;
      const response = await fetch(`http://${addr}:${port}/create_user`, requestOptions);

      const user = await response.json();

      navigate('/login');
    } catch (error: any) {
      console.error(error);
    } finally {
      setLoading(false);
    }
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
              <Grid size={12}>
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Name"
                  onChange={event => {
                    setUserName(event.target.value);
                  }}
                />
              </Grid>
              {/* <Grid size={6}>
                <TextField fullWidth variant="outlined" label="Last Name" />
              </Grid> */}
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
            <Button
              fullWidth
              size="large"
              variant="contained"
              onClick={handleRegister}
              loading={loading}
            >
              Register
            </Button>
          </CardActions>
        </Card>
      </Container>
    </>
  );
};
