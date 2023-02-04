import './App.css'
import React, { useEffect, useReducer } from 'react'
import Container from '@mui/material/Container'
import AppBar from '@mui/material/AppBar'
import Typography from '@mui/material/Typography'
import { Fab } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import Box from '@mui/material/Box'
import Swimlanes from './components/Swimlanes'

const boatReducer = (state, action) => {
    switch (action.type) {
        case 'GET_BOATS':
            return action.result
        case 'UPDATE_BOAT':
            const { data } = action
            return state.map((boat) => {
                if (boat.id === data.id) {
                    const updatedItem = {
                        ...boat,
                        status_id: data.status_id,
                    }
                    return updatedItem
                }
                return boat
            })
        default:
            throw new Error()
    }
}

function App() {
    const [boats, dispatchBoats] = useReducer(boatReducer, [])

    useEffect(() => {
        const fetchBoats = async () => {
            const result = await fetch('/api/get-boats').then((res) =>
                res.json(),
            )
            dispatchBoats({ type: 'GET_BOATS', result })
        }
        fetchBoats()
    }, [])

    return (
        <>
            <AppBar color="transparent">
                <Container>
                    <Typography variant="h3" component="h1" mt={4} mb={2}>
                        EcoCatch Tours
                    </Typography>
                </Container>
            </AppBar>
            <Container component="main">
                <Box
                    sx={{
                        position: 'fixed',
                        bottom: '24px',
                        right: '8px',
                    }}
                >
                    <Fab color="primary" variant="extended" aria-label="add">
                        <AddIcon />
                        Add Boat
                    </Fab>
                </Box>
                <Swimlanes boats={boats} dispatchBoats={dispatchBoats} />
            </Container>
            <Container component="footer">
                EcoCatch Tours &copy; {new Date().getFullYear()}
            </Container>
        </>
    )
}

export default App
