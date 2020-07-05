import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import background from 'assets/images/room-background.jpg'
import background1 from 'assets/images/img/table-bg.jpg'
import TopArea from "./top/TopArea";
import MiddleArea from "./middle/MiddleArea";
import BottomArea from "./bottom/BottomArea";
import {Player} from "domains/room/models/Room";
import firebase from "utils/firebase";
import ExitToApp from "@material-ui/icons/ExitToApp";
import Button from "@material-ui/core/Button";
import {RECRUITING, WAITING} from "../../domains/room/constants";
import ModalDialog from "../../components/room/Modal";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        textAlign: 'center',
        color: theme.palette.text.secondary,
        height: theme.spacing(120),
        backgroundImage: `url(${background1})`,
        backgroundSize: 'repeat',
        boxShadow: 'none',
    },
    abortButton: {
        position: 'absolute',
        right: 10,
        top: 10,
        width: 150,
    },
    showAllButton: {
        position: 'absolute',
        right: 10,
        top: 50,
        width: 150,
    },
}));

interface Props {
    roomId: string
    myName: string
    status: string
    justJoinedPlayer: string
    singleReplaceCardResult: any
    bottomAreaData: Player
    leftAreaData: Player
    topAreaData: Player
    rightAreaData: Player
    setMyName: Function
    updateRoom: Function
    shuffleAction: Function
    initializeJoinedPlayer: Function
    showChoiceCards: Function
    initializeSingleReplaceCardResult: Function
    showAllCards: Function
}

export default function Room({
                                 roomId,
                                 status,
                                 myName,
                                 singleReplaceCardResult,
                                 justJoinedPlayer,
                                 bottomAreaData,
                                 leftAreaData,
                                 topAreaData,
                                 rightAreaData,
                                 setMyName,
                                 updateRoom,
                                 shuffleAction,
                                 initializeJoinedPlayer,
                                 initializeSingleReplaceCardResult,
                                 showChoiceCards,
                                 showAllCards,
                             }: Props) {
    const classes = useStyles();

    useEffect(() => {
        setMyName(myName);
        listenRoom();
    }, []);
    const [modalOpened, setModalOpened] = useState(false);

    const onClickAbort = () => {
        showChoiceCards(false);
        shuffleAction();
        setModalOpened(false);
    };

    const onClickClose = () => {
        setModalOpened(false);
    };
    const listenRoom = () => {
        roomId && firebase.firestore().collection("rooms").doc(roomId)
            .onSnapshot(function (querySnapshot) {
                const updatedRoom = querySnapshot && querySnapshot.data();
                if (updatedRoom)
                    updateRoom({id: querySnapshot.id, ...updatedRoom});
            });
    };

    return (
        <div className={classes.root}>
            <ModalDialog
                title={'Are you sure you want to abort?'}
                open={modalOpened}
                onClickOk={onClickAbort}
                onClickCancel={onClickClose}
            />
            {
                status !== RECRUITING &&
                status !== WAITING &&
                <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<ExitToApp/>}
                    className={classes.abortButton}
                    onClick={() => setModalOpened(true)}
                >
                    Abort
                </Button>
            }
            {
                status !== RECRUITING &&
                status !== WAITING &&
                bottomAreaData &&
                bottomAreaData.remainders &&
                bottomAreaData.remainders.length > 0 &&
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<ExitToApp/>}
                    className={classes.showAllButton}
                    onClick={() => showAllCards()}
                >
                    Show All
                </Button>
            }
            <Grid container>
                <Grid item xs>
                    <Paper className={classes.paper}>
                        <TopArea
                            data={topAreaData}
                            singleReplaceCardResult={singleReplaceCardResult}
                            justJoinedPlayer={justJoinedPlayer}
                            initializeJoinedPlayer={initializeJoinedPlayer}
                            initializeSingleReplaceCardResult={initializeSingleReplaceCardResult}
                        />
                        <MiddleArea
                            status={status}
                            leftAreaData={leftAreaData}
                            rightAreaData={rightAreaData}
                            topAreaData={topAreaData}
                            shuffleAction={shuffleAction}
                        />
                        <BottomArea
                            status={status}
                            data={bottomAreaData}
                        />
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
}
