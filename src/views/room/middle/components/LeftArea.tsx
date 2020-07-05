import React from 'react';
import Grid from '@material-ui/core/Grid';
import Player from "containers/room/Player";
import Paper from "@material-ui/core/Paper";
import {makeStyles} from "@material-ui/core/styles";
import Remainder from "../../../../components/room/Remainder";
import {Box} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    paper: {
        textAlign: 'center',
        height: theme.spacing(80),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
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
            {
                data &&
                <Paper
                    className={classes.paper}
                >
                    <Player
                        data={data}
                    />
                    {/*<Box mb={3}/>*/}
                    <Remainder
                        remainders={data && data.remainders}
                    />
                </Paper>
            }
        </Grid>
    );
}
