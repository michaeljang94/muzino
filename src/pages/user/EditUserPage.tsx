import {
  Alert,
  AlertTitle,
  Button,
  Container,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  SelectChangeEvent,
  Snackbar,
  TextField,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { EnvironmentVariables } from '../../config';
import { useAuth } from '../../components/auth/AuthProvider';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

interface User {
  id: string;
  name: string;
  score: number;
  username: string;
  student_number: StudentNumber;
}

interface StudentNumber {
  year: number;
  class: number;
  number: number;
}

export const EditUserPage: React.FC = () => {
  const { id } = useParams();
  const { token } = useAuth();
  const [user, setUser] = useState<User>();

  const [userId, setUserId] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [score, setScore] = useState('');
  const [role, setRole] = useState('');

  const [studentYear, setStudentYear] = useState('');

  const [snackbarShow, setSnackbarShow] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const addr = EnvironmentVariables.ZIKEEPER_ENDPOINT;

        const response = await fetch(`${addr}/api/user/${id}`, {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        });

        const res = await response.json();
        setUser(res.user);

        setUserId(res.user.id);
        setName(res.user.name);
        setUsername(res.user.username);
        setScore(res.user.score);
        setRole(res.user.role);

        setStudentYear(res.user.student_number.year);
      } catch (error: any) {
      } finally {
      }
    };

    fetchUser(); // Call the async function
  }, []);

  const createNumbers = (length: number) => {
    return Array.from({ length: length }, (_, index) => index + 1);
  };

  const handleOnSave = async () => {
    try {
      const addr = EnvironmentVariables.ZIKEEPER_ENDPOINT;

      const response = await fetch(`${addr}/api/user/${id}/update`, {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + token,
        },
        body: JSON.stringify({
          score: parseInt(score),
          role: role,
        }),
      });

      const res = await response.json();

      if (!response.ok) {
        throw 'Failed to save user';
      }

      navigate('/users');
    } catch (error: any) {
      setSnackbarShow(true);
      setSnackBarMessage(error);
    } finally {
    }
  };

  console.log(user);

  return (
    <>
      <Container maxWidth="md">
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
            {snackBarMessage}
          </Alert>
        </Snackbar>
        <Grid container spacing={2}>
          <Grid size={2} alignContent={'center'}>
            <IconButton
              size="large"
              onClick={() => {
                navigate('/users');
              }}
            >
              <ArrowBackIcon />
            </IconButton>
          </Grid>
          <Grid size={10}>
            <h1>{id}</h1>
          </Grid>
          <Grid size={12}>
            <TextField fullWidth label="user id" value={userId} disabled />
          </Grid>
          <Grid size={12}>
            <FormControl fullWidth>
              <InputLabel id="user-role-select-label">Role</InputLabel>
              <Select
                label="Role"
                value={role}
                onChange={(event: SelectChangeEvent) => {
                  setRole(event.target.value);
                }}
              >
                <MenuItem value={'user'}>Player</MenuItem>
                <MenuItem value={'dealer'}>Dealer</MenuItem>
                <MenuItem value={'admin'}>Admin</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid size={6}>
            <TextField
              fullWidth
              label="username"
              value={username}
              onChange={event => {
                setUsername(event.target.value);
              }}
            />
          </Grid>
          <Grid size={6}>
            <TextField
              fullWidth
              label="name"
              value={name}
              onChange={event => {
                setName(event.target.value);
              }}
            />
          </Grid>
          <Grid size={4}>
            <TextField fullWidth label="year" value={user?.student_number.year ?? ''} />
          </Grid>
          <Grid size={4}>
            <TextField fullWidth label="class" value={user?.student_number.class ?? ''} />
          </Grid>
          <Grid size={4}>
            <TextField fullWidth label="number" value={user?.student_number.number ?? ''} />
          </Grid>
          <Grid size={12}>
            <TextField
              fullWidth
              label="score"
              value={score}
              onChange={event => setScore(event.target.value)}
            />
          </Grid>
          <Grid size={6}>
            <Button
              fullWidth
              variant="contained"
              style={{ height: 75 }}
              onClick={() => {
                navigate('/users');
              }}
            >
              Cancel
            </Button>
          </Grid>
          <Grid size={6}>
            <Button
              fullWidth
              variant="contained"
              color="error"
              style={{ height: 75 }}
              onClick={handleOnSave}
            >
              Save
            </Button>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};
