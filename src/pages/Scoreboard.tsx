import React from 'react';
import './Scoreboard.css';
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material';
import { PaginationTable, Player } from '../components/PaginationTable';

export const Scoreboard: React.FC = () => {
  const generateRandomPlayerMap = () => {
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

    for (let i = 0; i < 100; i++) {
      const playerName = 'Player ' + i;
      const playerMoney = '1000';

      examplePlayersMap.push({
        name: playerName,
        score: playerMoney,
      });
    }

    return examplePlayersMap;
  };

  const examplePlayersMap = generateRandomPlayerMap();

  return <PaginationTable tableHeaders={['Name', 'Score']} tableData={examplePlayersMap} />;
};
