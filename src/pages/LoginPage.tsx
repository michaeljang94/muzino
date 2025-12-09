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
} from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginPagePincode } from './LoginPagePincode';

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
        <Card>
          <CardHeader title="MUZINO" style={{ flexDirection: 'column' }} />
          <CardContent>
            <TextField
              fullWidth
              variant="outlined"
              label="username"
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
