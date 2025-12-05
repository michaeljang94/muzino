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
  MenuItem,
  MobileStepper,
  Snackbar,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { EnvironmentVariables } from '../config';
import { useNavigate } from 'react-router-dom';
import { MuiOtpInput } from 'mui-one-time-password-input';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [loading, setLoading] = useState(false);
  const [pincode, setPincode] = useState('');

  const [snackbarShow, setSnackbarShow] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const createNumbers = (length: number) => {
    return Array.from({ length: length }, (_, index) => index + 1);
  };

  const isValidPincode = () => {
    if (pincode.length < 5) {
      return false;
    }

    return true;
  };

  const isValidUsername = () => {
    if (userName === '') {
      return false;
    }
    return true;
  };

  const handleRegister = async () => {
    try {
      setLoading(true);

      if (!isValidUsername()) {
        setSnackbarShow(true);
        setSnackbarMessage('Invalid Username');
        throw 'invalid username';
      }

      if (!isValidPincode()) {
        setSnackbarShow(true);
        setSnackbarMessage('Invalid Pincode');
        throw 'invalid pincode';
      }

      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: userName, pincode: pincode }),
      };

      const addr = EnvironmentVariables.ZIKEEPER_ENDPOINT;
      const response = await fetch(`https://${addr}/api/auth/signup`, requestOptions);

      const res = await response.json();

      if (!response.ok) {
        setSnackbarShow(true);
        setSnackbarMessage('Sign-up Failed');
        throw 'signup failed';
      }

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
            <Grid container spacing={2}>
              <Grid size={12}>
                <TextField
                  // error={!isValidUsername()}
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
              <Grid size={12}>
                <MuiOtpInput
                  gap={1}
                  TextFieldsProps={{ placeholder: '-' }}
                  length={5}
                  value={pincode}
                  onChange={value => {
                    setPincode(value);
                  }}
                />
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
