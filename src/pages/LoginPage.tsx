import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
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

  const { setToken } = useAuth();

  const handleLogin = async () => {
    try {
        const addr = EnvironmentVariables.ZIKEEPER_ENDPOINT
        const port = EnvironmentVariables.ZIKEEPER_PORT

        const response = await fetch(`http://${addr}:${port}/get_user/${userName}`);

        const user = await response.json();

        if(user.user.password !== password) {
            throw "wrong password"
        }

        setToken(user.user.username)
        navigate('/player'); // Redirect to the dashboard
    } catch (error: any) {
        console.error(error)
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
            <TextField fullWidth type="password" variant="outlined" label="password" onChange={event => setPassword(event.target.value)}/>
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
