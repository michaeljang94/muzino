import {
  Alert,
  AlertTitle,
  Button,
  Container,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Snackbar,
  TextField,
} from '@mui/material';
import React, { useState } from 'react';
import { EnvironmentVariables } from '../../config';
import { useAuth } from '../../components/auth/AuthProvider';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export const CreateTablePage: React.FC = () => {
  const [tableName, setTableName] = useState('');
  const [tableGame, setTableGame] = useState('black_jack');
  const { token } = useAuth();
  const navigate = useNavigate();

  const [initialSelected, setInitialSelected] = useState(true);

  const [snackbarShow, setSnackbarShow] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState('');

  const isValidTableName = () => {
    const validTableName = /^[a-zA-Z][a-zA-Z0-9_]{2,15}$/;
    return validTableName.test(tableName);
  };

  const handleCreateTable = async () => {
    try {
      if (!isValidTableName()) {
        throw 'Table name is invalid.';
      }
      const addr = EnvironmentVariables.ZIKEEPER_ENDPOINT;
      const response = await fetch(`${addr}/api/table/create`, {
        method: 'POST',
        body: JSON.stringify({
          name: tableName,
          game: tableGame,
        }),
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });

      const res = await response.json();

      if (!response.ok) {
        throw `Creating table failed: ${res}`;
      }

      navigate('/tables');
    } catch (error: any) {
      console.error(error);
      setSnackbarShow(true);
      setSnackBarMessage(error);
    } finally {
    }
  };

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
          <Grid size={1} alignContent={'center'}>
            <IconButton
              size="large"
              onClick={() => {
                navigate('/tables');
              }}
            >
              <ArrowBackIcon />
            </IconButton>
          </Grid>
          <Grid size={11}>
            <h1>Create Table</h1>
          </Grid>
          <Grid size={12}>
            <Divider />
          </Grid>
          <Grid size={12}>
            <Container maxWidth="md">
              <Grid size={12}>
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Name"
                  margin="normal"
                  onChange={e => setTableName(e.target.value)}
                  error={!initialSelected && !isValidTableName()}
                  helperText={!initialSelected && !isValidTableName() ? 'Enter a valid name' : ''}
                  onBlur={() => {
                    setInitialSelected(false);
                  }}
                />
              </Grid>
              <Grid size={12}>
                <FormControl fullWidth margin="dense">
                  <InputLabel id="table-game-select-label">Game</InputLabel>
                  <Select
                    label="Game"
                    value={tableGame}
                    onChange={(event: SelectChangeEvent) => {
                      setTableGame(event.target.value);
                    }}
                  >
                    <MenuItem value={'black_jack'}>Black Jack</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid size={12} marginTop={2}>
                <Button
                  variant="contained"
                  onClick={() => {
                    handleCreateTable();
                  }}
                  style={{ float: 'right' }}
                >
                  Create
                </Button>
              </Grid>
            </Container>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};
