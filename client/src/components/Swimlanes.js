import { Grid, Paper, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Boat from './Boat'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'

const Swimlanes = () => {
    const [statuses, setStatuses] = useState([])
    const [boats, setBoats] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const updateBoat = async (data) => {
        await fetch('/api/update-boat', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
    }

    const onDragEnd = (result) => {
        const { destination, source, draggableId } = result
        if (source.droppableId !== destination.droppableId) {
            let data = {
                status_id: Number(destination.droppableId),
                id: Number(draggableId),
            }
            updateBoat(data)
            const newList = boats.map((boat) => {
                if (boat.id === data.id) {
                    const updatedItem = {
                        ...boat,
                        status_id: data.status_id,
                    }
                    return updatedItem
                }
                return boat
            })

            setBoats(newList)
        }
    }

    useEffect(() => {
        const fetchStatuses = async () => {
            setIsLoading(true)
            const result = await fetch('/api/get-statuses').then((res) =>
                res.json(),
            )
            setStatuses(result)
            setIsLoading(false)
        }
        fetchStatuses()
    }, [])

    useEffect(() => {
        const fetchBoats = async () => {
            setIsLoading(true)
            const result = await fetch('/api/get-boats').then((res) =>
                res.json(),
            )
            setBoats(result)
            setIsLoading(false)
        }
        fetchBoats()
    }, [])

    if (isLoading) return 'Loading'

    return (
        <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
            <Grid
                container
                spacing={2}
                columns={{ xs: 1, md: 4 }}
                sx={{ height: '75vh' }}
            >
                {statuses &&
                    statuses.map((status) => (
                        <Droppable droppableId={`${status.id}`} key={status.id}>
                            {(provided, snapshot) => (
                                <Grid
                                    item
                                    xs={4}
                                    md={1}
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                >
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
                                                    (boat) =>
                                                        boat.status_id ===
                                                        status.id,
                                                )
                                                .map((boat, index) => (
                                                    <Draggable
                                                        draggableId={`${boat.id}`}
                                                        index={index}
                                                        key={boat.id}
                                                    >
                                                        {(
                                                            provided,
                                                            snapshot,
                                                        ) => (
                                                            <Boat
                                                                data={boat}
                                                                innerRef={
                                                                    provided.innerRef
                                                                }
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}
                                                            />
                                                        )}
                                                    </Draggable>
                                                ))}
                                    </Paper>
                                </Grid>
                            )}
                        </Droppable>
                    ))}
            </Grid>
        </DragDropContext>
    )
}

export default Swimlanes
