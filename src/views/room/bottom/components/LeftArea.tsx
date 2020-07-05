import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Player from "containers/room/Player";

const useStyles = makeStyles(theme => ({
    paper: {
        textAlign: 'center',
        height: theme.spacing(20),
        backgroundColor: 'transparent',
        display: 'flex',
        alignContent: 'center',
        justifyContent: 'center',
        boxShadow: 'none',
    },
}));

interface Props {
    data: any
}

export default function LeftArea({data}: Props) {
    const classes = useStyles();

    return (
        <Grid item xs={2}>
            <Paper
                className={classes.paper}
            >
                <Player
                    data={data}
                />
            </Paper>
        </Grid>
    );
}
