import {
  Alert,
  AlertTitle,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  Snackbar,
  TextField,
  Typography,
} from '@mui/material';
import { MuiOtpInput } from 'mui-one-time-password-input';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/auth/AuthProvider';
import { EnvironmentVariables } from '../config';
import { error } from 'console';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = React.useState('');

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const [snackbarShow, setSnackbarShow] = useState(false);

  const { setToken } = useAuth();

  const handleLogin = async () => {
    try {
      const addr = EnvironmentVariables.ZIKEEPER_ENDPOINT;

      const response = await fetch(`https://${addr}/api/auth/login`, {
        method: 'POST',
        body: JSON.stringify({
          username: userName,
          password: password,
        }),
      });

      const res = await response.json();

      if (!response.ok || res.status != 'OK') {
        setSnackbarShow(true);
        throw 'login failed';
      }

      setToken(userName);
      navigate('/player'); // Redirect to the dashboard
    } catch (error: any) {
      console.error(error);
    } finally {
    }
  };

  const handleChange = (newValue: string) => {
    setOtp(newValue);
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
            Wrong username or password.
          </Alert>
        </Snackbar>
        <Card>
          <CardHeader title="MUZINO" style={{ flexDirection: 'column' }} />
          <CardContent>
            <TextField
              fullWidth
              variant="outlined"
              label="username"
              margin="normal"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setUserName(event.target.value);
              }}
            />
            <TextField
              fullWidth
              type="password"
              variant="outlined"
              label="password"
              onChange={event => setPassword(event.target.value)}
            />
            {/* <MuiOtpInput marginTop={1} display="flex" gap={1} TextFieldsProps={{ placeholder: '-' }} value={otp} length={6} onChange={handleChange}></MuiOtpInput> */}
          </CardContent>
          <CardActions>
            <Button
              fullWidth
              size="large"
              variant="contained"
              onClick={() => {
                navigate('/register');
              }}
            >
              Register
            </Button>
            <Button fullWidth size="large" variant="contained" onClick={handleLogin}>
              Login
            </Button>
          </CardActions>
        </Card>
      </Container>
    </>
  );
};
