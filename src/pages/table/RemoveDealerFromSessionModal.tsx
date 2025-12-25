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

export interface RemoveDealerFromSessionModalProps {
  open: boolean;
  onClose: () => void;
  onClick: () => void;
  username: string;
}

export const RemoveDealerFromSessionModal: React.FC<RemoveDealerFromSessionModalProps> = ({
  open,
  onClose,
  onClick,
  username,
}) => {
  return (
    <>
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
