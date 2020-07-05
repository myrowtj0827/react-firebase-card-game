import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import card_img_2 from '../../assets/images/cards/_deck_blue.png'

const useStyles = makeStyles({
    card: {
        cursor: 'pointer',
        width: '30%',
    },
});

interface Props {
    remainders: any
}

export default function Remainder({remainders}: Props) {
    const classes = useStyles();

    return (
        <>
            {
                remainders && remainders.map((remainder, key) => {
                    const marginTop = key > 0 ? '-39.5%' : null;
                    const marginLeft = `${key * 2}%`;
                    return (
                        <img
                            className={classes.card}
                            src={card_img_2}
                            style={{position: 'relative', marginTop, marginLeft}}
                            alt='card'
                        />
                    );
                })
            }
        </>
    );
    /*<>

        <img
            className={classes.card}
            src={card_img_2}
            style={{position: 'relative', marginTop: '-39.5%', marginLeft: '2%'}}
            alt='card'
        />
        <img
            className={classes.card}
            src={card_img_2}
            style={{position: 'relative', marginTop: '-39.5%', marginLeft: '4%'}}
            alt='card'
        />
        <img
            className={classes.card}
            src={card_img_2}
            style={{position: 'relative', marginTop: '-39.5%', marginLeft: '6%'}}
            alt='card'
        />
        <img
            className={classes.card}
            src={card_img_2}
            style={{position: 'relative', marginTop: '-39.5%', marginLeft: '8%'}}
            alt='card'
        />
        <img
            className={classes.card}
            src={card_img_2}
            style={{position: 'relative', marginTop: '-39.5%', marginLeft: '10%'}}
            alt='card'
        />
    </>*/
}
