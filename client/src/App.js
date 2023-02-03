import './App.css'
import React from 'react'
import Container from '@mui/material/Container'
import AppBar from '@mui/material/AppBar'
import Typography from '@mui/material/Typography'
import { Fab } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import Box from '@mui/material/Box'
import Swimlanes from './components/Swimlanes'

function App() {
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
                <Swimlanes />
            </Container>
            <Container component="footer">
                EcoCatch Tours &copy; {new Date().getFullYear()}
            </Container>
        </>
    )
}

export default App
