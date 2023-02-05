import './App.css'
import React, { useEffect, useReducer } from 'react'
import Container from '@mui/material/Container'
import AppBar from '@mui/material/AppBar'
import Typography from '@mui/material/Typography'
import Swimlanes from './components/Swimlanes'
import AddBoat from './components/AddBoat'

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
        case 'ADD_BOAT':
            return [...state, ...action.boat]
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
                <AddBoat dispatchBoats={dispatchBoats} />
                <Swimlanes boats={boats} dispatchBoats={dispatchBoats} />
            </Container>
            <Container component="footer">
                EcoCatch Tours &copy; {new Date().getFullYear()}
            </Container>
        </>
    )
}

export default App
