import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ExitToApp from '@material-ui/icons/ExitToApp';
import FindReplace from '@material-ui/icons/FindReplace';
import InsertEmoticon from '@material-ui/icons/InsertEmoticon';
import {PLAYING, REPLACING} from "../../../../domains/room/constants";

const useStyles = makeStyles(theme => ({
    paper1: {
        textAlign: 'center',
        color: 'theme.palette.text.primary',
        height: theme.spacing(20),
        backgroundColor: 'transparent',
        justifyContent: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        boxShadow: 'none',
    },
    paper2: {
        textAlign: 'center',
        color: 'theme.palette.text.primary',
        height: theme.spacing(20),
        backgroundColor: 'transparent',
        boxShadow: 'none',
    },
    button: {
        marginTop: '5%',
        width: '70%',
    },
}));

interface Props {
    focused: boolean
    status: string
    selectedChoiceCard: boolean
    selectedPlayCard: string
    replaceAction: Function
    keepAction: Function
    leaveAction: Function
    playAction: Function
}

export default function RightArea({
                                      status,
                                      focused,
                                      selectedChoiceCard,
                                      selectedPlayCard,
                                      replaceAction,
                                      keepAction,
                                      leaveAction,
                                      playAction,
                                  }: Props) {
    const classes = useStyles();

    const onClickReplace = () => {
        replaceAction();
    };

    const onClickKeep = () => {
        keepAction();
    };

    const onClickLeave = () => {
        leaveAction();
    };

    const onClickSkip = () => {
        keepAction();
    };

    const onClickPlay = () => {
        playAction(selectedPlayCard);
    };

    return (
        <Grid item xs>
            <Grid container>
                <Grid item xs={5}>
                    <Paper className={classes.paper1}>
                        {
                            focused && status === PLAYING &&
                            selectedPlayCard !== undefined &&
                            <Button
                                className={classes.button}
                                variant="contained"
                                color="primary"
                                startIcon={<FindReplace/>}
                                onClick={onClickPlay}
                            >
                                Play
                            </Button>
                        }
                        {
                            focused && status === REPLACING &&
                            <>
                                {
                                    selectedChoiceCard !== undefined &&
                                    <Button
                                        className={classes.button}
                                        variant="contained"
                                        color="default"
                                        startIcon={<InsertEmoticon/>}
                                        onClick={onClickKeep}
                                    >
                                        Keep
                                    </Button>
                                }
                                <Button
                                    className={classes.button}
                                    variant="contained"
                                    color="primary"
                                    startIcon={<FindReplace/>}
                                    onClick={onClickReplace}
                                >
                                    Replace
                                </Button>
                            </>
                        }
                        {
                            focused && status === REPLACING &&
                            selectedChoiceCard === undefined &&
                            <Button
                                className={classes.button}
                                variant="contained"
                                color="primary"
                                startIcon={<ExitToApp/>}
                                onClick={onClickSkip}
                            >
                                Skip
                            </Button>
                        }
                        {
                            focused && status === REPLACING &&
                            selectedChoiceCard === undefined &&
                            <Button
                                className={classes.button}
                                variant="contained"
                                color="secondary"
                                startIcon={<ExitToApp/>}
                                onClick={onClickLeave}
                            >
                                Leave
                            </Button>
                        }
                    </Paper>
                </Grid>
                <Grid item xs>
                    <Paper className={classes.paper2}>

                    </Paper>
                </Grid>
            </Grid>
        </Grid>
    );
}
