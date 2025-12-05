import { Container, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { EnvironmentVariables } from '../../config'

export const TablePage: React.FC = () => {
    const { id } = useParams()

    const [tableName, setTableName] = useState("")


    useEffect(() => {
        const fetchTableDetails = async () => {
        try {
        const addr = EnvironmentVariables.ZIKEEPER_ENDPOINT;

        const response = await fetch(`${addr}/api/table/${id}`);

        const table = await response.json();

        console.log(table);

        setTableName(table.table.name);
        } catch (error: any) {
        } finally {
        }
    }

    fetchTableDetails()
    }, [])

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