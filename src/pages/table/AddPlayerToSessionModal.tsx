import {
  Alert,
  AlertTitle,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Modal,
  Snackbar,
  TextField,
} from '@mui/material';
import React, { useState } from 'react';

import CloseIcon from '@mui/icons-material/Close';
import { EnvironmentVariables } from '../../config';
import { useAuth } from '../../components/auth/AuthProvider';

export interface AddPlayerToSessionModalProps {
  open: boolean;
  onClose: () => void;
  tableName: string;
  sessionId: string;
}

export const AddPlayerToSessionModal: React.FunctionComponent<AddPlayerToSessionModalProps> = ({
  open,
  onClose,
  tableName,
  sessionId,
}) => {
  const { token } = useAuth();
  const [username, setUsername] = useState('');

  const [snackbarShow, setSnackbarShow] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackBarSuccess, setSnackBarSuccess] = useState(true);

  const handleOnClick = async () => {
    try {
      const addr = EnvironmentVariables.ZIKEEPER_ENDPOINT;

      const response = await fetch(
        `${addr}/api/table/${tableName}/session/${sessionId}/player/add`,
        {
          method: 'POST',
          body: JSON.stringify({
            player: {
              name: username,
            },
          }),
          headers: {
            Authorization: 'Bearer ' + token,
          },
        }
      );

      const res = await response.json();

      if (!response.ok) {
        throw 'Adding player to session failed';
      }

      setSnackBarSuccess(true);
      setSnackbarShow(true);
      setSnackbarMessage(`Successfully added ${username} to session`);
      setUsername('');
      onClose();
    } catch (error: any) {
      console.error(error);
      setSnackBarSuccess(false);
      setSnackbarShow(true);
      setSnackbarMessage('Adding player to session failed');
    } finally {
    }
  };

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={snackbarShow}
        autoHideDuration={2500}
        onClose={() => {
          setSnackbarShow(false);
        }}
      >
        <Alert severity={snackBarSuccess ? 'success' : 'error'}>
          <AlertTitle>{snackBarSuccess ? 'Success' : 'Error'}</AlertTitle>
          {snackbarMessage}
        </Alert>
      </Snackbar>
      <Dialog open={open} onClose={onClose} fullWidth>
        <DialogTitle>Add Player To Session</DialogTitle>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={theme => ({
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent>
          <TextField
            sx={{ boxShadow: '4px 4px black', border: '2px solid black', borderRadius: '5px' }}
            fullWidth
            label="username"
            value={username}
            onChange={event => {
              setUsername(event.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            sx={{ boxShadow: '4px 4px black', border: '2px solid black' }}
            variant="contained"
            onClick={() => {
              setUsername('');
              onClose();
            }}
            color="primary"
            size="large"
          >
            Cancel
          </Button>
          <Button
            sx={{ boxShadow: '4px 4px black', border: '2px solid black' }}
            variant="contained"
            size="large"
            onClick={handleOnClick}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
