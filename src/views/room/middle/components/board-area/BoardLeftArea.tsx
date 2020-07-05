import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from "@material-ui/core/Paper";
import {makeStyles} from '@material-ui/core/styles';
import card_img_1 from "../../../../../assets/images/cards/c2.png";

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
    leftAreaData: any
}

export default function BoardLeftArea({leftAreaData}: Props) {
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
                    leftAreaData &&
                    leftAreaData.boardCard &&
                    <img
                        width='30%'
                        src={require(`assets/images/cards/${leftAreaData.boardCard.id}.png`)}
                        alt='card'
                        style={{transform: 'rotate(90deg)'}}
                    />
                }
            </Paper>
        </Grid>
    );
}
