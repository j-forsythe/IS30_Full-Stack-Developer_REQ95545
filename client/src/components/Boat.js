import {
    Card,
    CardActions,
    CardContent,
    IconButton,
    Typography,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import React from 'react'

const Boat = ({ data, dispatchBoats, innerRef, ...props }) => {
    const deleteBoat = async (id) => {
        await fetch('/api/delete-boat', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: id }),
        })
    }

    const handleDeleteBoat = (id) => {
        deleteBoat(id)
        dispatchBoats({ type: 'DELETE_BOAT', id })
    }
    return (
        <Card sx={{ margin: 2 }} ref={innerRef} {...props}>
            <CardContent>
                <Typography variant="h6">{data.name}</Typography>
            </CardContent>
            <CardActions>
                <IconButton onClick={() => handleDeleteBoat(data.id)}>
                    <DeleteIcon />
                </IconButton>
            </CardActions>
        </Card>
    )
}

export default Boat
