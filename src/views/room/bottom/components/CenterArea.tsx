import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LeftCards from "containers/room/LeftCards";

const useStyles = makeStyles(theme => ({
    paper: {
        textAlign: 'center',
        color: 'theme.palette.text.primary',
        height: theme.spacing(19),
        backgroundColor: 'transparent',
        paddingTop: theme.spacing(1),
        boxShadow: 'none',
    },
    card: {
        position: 'absolute',
        cursor: 'pointer',
        transition: 'ease 0.3s',
    },
}));

interface Props {
    status: string
    data: any
}

export default function CenterArea({
                                       status,
                                       data
                                   }: Props) {
    const classes = useStyles();

    return (
        <Grid item xs={7}>
            <Paper
                className={classes.paper}
            >
                <LeftCards
                    status={status}
                    remainders={data && data.remainders}
                    focused={data && data.focused}
                />
            </Paper>
        </Grid>
    );
}


