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

  const [name, setName] = useState('');
  const [userName, setUserName] = useState('');
  const [loading, setLoading] = useState(false);
  const [pincode, setPincode] = useState('');

  const [studentYear, setStudentYear] = useState('');
  const [studentClass, setStudentClass] = useState('');
  const [studentNumber, setStudentNumber] = useState('');

  const [snackbarShow, setSnackbarShow] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const [initialSelectUsername, setInitialSelectUsername] = useState(true);
  const [initialSelectName, setInitialSelectName] = useState(true);

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
    const validUsername = /^[a-zA-Z][a-zA-Z0-9_]{2,15}$/;
    return validUsername.test(userName);
  };

  const isValidFullName = () => {
    if (name === '') {
      return false;
    }

    return true;
  };

  const handleRegister = async () => {
    try {
      setLoading(true);

      if (!isValidUsername()) {
        throw 'Invalid Username';
      }

      if (!isValidPincode()) {
        throw 'Invalid Pincode';
      }

      if (!isValidFullName()) {
        throw 'Invalid Name';
      }

      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: userName,
          pincode: pincode,
          name: name,
          student_number: {
            year: studentYear,
            class: studentClass,
            number: studentNumber,
          },
        }),
      };

      console.log(requestOptions);

      const addr = EnvironmentVariables.ZIKEEPER_ENDPOINT;
      const response = await fetch(`${addr}/api/auth/signup`, requestOptions);

      const res = await response.json();

      if (!response.ok) {
        if (res === 'duplicate entry') {
          throw 'Username already taken.';
        }
        throw 'Signup Failed';
      }

      navigate('/login');
    } catch (error: any) {
      console.error(error);
      setSnackbarShow(true);
      setSnackbarMessage(error);
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
        <Card className="custom-card" sx={{ boxShadow: '4px 4px black' }}>
          <IconButton
            onClick={() => {
              navigate('/');
            }}
          >
            <ArrowBackIcon />
          </IconButton>
          <CardHeader
            title="MUZINO"
            style={{ flexDirection: 'column' }}
            slotProps={{
              title: {
                fontFamily: 'emoji',
              },
            }}
          />
          <CardContent>
            <Grid container spacing={2}>
              <Grid size={12}>
                <TextField
                  sx={{ border: '2px solid black' }}
                  className="custom-input"
                  error={!initialSelectUsername && !isValidUsername()}
                  helperText={
                    !initialSelectUsername && !isValidUsername() ? 'Enter a valid username' : ''
                  }
                  fullWidth
                  variant="outlined"
                  placeholder="Username"
                  onChange={event => {
                    setUserName(event.target.value);
                  }}
                  onBlur={() => {
                    setInitialSelectUsername(false);
                  }}
                />
              </Grid>
              <Grid size={12}>
                <TextField
                  sx={{ border: '2px solid black' }}
                  className="custom-input"
                  error={!initialSelectName && !isValidFullName()}
                  helperText={!initialSelectName && !isValidFullName() ? 'Enter a valid name' : ''}
                  fullWidth
                  variant="outlined"
                  placeholder="Full Name"
                  onChange={event => {
                    setName(event.target.value);
                  }}
                  onBlur={() => {
                    setInitialSelectName(false);
                  }}
                />
              </Grid>
              {/* <Grid size={6}>
                <TextField fullWidth variant="outlined" label="Last Name" />
              </Grid> */}
              <Grid size={4}>
                <TextField
                  sx={{
                    boxShadow: '4px 4px black',
                    border: '2px solid black',
                    borderRadius: '5px',
                  }}
                  fullWidth
                  select
                  variant="outlined"
                  label="Year"
                  onChange={e => {
                    setStudentYear(e.target.value);
                  }}
                >
                  {createNumbers(10).map(option => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid size={4}>
                <TextField
                  sx={{
                    boxShadow: '4px 4px black',
                    border: '2px solid black',
                    borderRadius: '5px',
                  }}
                  fullWidth
                  select
                  variant="outlined"
                  label="Class"
                  onChange={e => {
                    setStudentClass(e.target.value);
                  }}
                >
                  {createNumbers(15).map(option => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid size={4}>
                <TextField
                  sx={{
                    boxShadow: '4px 4px black',
                    border: '2px solid black',
                    borderRadius: '5px',
                  }}
                  fullWidth
                  select
                  variant="outlined"
                  label="Number"
                  onChange={e => {
                    setStudentNumber(e.target.value);
                  }}
                >
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
                    setPincode(value.toUpperCase());
                  }}
                  validateChar={(value, index) => {
                    const validCode = /^[a-zA-Z0-9]+$/;
                    return validCode.test(value);
                  }}
                />
              </Grid>
            </Grid>
          </CardContent>
          <CardActions>
            <Button
              sx={{ boxShadow: '4px 4px black', border: '2px solid black' }}
              className="flip-card__btn"
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
