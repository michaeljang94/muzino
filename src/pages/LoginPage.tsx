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

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = React.useState('');

  const [userName, setUserName] = useState('');

  const { setToken } = useAuth();

  const handleLogin = () => {
    if (userName === 'muone') {
      setToken('1cb4a8ea-3cfb-4283-b400-2e21b7668266'); // Authenticate the user
      console.log(userName);
    }

    navigate('/player'); // Redirect to the dashboard
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
            <TextField fullWidth type="password" variant="outlined" label="password" />
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
