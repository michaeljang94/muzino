import {
  Container,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  Alert,
  Button,
} from '@mui/material';
import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

export interface PaginationTableProps {
  tableHeaders: string[];
  tableData: any[];
  dataType: string;
}

export interface Player {
  name: string;
  score: number;
}

export interface Table {
  name: string;
}

export const PaginationTable: React.FC<PaginationTableProps> = ({
  tableHeaders,
  tableData,
  dataType,
}) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const navigate = useNavigate();

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // const visibleRows = useMemo(
  //   () =>
  //     [...tableData]
  //       // .sort(getComparator(order, orderBy))
  //       .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
  //   [page, rowsPerPage]
  // );

  const visibleRows = [...tableData].slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    // <div className="scoreboard">
    <Container maxWidth="sm">
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {tableHeaders.map(header => (
                <TableCell key={header + '-key'}>{header}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {dataType === 'PLAYER' &&
              visibleRows.map(player => (
                <>
                  <TableRow hover>
                    <TableCell>{player.username}</TableCell>
                    <TableCell>{player.name}</TableCell>
                    <TableCell>{player.score}</TableCell>
                  </TableRow>
                </>
              ))}
            {dataType === 'TABLE' &&
              visibleRows.map(table => (
                <>
                  <TableRow hover>
                    <TableCell>{table.name}</TableCell>
                    <TableCell align="right">
                      <Button
                        onClick={() => {
                          navigate(`/table/${table.name}`);
                        }}
                      >
                        OPEN
                      </Button>
                    </TableCell>
                  </TableRow>
                </>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={tableData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Container>
  );
};
