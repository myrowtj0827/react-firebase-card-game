import {
    takeEvery,
    takeLatest,
    put,
    call,
    select,
} from "redux-saga/effects"
import {AnyAction} from "redux"
import actionTypes from "../redux/action-types"
import {setSelectedChoiceCard} from "domains/card/redux/actions"
import firebase from 'utils/firebase'
import {push} from "connected-react-router"
import {getMyDataIndex, getNumberOfPlayers, getRoomSession} from "../redux/selectors";
import {
    CARDS,
    PLAYING,
    REPLACING,
    NUMBER_OF_CARDS,
    TRICKING,
    WAITING,
    RECRUITING,
    SUPPOSE_REPLACING,
    SUPPOSE_PLAYING,
    SINGLE_CARD_PLAY_MODE_KEEP,
    SINGLE_CARD_PLAY_MODE_DECK,
    SINGLE_CARD_PLAY_MODE_SHOWN
} from "../constants";
import {updateRoomRequest} from "domains/home/sagas";
import {
    showChoiceCards,
    cardPlayClickAction,
} from "domains/card/redux/actions";
import {getSelectedChoiceCard} from "../../card/redux/selectors";

function* actionWatcher() {
    yield takeLatest(actionTypes.LOAD_ROOM, fetchRoom);
    yield takeLatest(actionTypes.SHUFFLE, shuffleCards);
    yield takeLatest(actionTypes.CARD_REPLACE_CLICKED, cardReplaceClick);
    yield takeLatest(actionTypes.REPLACE, replaceCards);
    yield takeLatest(actionTypes.KEEP, keepCards);
    yield takeLatest(actionTypes.LEAVE, leaveCards);
    yield takeLatest(actionTypes.PLAY, playCards);
    yield takeLatest(actionTypes.TRICK, trick);
    yield takeLatest(actionTypes.SUPPOSE_REPLACE, supposeReplace);
    yield takeLatest(actionTypes.SUPPOSE_PLAY, supposePlay);
    yield takeLatest(actionTypes.UPDATE_ROOM_SCORE, updateRoomScore);
    yield takeLatest(actionTypes.SHOW_ALL_CARDS, showAllCards);
}

const fetchRoomRequest = (roomId) => {
    return firebase.firestore().collection('rooms').doc(roomId).get();
};

function* fetchRoom({payload: {roomId, flag}}: AnyAction) {
    try {
        const doc = yield call(fetchRoomRequest, roomId);
        const room = doc.data();
        yield put({
            payload: {
                room: {
                    id: roomId,
                    ...room
                }
            },
            type: actionTypes.ROOM_SESSION,
        });

        // push to room page
        if (flag) {
            yield put(push('/room'));
        }
    } catch (e) {
        console.log("fetching room error");
        console.log(e);
    }
}

