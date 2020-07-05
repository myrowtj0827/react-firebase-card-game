import React, {useEffect, useState} from 'react';
import Grid from '@material-ui/core/Grid';
import Player from "containers/room/Player";
import Remainder from "components/room/Remainder";
import {makeStyles} from "@material-ui/core/styles";
import {
    SINGLE_CARD_PLAY_MODE_DECK,
    SINGLE_CARD_PLAY_MODE_KEEP,
    SINGLE_CARD_PLAY_MODE_SHOWN
} from "domains/room/constants";

const useStyles = makeStyles(theme => ({
    wrapper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 20
    },
}));

interface Props {
    data: any
    justJoinedPlayer: string
    singleReplaceCardResult: any
    initializeJoinedPlayer: Function
    initializeSingleReplaceCardResult: Function
}

export default function RightArea({
                                      data,
                                      justJoinedPlayer,
                                      singleReplaceCardResult,
                                      initializeJoinedPlayer,
                                      initializeSingleReplaceCardResult,
                                  }: Props) {
    const classes = useStyles();
    const [joinedPlayer, setJoinedPlayer] = useState('');

    useEffect(() => {
        setJoinedPlayer(justJoinedPlayer);
        setTimeout(() => {
            initializeJoinedPlayer();
        }, 5000);
    }, [justJoinedPlayer]);

    useEffect(() => {
        setTimeout(() => {
            initializeSingleReplaceCardResult();
        }, 5000);
    }, [singleReplaceCardResult]);

    let modeText = '';
    if (singleReplaceCardResult && singleReplaceCardResult.mode === SINGLE_CARD_PLAY_MODE_KEEP) {
        modeText = 'kept';
    } else if (singleReplaceCardResult && singleReplaceCardResult.mode === SINGLE_CARD_PLAY_MODE_SHOWN) {
        modeText = 'took shown card';
    } else if (singleReplaceCardResult && singleReplaceCardResult.mode === SINGLE_CARD_PLAY_MODE_DECK) {
        modeText = 'took card on deck';
    }

    return (
        <Grid item xs={8}>
            <Grid container>
                <Grid item xs={3}>

                </Grid>
                {
                    data &&
                    <Grid item xs={3}>
                        <Player
                            data={data}
                        />
                    </Grid>
                }
                <Grid item xs={3}>
                    <div className={classes.wrapper}>
                        <Remainder
                            remainders={data && data.remainders}
                        />
                    </div>
                </Grid>
                <Grid item xs={3}>
                    <h3 style={{color: 'white'}}>{joinedPlayer && `Player '${joinedPlayer}' joined`}</h3>
                    <h3 style={{color: 'white'}}>{singleReplaceCardResult && `Player '${singleReplaceCardResult.name}' ${modeText}`}</h3>
                </Grid>
            </Grid>
        </Grid>
    );
}


