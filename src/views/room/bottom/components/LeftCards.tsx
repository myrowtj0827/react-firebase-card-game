import React, {useState, useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {PLAYING, REPLACING} from "domains/room/constants";

const useStyles = makeStyles({
    card: {
        position: 'absolute',
        cursor: 'pointer',
    },
    flattedCard: {
        position: 'absolute',
        cursor: 'pointer',
        borderStyle: 'solid',
        borderColor: 'yellow',
        borderWidth: 1,
    },
});

interface Props {
    status: string
    remainders: any
    focused: boolean
    choiceCardsVisible: boolean
    selectedPlayCard: string
    cardReplaceClickAction: Function
    cardPlayClickAction: Function
    playAction: Function
}

export function GameCard({
                             focused,
                             status,
                             item,
                             index,
                             selectedPlayCard,
                             choiceCardsVisible,
                             cardReplaceClickAction,
                             cardPlayClickAction,
                             playAction,
                         }) {
    const classes = useStyles();
    let left = 40 + index * 5.5;
    const [flatted, setFlatted] = useState(false);
    useEffect(() => {
        setFlatted(false);

        if (status === PLAYING) {
            if(item.id === selectedPlayCard)
                setFlatted(true);
            else setFlatted(false);
        }
    }, [focused, selectedPlayCard, status]);

    /*if (status === PLAYING) {
        if(item.id === selectedPlayCard)
            setFlatted(true);
        else setFlatted(false);
    }*/

    const onCardClick = () => {
        if (status === REPLACING && !choiceCardsVisible) { // when replacing and not selected one card replacing
            setFlatted(!flatted);
            cardReplaceClickAction(item.id);
        } else if (status === PLAYING && focused) {
            // playAction(item.id);
            cardPlayClickAction(item.id);
        }
    };

    return (
        <img
            className={!flatted ? classes.card : classes.flattedCard}
            src={require(`assets/images/cards/${item.id}.png`)}
            /*onClick={() => setPlayed([true, false, false, false, false])}*/
            onClick={onCardClick}
            alt='card'
            style={{left: `${left}%`, width: '5.1%'}}
        />
    )
}

export default function LeftCards({
                                      status,
                                      remainders,
                                      focused,
                                      choiceCardsVisible,
                                      selectedPlayCard,
                                      cardReplaceClickAction,
                                      cardPlayClickAction,
                                      playAction,
                                  }: Props) {
    /*const initialPlayed = remainders && remainders.map(item => false);*/
    /*const [played, setPlayed] = useState(initialPlayed);*/
    return (
        <>
            {
                remainders && remainders.map((item) => {
                    const index = remainders.findIndex(ele => ele.id == item.id);
                    return (
                        <GameCard
                            focused={focused}
                            status={status}
                            item={item}
                            index={index}
                            selectedPlayCard={selectedPlayCard}
                            choiceCardsVisible={choiceCardsVisible}
                            cardReplaceClickAction={cardReplaceClickAction}
                            cardPlayClickAction={cardPlayClickAction}
                            playAction={playAction}
                        />
                    )
                })
            }

            {/*<img
                className={classes.card}
                src={card_img_3}
                alt='card'
                onClick={() => setPlayed([false, true, false, false, false])}
                style={{left: !played[1] ? "45.5%" : "47.4%", bottom: !played[1] ? "3.5%" : "22%", width: '5.1%'}}
            />
            <img
                className={classes.card}
                src={card_img_4}
                alt='card'
                onClick={() => setPlayed([false, false, true, false, false])}
                style={{left: !played[2] ? "51%" : "47.4%", bottom: !played[2] ? "3.5%" : "22%", width: '5.1%'}}
            />
            <img
                className={classes.card}
                src={card_img_5}
                alt='card'
                onClick={() => setPlayed([false, false, false, true, false])}
                style={{left: !played[3] ? "56.5%" : "47.4%", bottom: !played[3] ? "3.5%" : "22%", width: '5.1%'}}
            />
            <img
                className={classes.card}
                src={card_img_6}
                alt='card'
                onClick={() => setPlayed([false, false, false, false, true])}
                style={{left: !played[4] ? "62%" : "47.4%", bottom: !played[4] ? "3.5%" : "22%", width: '5.1%'}}
            />*/}
        </>
    );
}
