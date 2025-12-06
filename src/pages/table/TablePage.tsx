import {
    Box,
  Container,
  Grid,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { EnvironmentVariables } from '../../config';

interface Player {
  name: string;
}

interface Session {
    session_id: string
}

export const TablePage: React.FC = () => {
  const { id } = useParams();

  const [tableName, setTableName] = useState('');
  const [game, setGame] = useState('');
  const [players, setPlayers] = useState<Player[]>([]);
  const [sessions, setSessions] = useState<Session[]>([]);

    const [sessionValue, setSessionValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setSessionValue(newValue);
  };

  useEffect(() => {
    const fetchTableDetails = async () => {
      try {
        const addr = EnvironmentVariables.ZIKEEPER_ENDPOINT;

        const response = await fetch(`${addr}/api/table/${id}`);

        const table = await response.json();

        setTableName(table.table.name);
        setGame(table.table.game);
      } catch (error: any) {
      } finally {
      }
    };

    const fetchGameSessionPlayers = async () => {
      try {
        const sessionId = sessionValue;
        const addr = EnvironmentVariables.ZIKEEPER_ENDPOINT;
        const response = await fetch(`${addr}/api/table/${id}/session/${sessionId}/players`);

        const players = await response.json();

        setPlayers(players.players);
      } catch (error: any) {
      } finally {
      }
    };

    const fetchSessionsForTable = async () => {
      try {
        const addr = EnvironmentVariables.ZIKEEPER_ENDPOINT;
        const response = await fetch(`${addr}/api/table/${id}/sessions`);
        const sessions = await response.json();
        
        setSessions(sessions.table_sessions)
      } catch (error: any) {
      } finally {
      }
    }

    fetchTableDetails();
    fetchSessionsForTable();
    fetchGameSessionPlayers();
  }, [sessionValue]);

  const tableHeaders = ['Name', 'Bet', 'Turn'];

  return (
    <>
      <Container maxWidth="md">
        <Grid container spacing={2}>
          <Grid size={6}>
            <h1>{tableName}</h1>
          </Grid>
          <Grid size={6}>
            <h1>{game}</h1>
          </Grid>
          <Grid size={6}>
            <h1>Session</h1>
             <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={sessionValue} variant="scrollable" onChange={handleChange}>
                {sessions?.map(session => (
                    <Tab label={session?.session_id} value={session?.session_id}></Tab>
                ))}
            </Tabs>
            </Box>
            </Box>
          </Grid>
          <Grid size={12}>
            <h1>Players</h1>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    {tableHeaders.map(header => (
                      <TableCell>{header}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {players?.map(player => (
                    <>
                      <TableRow hover>
                        <TableCell>{player.name}</TableCell>
                      </TableRow>
                    </>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};
