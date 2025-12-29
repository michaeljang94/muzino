import {
  Container,
  Divider,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@mui/material';
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

interface Players {
  name: string;
}

interface SessionInfo {
  table_session: TableSession;
  players: Players[];
}

export const DealerGamePage: React.FC = () => {
  const [tableSession, setTableSession] = useState<SessionInfo>();
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
          setTableSession(sessionInfo);
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
          <Grid size={9}>
            <h1>{tableSession?.table_session.table_name}</h1>
            <h4>{tableSession?.table_session.session_id}</h4>
          </Grid>
          <Grid size={3}>
            <h2>{tableSession?.table_session.status}</h2>
          </Grid>
          <Grid size={2}>Pool</Grid>
          <Grid size={10} textAlign={'right'}>
            {tableSession?.table_session.pool}
          </Grid>
          <Grid size={12}>
            <Divider />
          </Grid>
          <Grid size={12}>
            <Container maxWidth="sm">
              <TableContainer
                sx={{ border: '2px solid black', borderRadius: '10px', boxShadow: '4px 4px black' }}
              >
                <Table>
                  <TableBody>
                    {tableSession.players.map(player => (
                      <>
                        <TableRow>
                          <TableCell>{player.name}</TableCell>
                          <TableCell>bet</TableCell>
                          <TableCell align="center">turn</TableCell>
                        </TableRow>
                      </>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Container>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};
