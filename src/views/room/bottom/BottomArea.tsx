import React from 'react';
import Grid from '@material-ui/core/Grid';
import LeftArea from "./components/LeftArea";
import CenterArea from "./components/CenterArea";
import RightArea from "containers/room/RightArea";

interface Props {
    status: string
    data: any
}

export default function BottomArea({
                                       status,
                                       data,
                                   }: Props) {
    return (
        <Grid container>
            <LeftArea
                data={data}
            />
            <CenterArea
                status={status}
                data={data}
            />
            <RightArea
                focused={data && data.focused}
            />
        </Grid>
    );
}
