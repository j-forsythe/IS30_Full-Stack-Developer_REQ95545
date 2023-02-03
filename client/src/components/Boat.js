import {
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    IconButton,
    Typography,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import React from 'react'

const Boat = ({ data }) => {
    return (
        <Card sx={{ margin: 2 }}>
            <CardActionArea>
                <CardContent>
                    <Typography variant="h6">{data.name}</Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <IconButton>
                    <DeleteIcon />
                </IconButton>
            </CardActions>
        </Card>
    )
}

export default Boat
