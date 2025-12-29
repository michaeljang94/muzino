import { Container, Divider, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { EnvironmentVariables } from '../../config';
import { jwtDecode } from 'jwt-decode';
import { TokenPayload } from '../PlayerProfilePage';
import { useAuth } from '../../components/auth/AuthProvider';

interface TableSession {
  session_id: string;
  table_name: string;
  dealer: string;
  status: string;
  pool: number;
}

export const DealerGamePage: React.FC = () => {
  const [tableSession, setTableSession] = useState<TableSession>();
  const { token } = useAuth();

  useEffect(() => {
    const addr = EnvironmentVariables.ZIKEEPER_ENDPOINT;
    const decoded = jwtDecode<TokenPayload>(token || '');
    const username = decoded.username;

    const fetchTableSessionDetails = async () => {
      try {
        const response = await fetch(`${addr}/api/dealer/${username}/session`, {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        });

        if (response.ok) {
          const sessionInfo = await response.json();
          setTableSession(sessionInfo?.table_session);
        }
      } catch (error: any) {
      } finally {
      }
    };

    fetchTableSessionDetails();
  }, []);

  const renderNoSession = () => {
    return <></>;
  };

  if (!tableSession) {
    return renderNoSession();
  }

  return (
    <>
      <Container maxWidth="sm">
        <Grid container spacing={2}>
          <Grid size={10}>
            <h1>{tableSession?.table_name}</h1>
            <h4>{tableSession?.session_id}</h4>
          </Grid>
          <Grid size={2}>
            <h2>{tableSession?.status}</h2>
          </Grid>
          <Grid size={2}>Pool</Grid>
          <Grid size={10} textAlign={'right'}>
            {tableSession?.pool}
          </Grid>
          <Grid size={12}>
            <Divider />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};
