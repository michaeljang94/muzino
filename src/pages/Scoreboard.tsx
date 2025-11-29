import React from 'react';
import './Scoreboard.css';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

interface Player {
  name: string;
  score: string;
}

export const Scoreboard: React.FC = () => {
  const examplePlayersMap: Player[] = [
    {
      name: 'Muone',
      score: '1000',
    },
    {
      name: 'Babo',
      score: '1000',
    },
  ];

  return (
    // <div className="scoreboard">
      <TableContainer style={{ maxWidth: '500px', color: 'white' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Score</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {examplePlayersMap.map(player => (
              <>
                <TableRow>
                  <TableCell>{player.name}</TableCell>
                  <TableCell>{player.score}</TableCell>
                </TableRow>
              </>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    // </div>
  );
};
