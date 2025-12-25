import {
  Alert,
  AlertTitle,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Modal,
  Snackbar,
  TextField,
} from '@mui/material';
import React, { useState } from 'react';

import CloseIcon from '@mui/icons-material/Close';
import { EnvironmentVariables } from '../../config';
import { useAuth } from '../../components/auth/AuthProvider';

export interface AddDealerToSessionModalProps {
  open: boolean;
  onClose: () => void;
  tableName: string;
  sessionId: string;
}

export const AddDealerToSessionModal: React.FunctionComponent<AddDealerToSessionModalProps> = ({
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
        `${addr}/api/table/${tableName}/session/${sessionId}/dealer/add`,
        {
          method: 'POST',
          headers: {
            Authorization: 'Bearer ' + token,
          },
          body: JSON.stringify({
            dealer: username,
          }),
        }
      );

      if (!response.ok) {
        throw 'Adding dealer to session failed';
      }

      setSnackBarSuccess(true);
      setSnackbarShow(true);
      setSnackbarMessage(`Successfully added dealer ${username} to session`);
      onClose();
    } catch (error: any) {
      setSnackBarSuccess(false);
      setSnackbarShow(true);
      setSnackbarMessage(error);
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
          <Button variant="contained" size="large" onClick={handleOnClick}>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
