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

interface Player {
  name: string;
  score: string;
}

export const Scoreboard: React.FC = () => {

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

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

    for(let i = 0; i < 100; i++) {
      const playerName = "Player " + i;
      const playerMoney = "1000";

      examplePlayersMap.push({
        name: playerName,
        score: playerMoney
      })
    }

    return examplePlayersMap
  }

  const examplePlayersMap = generateRandomPlayerMap()

  const visibleRows = React.useMemo(
    () =>
      [...examplePlayersMap]
        // .sort(getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [page, rowsPerPage],
  );

  return (
    // <div className="scoreboard">
    <Container maxWidth="sm">
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Score</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {visibleRows.map(player => (
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
      <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={examplePlayersMap.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
    </Container>

    // </div>
  );
};
