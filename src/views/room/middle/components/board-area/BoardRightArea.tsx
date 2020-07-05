import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from "@material-ui/core/Paper";
import {makeStyles} from '@material-ui/core/styles';
import card_img_1 from "../../../../../assets/images/cards/h10.png";

const useStyles = makeStyles(theme => ({
    paper: {
        textAlign: 'center',
        height: theme.spacing(80),
        backgroundColor: 'transparent',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: 'none',
    },
}));

interface Props {
    rightAreaData: any
}

export default function BoardRightArea({rightAreaData}: Props) {
    const classes = useStyles()
    return (
        <Grid
            item
            xs={3}
        >
            <Paper
                className={classes.paper}
            >
                {
                    rightAreaData &&
                    rightAreaData.boardCard &&
                    <img
                        width='30%'
                        src={require(`assets/images/cards/${rightAreaData.boardCard.id}.png`)}
                        alt='card'
                        style={{transform: 'rotate(90deg)'}}
                    />
                }
            </Paper>
        </Grid>
    );
}
