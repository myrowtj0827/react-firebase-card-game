import React from 'react';
import Grid from '@material-ui/core/Grid';
import RoomsArea from "./RoomsArea";


interface Props {
    rooms: any
    joinRoom: Function
}

export default function MiddleArea({
                                       rooms,
                                       joinRoom,
                                   }: Props) {

    return (
        <Grid
            container
            direction='row'
        >
            <Grid item xs={2}>

            </Grid>
            <Grid item xs={8}>
                <RoomsArea
                    rooms={rooms}
                    joinRoom={joinRoom}
                />
            </Grid>
            <Grid item xs={2}>

            </Grid>
        </Grid>
    );
}
