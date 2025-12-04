import { Label } from '@mui/icons-material';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  Grid,
  Input,
  TextField,
} from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface PostRegisterDetailsPageProps {
  username: string;
  password: string;
}

export const PostRegisterDetailsPage: React.FC<PostRegisterDetailsPageProps> = ({
  username,
  password,
}) => {
  const navigate = useNavigate();

  const handleOnClick = () => {
    navigate('/login');
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
        <Card>
          <CardHeader
            title="Account Information"
            style={{ textAlign: 'center' }}
            subheader="Copy these details. Store these in a safe place. These won't be shown again."
          />
          <CardContent>
            <Grid container spacing={2}>
              <Grid size={12}>
                <p style={{ textAlign: 'center' }}>
                  <h2>{username}</h2>
                </p>
                <p style={{ textAlign: 'center' }}>
                  <h2>{password}</h2>
                </p>
              </Grid>
            </Grid>
          </CardContent>
          <CardActions>
            <Button fullWidth size="large" variant="contained" onClick={handleOnClick}>
              Confirm
            </Button>
          </CardActions>
        </Card>
      </Container>
    </>
  );
};
