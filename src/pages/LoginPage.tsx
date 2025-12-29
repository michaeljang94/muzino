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
  Snackbar,
  TextField,
} from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginPagePincode } from './LoginPagePincode';

import './LoginPage.css';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPincodePage, setShowPincodePage] = useState(false);

  const [snackbarShow, setSnackbarShow] = useState(false);
  const [initialSelectUsername, setInitialSelectUsername] = useState(true);

  const handleLogin = () => {
    if (!isValidUsername()) {
      setSnackbarShow(true);
      return;
    }
    setShowPincodePage(true);
  };

  const isValidUsername = () => {
    const validUsername = /^[a-zA-Z][a-zA-Z0-9_]{2,15}$/;
    return validUsername.test(username);
  };

  if (showPincodePage) {
    return (
      <>
        <LoginPagePincode username={username} />
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
            Username error.
          </Alert>
        </Snackbar>
        <Card sx={{ border: '2px solid black', boxShadow: '4px 4px black' }}>
          <CardHeader
            title="MUZINO"
            sx={{ flexDirection: 'column' }}
            slotProps={{ title: { fontFamily: 'emoji' } }}
          />
          <CardContent>
            <TextField
              sx={{ border: '2px solid black' }}
              className="custom-input"
              fullWidth
              variant="outlined"
              placeholder="username"
              margin="normal"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setUsername(event.target.value);
              }}
              error={!initialSelectUsername && !isValidUsername()}
              helperText={
                !initialSelectUsername && !isValidUsername() ? 'Enter a valid username' : ''
              }
              onBlur={() => {
                setInitialSelectUsername(false);
              }}
            />
            {/* <TextField
              fullWidth
              type="password"
              variant="outlined"
              label="password"
              onChange={event => setPassword(event.target.value)}
            /> */}
          </CardContent>
          <CardActions>
            <Button
              sx={{ boxShadow: '4px 4px black', border: '2px solid black' }}
              fullWidth
              size="large"
              variant="contained"
              onClick={() => {
                navigate('/register');
              }}
            >
              Register
            </Button>
            <Button
              sx={{ boxShadow: '4px 4px black', border: '2px solid black' }}
              fullWidth
              size="large"
              variant="contained"
              onClick={handleLogin}
            >
              Login
            </Button>
          </CardActions>
        </Card>
      </Container>
    </>
  );
};
