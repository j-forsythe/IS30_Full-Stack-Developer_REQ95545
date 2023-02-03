import { Grid, Paper, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Boat from './Boat'

const Swimlanes = () => {
    const [statuses, setStatuses] = useState([])
    const [boats, setBoats] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true)
            const result = await fetch('/api/get-statuses').then((res) =>
                res.json(),
            )
            setStatuses(result)
            setIsLoading(false)
        }
        fetchData()
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true)
            const result = await fetch('/api/get-boats').then((res) =>
                res.json(),
            )
            setBoats(result)
            setIsLoading(false)
        }
        fetchData()
    }, [])

    if (isLoading) return 'Loading'

    return (
        <Grid
            container
            spacing={2}
            columns={{ xs: 1, md: 4 }}
            sx={{ height: '75vh' }}
        >
            {statuses &&
                statuses.map((status) => (
                    <Grid item xs={4} md={1} key={status.id}>
                        <Paper sx={{ height: '100%' }}>
                            <Typography
                                align="center"
                                variant="h5"
                                sx={{ paddingTop: 1 }}
                            >
                                {status.title}
                            </Typography>
                            {boats &&
                                boats
                                    .filter(
                                        (boat) => boat.status_id === status.id,
                                    )
                                    .map((boat) => <Boat data={boat} />)}
                        </Paper>
                    </Grid>
                ))}
        </Grid>
    )
}

export default Swimlanes