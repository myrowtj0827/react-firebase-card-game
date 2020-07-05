import React from 'react';
import Grid from '@material-ui/core/Grid';
import ScoreSheet from "containers/room/ScoreSheet";
import RightArea from "./components/RightArea";

interface Props {
    data: any
    justJoinedPlayer: string
    singleReplaceCardResult: any
    initializeJoinedPlayer: Function
    initializeSingleReplaceCardResult: Function
}

export default function TopArea({
                                    data,
                                    justJoinedPlayer,
                                    singleReplaceCardResult,
                                    initializeJoinedPlayer,
                                    initializeSingleReplaceCardResult,
                                }: Props) {
    return (
        <Grid container>
            <ScoreSheet/>
            <RightArea
                data={data}
                justJoinedPlayer={justJoinedPlayer}
                singleReplaceCardResult={singleReplaceCardResult}
                initializeJoinedPlayer={initializeJoinedPlayer}
                initializeSingleReplaceCardResult={initializeSingleReplaceCardResult}
            />
        </Grid>
    );
}
