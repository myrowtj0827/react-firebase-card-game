import React from 'react';
import Grid from '@material-ui/core/Grid';
import BoardLeftArea from "./board-area/BoardLeftArea";
import BoardMiddleArea from "containers/room/BoardMiddleArea";
import BoardRightArea from "./board-area/BoardRightArea";

interface Props {
    status: string
    leftAreaData: any,
    rightAreaData: any,
    topAreaData: any,
    shuffleAction: Function
}

export default function BoardArea({
                                      status,
                                      leftAreaData,
                                      rightAreaData,
                                      topAreaData,
                                      shuffleAction,
                                  }: Props) {
    return (
        <Grid item xs={8}>
            <Grid
                container
                direction='row'
                justify='center'
                alignItems='center'
            >
                <BoardLeftArea
                    leftAreaData={leftAreaData}
                />
                <BoardMiddleArea
                    status={status}
                    topAreaData={topAreaData}
                    shuffleAction={shuffleAction}
                />
                <BoardRightArea
                    rightAreaData={rightAreaData}
                />
            </Grid>
        </Grid>
    );
}
