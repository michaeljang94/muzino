import {
  Alert,
  AlertTitle,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Snackbar,
  TextField,
} from '@mui/material';
import React, { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';

export interface RemovePlayerFromSessionModalProps {
  open: boolean;
  onClose: () => void;
  onClick: () => void;
  username: string;
}

export const RemovePlayerFromSessionModal: React.FC<RemovePlayerFromSessionModalProps> = ({
  open,
  onClose,
  onClick,
  username,
}) => {
  const [snackbarShow, setSnackbarShow] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackBarSuccess, setSnackBarSuccess] = useState(true);

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
        <DialogTitle>Removing {username} from session</DialogTitle>
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
        <DialogContent>Are you sure you want to remove {username} from this session?</DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={onClose} color="primary" size="large">
            Cancel
          </Button>
          <Button color="error" variant="contained" size="large" onClick={onClick}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
