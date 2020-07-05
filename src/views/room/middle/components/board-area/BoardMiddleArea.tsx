import React, {useState} from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from "@material-ui/core/Paper";
import {makeStyles} from "@material-ui/core/styles";
import FindReplace from "@material-ui/icons/FindReplace";
import Button from "@material-ui/core/Button";
import card_img_1 from "assets/images/cards/c8.png";
import card_img_2 from "assets/images/cards/_deck_blue.png";
import {SUPPOSE_PLAYING, SUPPOSE_REPLACING, TRICKING, WAITING} from "domains/room/constants";
import {Box} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    paperTop: {
        height: theme.spacing(25),
        backgroundColor: 'transparent',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        boxShadow: 'none',
    },
    paperCenter: {
        textAlign: 'center',
        height: theme.spacing(30),
        backgroundColor: 'transparent',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: 'none',
    },
    paperBottom: {
        textAlign: 'center',
        height: theme.spacing(25),
        backgroundColor: 'transparent',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        boxShadow: 'none',
    },
    button: {
        width: '50%',
        height: '25%',
    },
    flattedCard: {
        borderStyle: 'solid',
        borderColor: 'yellow',
        borderWidth: 1,
    }
}));

interface Props {
    status: string
    topAreaData: any
    bottomAreaData: any
    decks: any
    choiceCardsVisible: boolean
    singleReplaceCardVisible: boolean
    victoryCards: any
    setSelectedChoiceCard: Function
    shuffleAction: Function
    trickAction: Function
    supposeReplaceAction: Function
    supposePlayAction: Function
}

export default function BoardMiddleArea({
                                            status,
                                            topAreaData,
                                            bottomAreaData,
                                            choiceCardsVisible,
                                            singleReplaceCardVisible,
                                            decks,
                                            victoryCards,
                                            setSelectedChoiceCard,
                                            shuffleAction,
                                            trickAction,
                                            supposeReplaceAction,
                                            supposePlayAction,
                                        }: Props) {
    const classes = useStyles();
    let buttonText = '';
    if (status === WAITING) {
        buttonText = 'Shuffle';
    } else if (status === TRICKING) {
        buttonText = 'Take Trick';
    } else if (status === SUPPOSE_REPLACING) {
        buttonText = 'Start with Replacement';
    } else if (status === SUPPOSE_PLAYING) {
        buttonText = 'Start with Playing';
    }
    const lastCard = decks && decks[decks.length - 1];

    const onButtonClick = () => {
        if (status === WAITING) { // when click shuffle
            shuffleAction();
        } else if (status === TRICKING) { // when click trick
            trickAction();
        } else if (status === SUPPOSE_REPLACING) { // after shuffling
            supposeReplaceAction();
        } else if (status === SUPPOSE_PLAYING) { // after replacing and tricking
            supposePlayAction();
        }
    };

    // indicates either shown or next clicked
    const [toggled, setToggle] = useState(true);

    const setCardSelect = (flag) => {
        setToggle(flag);
        setSelectedChoiceCard(flag);
    };

    return (
        <Grid
            item
            xs={6}
        >
            <Grid
                container
                direction='column'
                justify='center'
            >
                <Grid item xs>
                    <Paper
                        className={classes.paperTop}
                    >
                        {
                            topAreaData &&
                            topAreaData.boardCard &&
                            <img
                                width='15%'
                                src={require(`assets/images/cards/${topAreaData.boardCard.id}.png`)}
                                alt='card'
                            />
                        }
                    </Paper>
                </Grid>
                <Grid item xs>
                    <Paper
                        className={classes.paperCenter}
                    >
                        {
                            (
                                (!victoryCards || victoryCards.length === 0) &&
                                (status === WAITING ||
                                    status === TRICKING ||
                                    status === SUPPOSE_REPLACING ||
                                    status === SUPPOSE_PLAYING) &&
                                bottomAreaData && !bottomAreaData.leaved
                            ) &&
                            <Button
                                className={classes.button}
                                variant="contained"
                                color="primary"
                                startIcon={<FindReplace/>}
                                onClick={onButtonClick}
                            >
                                {buttonText}
                            </Button>
                        }
                        {
                            (!victoryCards || victoryCards.length === 0) &&
                            (choiceCardsVisible && lastCard) ?
                                <>
                                    <img
                                        width='15%'
                                        className={toggled ? classes.flattedCard : null}
                                        src={require(`assets/images/cards/${lastCard}.png`)}
                                        onClick={() => setCardSelect(true)}
                                        alt='card'
                                    />
                                    <Box mr={1}/>
                                    <img
                                        width='15%'
                                        className={!toggled ? classes.flattedCard : null}
                                        src={card_img_2}
                                        onClick={() => setCardSelect(false)}
                                        alt='card'
                                    />
                                </> : singleReplaceCardVisible ? (
                                    <img
                                        width='15%'
                                        src={require(`assets/images/cards/${lastCard}.png`)}
                                        alt='card'
                                    />
                                ) : null
                        }
                        {
                            victoryCards &&
                                victoryCards.length > 0 &&
                                victoryCards.map((item, key) => (
                                    <img
                                        key={key}
                                        width='15%'
                                        src={require(`assets/images/cards/${item.id}.png`)}
                                        alt='card'
                                    />
                                ))
                        }
                    </Paper>
                </Grid>
                <Grid item xs>
                    <Paper
                        className={classes.paperBottom}
                    >
                        {
                            bottomAreaData &&
                            bottomAreaData.boardCard &&
                            <img
                                width='15%'
                                src={require(`assets/images/cards/${bottomAreaData.boardCard.id}.png`)}
                                alt='card'
                            />
                        }
                    </Paper>
                </Grid>
            </Grid>
        </Grid>
    );
}
