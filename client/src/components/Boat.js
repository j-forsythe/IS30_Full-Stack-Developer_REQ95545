import {
    Card,
    CardActions,
    CardContent,
    IconButton,
    Typography,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import React from 'react'

const Boat = ({ data, innerRef, ...props }) => {
    return (
        <Card sx={{ margin: 2 }} ref={innerRef} {...props}>
            <CardContent>
                <Typography variant="h6">{data.name}</Typography>
            </CardContent>
            <CardActions>
                <IconButton>
                    <DeleteIcon />
                </IconButton>
            </CardActions>
        </Card>
    )
}

export default Boat