function randomArrayShuffle(array) {
    let currentIndex = array.length;
    let temporaryValue, randomIndex;
    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

function* shuffleCards() {
    try {
        const state = yield select();
        const roomSession = getRoomSession(state);
        const numberOfPlayers = getNumberOfPlayers(state);
        let updatedRoomSession = JSON.parse(JSON.stringify(roomSession));
        let cards = JSON.parse(JSON.stringify(CARDS));

        updatedRoomSession = initializingRoom(updatedRoomSession);
        randomArrayShuffle(cards);

        /* set room status replacing */
        updatedRoomSession.status = SUPPOSE_REPLACING;

        for(let i = 0; i < numberOfPlayers; i++) {
            const remainders = cards.splice(0, NUMBER_OF_CARDS);
            if (updatedRoomSession &&
                updatedRoomSession.players &&
                updatedRoomSession.players[i]) {
                updatedRoomSession.players[i]['remainders'] = remainders.map(item => ({id: item}));
                updatedRoomSession.players[i]['numberOfReplacedCards'] = 0;
                updatedRoomSession.players[i]['numberOfTricks'] = 0;
            }
        }
        /* set decks */
        updatedRoomSession['decks'] = cards;
        updatedRoomSession['victoryCards'] = [];
        yield call(updateRoomRequest, updatedRoomSession.id, updatedRoomSession);
    } catch (e) {
        console.log("shuffle error");
        console.log(e);
    }
}

function* cardReplaceClick({payload: {cardId}}: AnyAction) {
    try {
        const state = yield select();
        const roomSession = getRoomSession(state);
        const myIndex = getMyDataIndex(state);
        let updatedRoomSession = JSON.parse(JSON.stringify(roomSession));

        if (updatedRoomSession &&
            updatedRoomSession.players &&
            updatedRoomSession.players[myIndex]) {
            let replaces = updatedRoomSession.players[myIndex].replaces;
            if (replaces) {
                const index = replaces && replaces.findIndex(item => item === cardId);
                if (index === -1) { // clicked
                    updatedRoomSession.players[myIndex]['replaces'].push(cardId);
                } else { // un clicked
                    updatedRoomSession.players[myIndex]['replaces'].splice(index, 1);
                }
            } else {
                updatedRoomSession.players[myIndex]['replaces'] = [cardId];
            }
        }

        yield put({
            payload: {
                room: updatedRoomSession,
            },
            type: actionTypes.ROOM_SESSION,
        });
    } catch (e) {
        console.log("cardReplaceClick error");
        console.log(e);
    }
}

function* replaceCards() {
    try {
        const state = yield select();
        const roomSession = getRoomSession(state);
        const myIndex = getMyDataIndex(state);
        const numberOfPlayers = getNumberOfPlayers(state);
        let updatedRoomSession = roomSession && JSON.parse(JSON.stringify(roomSession));

        if (updatedRoomSession &&
            updatedRoomSession.players &&
            updatedRoomSession.players[myIndex]) {
            const decks = updatedRoomSession.decks;
            let replaces = updatedRoomSession.players[myIndex].replaces;
            let remainders = updatedRoomSession.players[myIndex].remainders;

            /* if there aren't enough cards for replacing */
            if (decks.length < replaces.length) {
                const lengthOfDecks = decks.length;
                if (lengthOfDecks === 0) {
                    alert('There is no card left');
                } else if (lengthOfDecks === 1) {
                    alert('There is only one card left');
                } else {
                    alert(`There are ${lengthOfDecks} cards left`);
                }
            } else { // enough to replace
                const selectedChoiceCard = getSelectedChoiceCard(state);
                if (replaces && replaces.length === 1 && selectedChoiceCard === undefined) { // when replace one card
                    yield put(showChoiceCards(true));
                    yield put(setSelectedChoiceCard(true)); // default set shown card

                    updatedRoomSession.singleReplaceCardVisible = true;
                    yield call(updateRoomRequest, updatedRoomSession.id, updatedRoomSession);
                    alert('Please select one of cards on the board or keep you card!');
                } else if (replaces && replaces.length > 0) {
                    let newCards;
                    if (replaces && replaces.length === 1) { // one card replacing
                        if (selectedChoiceCard) { // replace with shown card
                            newCards = decks.splice(decks.length - 1, 1);
                            updatedRoomSession.singleReplaceCardResult = {
                                name: updatedRoomSession.players[myIndex].name,
                                mode: SINGLE_CARD_PLAY_MODE_SHOWN,
                            };
                        } else { // replace with next card on decks
                            decks.splice(decks.length - 1, 1); // burn showed cards
                            newCards = decks.splice(decks.length - 1, 1);
                            updatedRoomSession.singleReplaceCardResult = {
                                name: updatedRoomSession.players[myIndex].name,
                                mode: SINGLE_CARD_PLAY_MODE_DECK,
                            };
                        }
                    } else { // normal replacing
                        newCards = decks.splice(0, replaces.length);
                    }
                    /* remove selected cards */
                    for (let i = remainders.length - 1; i >= 0; i--) {
                        const index = replaces.findIndex(ele => ele === remainders[i].id);
                        if (index !== -1) {
                            remainders.splice(i, 1);
                        }
                    }
                    newCards.map(ele => {
                        remainders.push({id: ele});
                    });
                    updatedRoomSession.players[myIndex]['numberOfReplacedCards'] = replaces.length;

                    updatedRoomSession.replacedCount = updatedRoomSession.replacedCount ? updatedRoomSession.replacedCount + 1 : 1;
                    updatedRoomSession.players[myIndex]['remainders'] = remainders;
                    updatedRoomSession.players[myIndex]['replaces'] = null;
                    updatedRoomSession.players[myIndex]['focused'] = false;

                    if (updatedRoomSession.replacedCount % numberOfPlayers === 0) { // all member replaced or leaved
                        updatedRoomSession.status = SUPPOSE_PLAYING;
                    } else {
                        // const nextIndex = firstUnleavedPlayerNearMe(updatedRoomSession.players, myIndex);
                        updatedRoomSession.players[(myIndex + 1) % numberOfPlayers]['focused'] = true;
                    }
                    updatedRoomSession.singleReplaceCardVisible = false;

                    yield put(showChoiceCards(false));
                    yield put(setSelectedChoiceCard(undefined));
                    yield call(updateRoomRequest, updatedRoomSession.id, updatedRoomSession);
                } else {
                    alert('Please select cards what you are gonna replace!');
                }
            }
        }
    } catch (e) {
        console.log("replace error");
        console.log(e);
    }
}

function* keepCards() {
    try {
        const state = yield select();
        const roomSession = getRoomSession(state);
        const myIndex = getMyDataIndex(state);
        let updatedRoomSession = JSON.parse(JSON.stringify(roomSession));

        if (updatedRoomSession &&
            updatedRoomSession.players &&
            updatedRoomSession.players[myIndex]) {
            updatedRoomSession.players[myIndex]['numberOfReplacedCards'] = 0;
            updatedRoomSession.singleReplaceCardResult = {
                name: updatedRoomSession.players[myIndex].name,
                mode: SINGLE_CARD_PLAY_MODE_KEEP,
            };
            updatedRoomSession.replacedCount = updatedRoomSession.replacedCount ? updatedRoomSession.replacedCount + 1 : 1;
            updatedRoomSession.players[myIndex]['replaces'] = null;
            updatedRoomSession.players[myIndex]['focused'] = false;
            updatedRoomSession.singleReplaceCardVisible = false;
            const numberOfPlayers = updatedRoomSession.numberOfPlayers;
            if (updatedRoomSession.replacedCount % numberOfPlayers === 0) { // all member replaced or leaved
                updatedRoomSession.status = SUPPOSE_PLAYING;
            } else {
                const nextIndex = (myIndex + 1) % numberOfPlayers;
                updatedRoomSession.players[nextIndex]['focused'] = true;
            }

            yield put(showChoiceCards(false));
            yield put(setSelectedChoiceCard(undefined));
            yield call(updateRoomRequest, updatedRoomSession.id, updatedRoomSession);
        }
    } catch (e) {
        console.log("keep error");
        console.log(e);
    }
}

function* leaveCards() {
    try {
        const state = yield select();
        const roomSession = getRoomSession(state);
        const myIndex = getMyDataIndex(state);
        let updatedRoomSession = JSON.parse(JSON.stringify(roomSession));

        if (updatedRoomSession &&
            updatedRoomSession.players &&
            updatedRoomSession.players[myIndex]) {
            updatedRoomSession.players[myIndex]['numberOfReplacedCards'] = 0;
            updatedRoomSession.players[myIndex].remainders = null;
            updatedRoomSession.replacedCount = updatedRoomSession.replacedCount ? updatedRoomSession.replacedCount + 1 : 1;
            updatedRoomSession.players[myIndex]['replaces'] = null;
            updatedRoomSession.players[myIndex]['focused'] = false;
            updatedRoomSession.players[myIndex]['leaved'] = true;
            const numberOfPlayers = updatedRoomSession.players.length;
            if (updatedRoomSession.replacedCount % numberOfPlayers === 0) { // all member replaced or leaved
                updatedRoomSession.status = SUPPOSE_PLAYING;
            } else {
                updatedRoomSession.players[(myIndex + 1) % numberOfPlayers]['focused'] = true;
            }

            yield put(showChoiceCards(false));
            yield put(setSelectedChoiceCard(undefined));
            yield call(updateRoomRequest, updatedRoomSession.id, updatedRoomSession);
        }
    } catch (e) {
        console.log("leave error");
        console.log(e);
    }
}

function getNumberOfPlayingPlayers(players) {
    const data = players && players.filter(item => !item.leaved);
    return data && data.length;
}

function firstUnleavedPlayerNearMe(players, myIndex) {
    const numberOfPlayers = players.length;
    for (let i = 1; i < numberOfPlayers; i++) {
        if (players && !players[(myIndex + i) % numberOfPlayers]['leaved'])
            return (myIndex + i) % numberOfPlayers;
    }

/*    if (players && !players[(myIndex + 2) % 4]['leaved'])
        return (myIndex + 2) % 4;
    if (players && !players[(myIndex + 3) % 4]['leaved'])
        return (myIndex + 3) % 4;*/
}

function* playCards({payload: {cardId}}: AnyAction) {
    try {
        const state = yield select();
        const roomSession = getRoomSession(state);
        const myIndex = getMyDataIndex(state);
        let updatedRoomSession = JSON.parse(JSON.stringify(roomSession));

        if (updatedRoomSession &&
            updatedRoomSession.players &&
            updatedRoomSession.players[myIndex]) {
            const remainders = JSON.parse(JSON.stringify(updatedRoomSession.players[myIndex].remainders));
            const index = remainders.findIndex(ele => ele.id === cardId);
            if (index !== -1) {
                remainders.splice(index, 1);
            }

            updatedRoomSession.playedCount = updatedRoomSession.playedCount ? updatedRoomSession.playedCount + 1 : 1; // increase played count for migrating state
            updatedRoomSession.players[myIndex]['boardCard'] = {id: cardId}; // set board card
            updatedRoomSession.players[myIndex].remainders = remainders;
            updatedRoomSession.players[myIndex]['focused'] = false;

            const numberOfPlayingPlayers = getNumberOfPlayingPlayers(updatedRoomSession.players);

            if (updatedRoomSession.playedCount % numberOfPlayingPlayers === 0) { // if round is finished
                updatedRoomSession.status = TRICKING;
            } else {
                /* this has to be updated */
                const nextIndex = firstUnleavedPlayerNearMe(updatedRoomSession.players, myIndex);
                updatedRoomSession.players[nextIndex]['focused'] = true;
                /*if (!updatedRoomSession.players[(myIndex + 1) % 4]['leaved']) {
                    updatedRoomSession.players[(myIndex + 1) % 4]['focused'] = true;
                } else if (!updatedRoomSession.players[(myIndex + 2) % 4]['leaved']) {
                    updatedRoomSession.players[(myIndex + 2) % 4]['focused'] = true;
                } else if (!updatedRoomSession.players[(myIndex + 3) % 4]['leaved']) {
                    updatedRoomSession.players[(myIndex + 3) % 4]['focused'] = true;
                }*/
            }

            yield put(showChoiceCards(false));
            yield put(setSelectedChoiceCard(undefined));
            yield put(cardPlayClickAction(undefined)); // set clickedPlayCard to undefined
            yield call(updateRoomRequest, updatedRoomSession.id, updatedRoomSession);
        }
    } catch (e) {
        console.log("play error");
        console.log(e);
    }
}

function initializingRoom(roomSession) {
    const data = JSON.parse(JSON.stringify(roomSession));
    data.decks = null;
    data.replacedCount = null;
    data.singleReplaceCardVisible = false;
    data.playedCount = null;
    data.victoryCards = null;
    data &&
    data.players &&
    data.players.map(item => {
        item.numberOfReplacedCards = null;
        item.boardCard = null;
        item.remainders = null;
        item.replaces = null;
        item.focused = false;
        item.leaved = false;
    });

    return data;
}

function clearBoardCards(roomSession) {
    const data = JSON.parse(JSON.stringify(roomSession));

    data &&
    data.players &&
    data.players.map(item => {
        item.boardCard = null;
    });

    return data;
}

function* trick() {
    try {
        const state = yield select();
        const roomSession = getRoomSession(state);
        const myIndex = getMyDataIndex(state);
        let updatedRoomSession = JSON.parse(JSON.stringify(roomSession));

        if (updatedRoomSession &&
            updatedRoomSession.players &&
            updatedRoomSession.players[myIndex]) {

            const trickCount = updatedRoomSession.players[myIndex]['numberOfTricks'];
            updatedRoomSession.players[myIndex]['numberOfTricks'] = trickCount ? trickCount + 1 : 1;

            /* still exists remainders */
            if (updatedRoomSession.players[myIndex]['remainders'] && updatedRoomSession.players[myIndex]['remainders'].length > 0) {
                updatedRoomSession.status = SUPPOSE_PLAYING;
                updatedRoomSession = clearBoardCards(updatedRoomSession);
            } else { // all cards played
                updatedRoomSession.status = WAITING;
                updatedRoomSession = initializingRoom(updatedRoomSession);
            }

            yield call(updateRoomRequest, updatedRoomSession.id, updatedRoomSession);
        }
    } catch (e) {
        console.log("trick error");
        console.log(e);
    }
}

function* supposeReplace() {
    try {
        const state = yield select();
        const roomSession = getRoomSession(state);
        const myIndex = getMyDataIndex(state);
        let updatedRoomSession = JSON.parse(JSON.stringify(roomSession));

        /* initialize roundStarter */
        updatedRoomSession.players && updatedRoomSession.players.map(item => {
            item['roundStarter'] = false;
        });

        if (updatedRoomSession &&
            updatedRoomSession.players &&
            updatedRoomSession.players[myIndex]) {
            updatedRoomSession.players[myIndex]['focused'] = true;
            updatedRoomSession.players[myIndex]['roundStarter'] = true;
            updatedRoomSession.status = REPLACING;
            yield call(updateRoomRequest, updatedRoomSession.id, updatedRoomSession);
        }
    } catch (e) {
        console.log("suppose replace error");
        console.log(e);
    }
}

function* supposePlay() {
    try {
        const state = yield select();
        const roomSession = getRoomSession(state);
        const myIndex = getMyDataIndex(state);
        let updatedRoomSession = JSON.parse(JSON.stringify(roomSession));

        if (updatedRoomSession &&
            updatedRoomSession.players &&
            updatedRoomSession.players[myIndex]) {
            updatedRoomSession.players[myIndex]['focused'] = true;
            updatedRoomSession.status = PLAYING;
            yield call(updateRoomRequest, updatedRoomSession.id, updatedRoomSession);
        }
    } catch (e) {
        console.log("suppose play error");
        console.log(e);
    }
}

function* showAllCards() {
    try {
        const state = yield select();
        const roomSession = getRoomSession(state);
        const myIndex = getMyDataIndex(state);
        let updatedRoomSession = JSON.parse(JSON.stringify(roomSession));

        if (updatedRoomSession &&
            updatedRoomSession.players &&
            updatedRoomSession.players[myIndex]) {
            const remainders = updatedRoomSession.players[myIndex].remainders;
            const data = JSON.parse(JSON.stringify(remainders));
            updatedRoomSession.victoryCards = data;
            updatedRoomSession.players[myIndex].remainders = [];
            updatedRoomSession.players.map(item => {
                item['focused'] = false;
            });
            yield call(updateRoomRequest, updatedRoomSession.id, updatedRoomSession);
        }
    } catch (e) {
        console.log("show all cards error");
        console.log(e);
    }
}

function* updateRoomScore({payload: {newScoreData}}: AnyAction) {
    try {
        const state = yield select();
        const roomSession = getRoomSession(state);

        let updatedRoomSession = JSON.parse(JSON.stringify(roomSession));

        if (updatedRoomSession) {
            updatedRoomSession.scoreData = newScoreData;
            yield call(updateRoomRequest, updatedRoomSession.id, updatedRoomSession);
        }
    } catch (e) {
        console.log("update room score error");
        console.log(e);
    }
}

export default actionWatcher
