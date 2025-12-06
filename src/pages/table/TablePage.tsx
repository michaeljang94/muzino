import {
  Container,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { EnvironmentVariables } from '../../config';

interface Player {
  name: string;
}

export const TablePage: React.FC = () => {
  const { id } = useParams();

  const [tableName, setTableName] = useState('');
  const [game, setGame] = useState('');
  const [players, setPlayers] = useState<Player[]>([]);

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
        const sessionId = '655a793b-3aa8-403f-b9f0-a010031b0c4d';
        const addr = EnvironmentVariables.ZIKEEPER_ENDPOINT;
        const response = await fetch(`${addr}/api/game_session/${sessionId}/get_players`);

        const players = await response.json();

        setPlayers(players.players);
      } catch (error: any) {
      } finally {
      }
    };

    fetchTableDetails();
    fetchGameSessionPlayers();
  }, []);

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
