import { Container, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React from 'react'

export const TablePage: React.FC = () => {
    const tableName = "Table 1"
    const tableHeaders = ["Name", "Bet", "Turn"]
    const tablePlayers = [
        {
            name: "Example 1",
            score: "100",
            turn: "O"
        },
                {
            name: "Example 1",
            score: "100",
            turn: ""
        }
    ]

    const gameName = "black jack"

    return <>
    <Container maxWidth="md">
        <Grid container spacing={2}>
            <Grid size={6}>
                <h1>
                    {tableName}
                </h1>
            </Grid>
            <Grid size={6}>
                <h1>
                    {gameName}
                </h1>
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
                        {tablePlayers.map(player => (
                        <>
                            <TableRow hover>
                                <TableCell>{player.name}</TableCell>
                                <TableCell>{player.score}</TableCell>
                                <TableCell>{player.turn}</TableCell>
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
}