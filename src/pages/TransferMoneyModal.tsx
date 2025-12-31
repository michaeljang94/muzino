import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
} from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import { EnvironmentVariables } from '../config';
import { jwtDecode } from 'jwt-decode';
import { TokenPayload } from './PlayerProfilePage';
import { useAuth } from '../components/auth/AuthProvider';

export interface TransferMoneyModalProps {
  open: boolean;
  onClose: () => void;
  transferTo?: string;
}

export const TransferMoneyModal: React.FC<TransferMoneyModalProps> = ({
  open,
  onClose,
  transferTo,
}) => {
  const [username, setUsername] = useState(transferTo || '');
  const [amount, setAmount] = useState('');

  const { token } = useAuth();

  const addr = EnvironmentVariables.ZIKEEPER_ENDPOINT;
  const decoded = jwtDecode<TokenPayload>(token || '');
  const senderUsername = decoded.username;

  const handleTransfer = async () => {
    try {
      const response = await fetch(`${addr}/api/user/${senderUsername}/send`, {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + token,
        },
        body: JSON.stringify({
          amount: parseInt(amount),
          to: transferTo || username,
        }),
      });

      if (!response.ok) {
        throw 'Sending money failed';
      }

      setUsername('');
      setAmount('');
      onClose();
    } catch (error: any) {
    } finally {
    }
  };

  const handleMoneyChange = (value: number) => {
    const currAmount = amount || '0';
    const newAmount = parseInt(currAmount) + value;
    setAmount(newAmount.toString());
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} fullWidth>
        <DialogTitle>Transfer Money</DialogTitle>
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
          <Grid container spacing={2}>
            <Grid size={12}>
              <TextField
                sx={{ boxShadow: '4px 4px black', border: '2px solid black', borderRadius: '5px' }}
                label="username"
                value={transferTo || username}
                fullWidth
                onChange={event => {
                  setUsername(event.target.value);
                }}
              />
            </Grid>
            <Grid size={12}>
              <TextField
                sx={{ boxShadow: '4px 4px black', border: '2px solid black', borderRadius: '5px' }}
                label="amount"
                value={amount}
                type="number"
                onChange={event => {
                  setAmount(event.target.value);
                }}
                fullWidth
                slotProps={{
                  input: {
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                  },
                }}
              />
            </Grid>
            <Grid size={4}>
              <Button
                fullWidth
                variant="contained"
                onClick={() => {
                  handleMoneyChange(50);
                }}
              >
                +50
              </Button>
            </Grid>
            <Grid size={4}>
              <Button
                fullWidth
                variant="contained"
                onClick={() => {
                  handleMoneyChange(100);
                }}
              >
                +100
              </Button>
            </Grid>
            <Grid size={4}>
              <Button
                fullWidth
                variant="contained"
                onClick={() => {
                  handleMoneyChange(200);
                }}
              >
                +200
              </Button>
            </Grid>
            <Grid size={4}>
              <Button
                fullWidth
                variant="contained"
                color="error"
                onClick={() => {
                  handleMoneyChange(-50);
                }}
              >
                -50
              </Button>
            </Grid>
            <Grid size={4}>
              <Button
                fullWidth
                variant="contained"
                color="error"
                onClick={() => {
                  handleMoneyChange(-100);
                }}
              >
                -100
              </Button>
            </Grid>
            <Grid size={4}>
              <Button
                fullWidth
                variant="contained"
                color="error"
                onClick={() => {
                  handleMoneyChange(-200);
                }}
              >
                -200
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            fullWidth
            variant="contained"
            onClick={onClose}
            color="primary"
            size="large"
            sx={{ boxShadow: '4px 4px black', border: '2px solid black', borderRadius: '5px' }}
          >
            Cancel
          </Button>
          <Button
            fullWidth
            color="error"
            variant="contained"
            size="large"
            onClick={handleTransfer}
            sx={{ boxShadow: '4px 4px black', border: '2px solid black', borderRadius: '5px' }}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
