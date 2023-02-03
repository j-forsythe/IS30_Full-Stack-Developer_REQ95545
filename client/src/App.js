import './App.css'
import React from 'react'
import Container from '@mui/material/Container'
import AppBar from '@mui/material/AppBar'
import Typography from '@mui/material/Typography'
import { Fab, Grid } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import Box from '@mui/material/Box'

function App() {
    // const [state, setState] = useState('')

    // useEffect(() => {
    //     const fetchData = async () => {
    //         const result = await fetch('/api/hello').then((res) => res.json())
    //         setState(result)
    //     }
    //     fetchData()
    // }, [])

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
                        bottom: '25px',
                        right: '8px',
                    }}
                >
                    <Fab color="primary" variant="extended" aria-label="add">
                        <AddIcon />
                        Add Boat
                    </Fab>
                </Box>
                <Grid container spacing={2} columns={{ xs: 1, md: 4 }}>
                    <Grid xs={4} md={1}>
                        status
                    </Grid>
                    <Grid xs={4} md={1}>
                        status
                    </Grid>
                    <Grid xs={4} md={1}>
                        status
                    </Grid>
                    <Grid xs={4} md={1}>
                        status
                    </Grid>
                </Grid>
            </Container>
            <Container component="footer">
                EcoCatch Tours &copy; {new Date().getFullYear()}
            </Container>
        </>
    )
}

export default App
