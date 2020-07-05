import React from 'react';
import Grid from '@material-ui/core/Grid';
import LeftArea from "./components/LeftArea";
import RightArea from "./components/RightArea";
import BoardArea from "./components/BoardArea";

interface Props {
    status: string
    leftAreaData: any
    rightAreaData: any
    topAreaData: any
    shuffleAction: Function
}

export default function MiddleArea({
                                       status,
                                       leftAreaData,
                                       rightAreaData,
                                       topAreaData,
                                       shuffleAction
                                   }: Props) {
    return (
        <Grid container>
            <LeftArea
                data={leftAreaData}
            />
            <BoardArea
                status={status}
                leftAreaData={leftAreaData}
                rightAreaData={rightAreaData}
                topAreaData={topAreaData}
                shuffleAction={shuffleAction}
            />
            <RightArea
                data={rightAreaData}
            />
        </Grid>
    );
}
