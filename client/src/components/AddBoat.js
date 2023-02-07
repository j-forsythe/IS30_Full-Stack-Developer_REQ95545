import React, { useState } from 'react'
import {
    Fab,
    Dialog,
    DialogContent,
    DialogTitle,
    TextField,
    Button,
    DialogActions,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import Box from '@mui/material/Box'

const AddBoat = ({ dispatchBoats }) => {
    const [open, setOpen] = useState(false)
    const [boatName, setBoatName] = useState('')
    const [submitAttempt, setSubmitAttempt] = useState(false)

    const handleOpen = () => {
        setOpen(true)
        setSubmitAttempt(false)
    }

    const handleClose = () => {
        setOpen(false)
        setBoatName('')
        setSubmitAttempt(false)
    }

    const createBoat = async (name) => {
        const response = await fetch('/api/create-boat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: name }),
        })
        let result = await response.json()
        return result
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        setSubmitAttempt(true)
        if (!boatName) return
        let boat = await createBoat(boatName)
        dispatchBoats({ type: 'ADD_BOAT', boat })
        handleClose()
    }

    return (
        <>
            <Box
                sx={{
                    position: 'fixed',
                    bottom: '24px',
                    right: '8px',
                }}
            >
                <Fab
                    color="primary"
                    variant="extended"
                    aria-label="add"
                    onClick={handleOpen}
                >
                    <AddIcon />
                    Add Boat
                </Fab>
            </Box>
            <Dialog
                open={open}
                onClose={handleClose}
                component="form"
                onSubmit={handleSubmit}
                validate="true"
            >
                <DialogTitle>Add new boat</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Boat name"
                        type="text"
                        fullWidth
                        variant="standard"
                        min="3"
                        max="255"
                        value={boatName}
                        onChange={(event) => setBoatName(event.target.value)}
                        required
                        error={boatName.length < 3 && submitAttempt}
                        helperText={`${
                            boatName.length < 3 && submitAttempt
                                ? 'Must be at least 3 characters'
                                : ''
                        } ${boatName.length}/255`}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit" onClick={handleSubmit}>
                        Add Boat
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default AddBoat
