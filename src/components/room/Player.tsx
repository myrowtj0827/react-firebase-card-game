import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from "@material-ui/core/styles";
import card_img_2 from "../../assets/images/cards/_deck.png";
import card_img_1 from "../../assets/images/cards/_deck_gold.png";
import Grid from "@material-ui/core/Grid";
import {TRICKING} from "../../domains/room/constants";


const useStyles = makeStyles(theme => ({
    card: {
        backgroundColor: 'gray',
        width: '100%',
        color: 'white',
    },
    roundStarter: {
        borderStyle: 'solid',
        borderColor: 'blue',
        borderWidth: 3,
    },
    activeCard: {
        backgroundColor: 'purple',
        width: '100%',
        color: 'white',
    },
    trickCard: {
        width: '65%',
    },
    numberOfTricks: {
        position: 'relative',
        top: '-53%',
    }
}));

interface Player {
    status: string
    data?: any
}

export default function Player({
                                   data,
                                   status,
                               }: Player) {
    const classes = useStyles();

    return (
        <Grid container>
            <Grid item xs={3}>
                <img
                    className={classes.trickCard}
                    src={card_img_2}
                    alt='number of replaces'
                />
                <h1 className={classes.numberOfTricks}>
                    {data && data.numberOfReplacedCards}
                </h1>
            </Grid>
            <Grid item xs={6}>
                <Card className={`${data && data.focused && status !== TRICKING ? classes.activeCard : classes.card} ${data && data.roundStarter ? classes.roundStarter: null}`} variant="outlined">
                    <CardContent>
                        <Typography gutterBottom>
                            &nbsp;&nbsp;&nbsp;&nbsp;{data && data.name}
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={3}>
                <img
                    className={classes.trickCard}
                    src={card_img_1}
                    alt='number of tricks'
                />
                <h1 className={classes.numberOfTricks}>
                    {data && data.numberOfTricks}
                </h1>
            </Grid>
        </Grid>
    );
}
