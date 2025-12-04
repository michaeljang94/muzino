import {
  Alert,
  AlertTitle,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  Grid,
  MenuItem,
  Snackbar,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { EnvironmentVariables } from '../config';
import { useNavigate } from 'react-router-dom';
import { PostRegisterDetailsPage } from './PostRegisterDetailsPage';

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const [reg, setReg] = useState(false);
  const [snackbarShow, setSnackbarShow] = useState(false);

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
      const response = await fetch(`https://${addr}/api/create_user`, requestOptions);

      const res = await response.json();

      if (!response.ok) {
        setSnackbarShow(true);
        throw 'signup failed';
      }

      setReg(true);
      setUserName(res.user.username);
      setPassword(res.user.password);

      // navigate('/login');
    } catch (error: any) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (reg) {
    return (
      <>
        <PostRegisterDetailsPage username={userName} password={password} />
      </>
    );
  }

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
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={snackbarShow}
          autoHideDuration={2500}
          onClose={() => {
            setSnackbarShow(false);
          }}
        >
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            Sign-up failed.
          </Alert>
        </Snackbar>
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
