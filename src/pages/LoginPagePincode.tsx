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

  const { token, setToken } = useAuth();

  const navigate = useNavigate();

  const isValidPincode = () => {
    const validPincode = /^[a-zA-Z0-9]{5}$/;
    return validPincode.test(pincode);
  };

  const handleLogin = async (value: string) => {
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

      setToken(res.token);
      console.log(res.token);
      navigate('/player', {
        state: {
          id: username,
        },
      }); // Redirect to the dashboard
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
        <Card className="custom-card" sx={{ boxShadow: '4px 4px black' }}>
          <IconButton
            onClick={() => {
              navigate('/');
              navigate(0);
            }}
          >
            <ArrowBackIcon />
          </IconButton>
          <CardHeader
            title="MUZINO"
            style={{ flexDirection: 'column' }}
            slotProps={{ title: { fontFamily: 'emoji' } }}
          />
          <CardContent>
            <MuiOtpInput
              gap={1}
              TextFieldsProps={{ placeholder: '-' }}
              length={5}
              value={pincode}
              onChange={value => {
                setPincode(value.toUpperCase());
              }}
              validateChar={(value, index) => {
                const validCode = /^[a-zA-Z0-9]+$/;
                return validCode.test(value);
              }}
            />
          </CardContent>
          <CardActions>
            <Button
              sx={{ boxShadow: '4px 4px black' }}
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
