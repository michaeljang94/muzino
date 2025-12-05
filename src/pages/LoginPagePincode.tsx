import {
  Alert,
  AlertTitle,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  IconButton,
  Snackbar,
  TextField,
} from '@mui/material';
import { MuiOtpInput } from 'mui-one-time-password-input';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EnvironmentVariables } from '../config';
import { useAuth } from '../components/auth/AuthProvider';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

interface LoginPagePincode {
  username: string;
}

export const LoginPagePincode: React.FC<LoginPagePincode> = ({ username }) => {
  const [pincode, setPincode] = useState('');
  const [snackbarShow, setSnackbarShow] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const { setToken } = useAuth();

  const navigate = useNavigate();

  const isValidPincode = () => {
    console.log(pincode);
    if (pincode.length < 5) {
      return false;
    }

    return true;
  };

  const handleLogin = async (value: string) => {
    console.log(value);
    if (!isValidPincode()) {
      setSnackbarShow(true);
      setSnackbarMessage('Pincode Invalid');
      return;
    }

    try {
      const addr = EnvironmentVariables.ZIKEEPER_ENDPOINT;

      const response = await fetch(`${addr}/api/auth/login`, {
        method: 'POST',
        body: JSON.stringify({
          username: username,
          pincode: pincode,
          //   password: password
        }),
      });

      const res = await response.json();

      if (!response.ok || res.status != 'OK') {
        setSnackbarShow(true);
        setSnackbarMessage('Login Failed');
        throw 'login failed';
      }

      setToken(username);
      navigate('/player'); // Redirect to the dashboard
    } catch (error: any) {
      console.error(error);
    } finally {
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
            {snackbarMessage}
          </Alert>
        </Snackbar>
        <Card>
          <IconButton
            onClick={() => {
              navigate('/');
            }}
          >
            <ArrowBackIcon />
          </IconButton>
          <CardHeader title="MUZINO" style={{ flexDirection: 'column' }} />
          <CardContent>
            <MuiOtpInput
              gap={1}
              TextFieldsProps={{ placeholder: '-' }}
              length={5}
              value={pincode}
              onChange={value => {
                setPincode(value);
              }}
              onComplete={event => {
                handleLogin(event);
              }}
            />
          </CardContent>
          <CardActions>
            <Button
              fullWidth
              size="large"
              variant="contained"
              onClick={() => {
                handleLogin(pincode);
              }}
            >
              Login
            </Button>
            {/* <Button fullWidth size="large" variant="contained" onClick={handleLogin}>
              Login
            </Button> */}
          </CardActions>
        </Card>
      </Container>
    </>
  );
};
