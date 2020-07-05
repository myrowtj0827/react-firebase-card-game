import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Table from "components/room/Table";
import {NUMBER_OF_SCORE_ROWS} from "domains/room/constants";

const useStyles = makeStyles(theme => ({
    paper: {
        textAlign: 'center',
        height: theme.spacing(20),
        backgroundColor: 'transparent',
        boxShadow: 'none',
    },
}));

interface Props {
    numberOfPlayers: number
    players: any
    scoreData: any
    updateRoomScore: Function
}

export default function ScoreSheet({
                                       numberOfPlayers,
                                       players,
                                       scoreData,
                                       updateRoomScore,
                                   }: Props) {
    const classes = useStyles();

    const tableColumns = () => {
        return players && players.map((item, key) => {
            return {title: item.name, field: `${key}`}
        });
    };

    const tableData = () => {
        let data = [];
        if (scoreData) {
            data = JSON.parse(JSON.stringify(scoreData));
        }

        const length = data && data.length;
        let items;
        if (length >= NUMBER_OF_SCORE_ROWS) {
            items = data && data.splice(length - NUMBER_OF_SCORE_ROWS, NUMBER_OF_SCORE_ROWS);
        } else {
            items = data
        }

        return items && items.map((item, key) => ({...item, index: key}));
    };

    const addScoreRow = (data) => {
        let newScoreData = [];
        if (scoreData)
            newScoreData = JSON.parse(JSON.stringify(scoreData));
        newScoreData.push(data);
        updateRoomScore(newScoreData);
    };

    const updateScoreRow = (oldData, newData) => {
        let newScoreData = [];
        if (scoreData)
            newScoreData = JSON.parse(JSON.stringify(scoreData));
        newScoreData.splice(oldData.index, 1, newData);
        updateRoomScore(newScoreData);
    };

    const deleteScoreRow = (data) => {
        let newScoreData = [];
        if (scoreData)
            newScoreData = JSON.parse(JSON.stringify(scoreData));
        newScoreData.splice(data.index, 1);
        updateRoomScore(newScoreData);
    };

    return (
        <Grid item xs={3}>
            <Paper
                className={classes.paper}
            >
                {
                    players &&
                    players.length === numberOfPlayers &&
                    <Table
                        data={tableData()}
                        columns={tableColumns()}
                        addRow={addScoreRow}
                        updateRow={updateScoreRow}
                        deleteRow={deleteScoreRow}
                    />
                }
            </Paper>
        </Grid>
    );
}
