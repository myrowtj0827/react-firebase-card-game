import get from "lodash/get"
import { RootState } from "MyTypes"
import {getMyName} from "domains/home/redux/selectors";

export const getRoomSession = (state: RootState) => {
    const roomSession = get(state, "room");

    return roomSession;
};

export const getJustJoinedPlayer = (state: RootState) => {
    const roomSession = get(state, "room");

    return roomSession.justJoinedPlayer;
};

export const getNumberOfPlayers = (state: RootState) => {
    const roomSession = get(state, "room");

    return roomSession.numberOfPlayers;
};

export const getRoomPlayers = (state: RootState) => {
    const roomSession = get(state, "room");

    return roomSession.players;
};

export const getRoomId = (state: RootState) => {
    const roomSession = get(state, 'room');

    return roomSession.id;
};

export const getRoomStatus = (state: RootState) => {
    const roomSession = get(state, 'room');

    return roomSession.status;
};

export const getRoomDecks = (state: RootState) => {
    const roomSession = get(state, 'room');

    return roomSession.decks;
};

export const getVictoryCards = (state: RootState) => {
    const roomSession = get(state, 'room');

    return roomSession.victoryCards;
};

export const getRoomScoreData = (state: RootState) => {
    const roomSession = get(state, 'room');

    return roomSession.scoreData;
};

export const getMyDataIndex = (state: RootState) => {
    const roomSession = getRoomSession(state);
    const myName = getMyName(state);
    const players = roomSession && roomSession.players;
    const myIndex = players && players.findIndex(player => player.name === myName);

    return myIndex;
};

export const getSingleReplaceCardResult = (state: RootState) => {
    const roomSession = get(state, 'room');

    return roomSession.singleReplaceCardResult;
};

export const getSingleReplaceCardVisible = (state: RootState) => {
    const roomSession = get(state, 'room');

    return roomSession.singleReplaceCardVisible;
};

export const getBottomAreaData = (state: RootState) => {
    const roomSession = getRoomSession(state);
    const myIndex = getMyDataIndex(state);
    const players = roomSession.players;
    const bottomAreaData = players && myIndex !== -1 && players[myIndex];

    return bottomAreaData;
};

export const getLeftAreaData = (state: RootState) => {
    const roomSession = getRoomSession(state);
    const myIndex = getMyDataIndex(state);
    const players = roomSession.players;
    const numberOfPlayers = roomSession.numberOfPlayers;
    let leftAreaData = null;

    if (myIndex !== -1) {
        if (numberOfPlayers >= 3) {
            const leftIndex = (myIndex + 1) % numberOfPlayers;
            leftAreaData = players && players[leftIndex];
        }
    }

    return leftAreaData;
};

export const getTopAreaData = (state: RootState) => {
    const roomSession = getRoomSession(state);
    const myIndex = getMyDataIndex(state);
    const players = roomSession.players;
    const numberOfPlayers = roomSession.numberOfPlayers;

    let topAreaData = null;
    if (myIndex !== -1) {
        if (numberOfPlayers === 2) { // when 2 players
            const topIndex = (myIndex + numberOfPlayers - 1) % numberOfPlayers;
            topAreaData = players && players[topIndex];
        } else if (numberOfPlayers >= 3) {
            const topIndex = (numberOfPlayers + myIndex - (numberOfPlayers - 2)) % numberOfPlayers;
            topAreaData = players && players[topIndex];
        }
    }

    return topAreaData;
};

export const getRightAreaData = (state: RootState) => {
    const roomSession = getRoomSession(state);
    const myIndex = getMyDataIndex(state);
    const players = roomSession.players;
    const numberOfPlayers = roomSession.numberOfPlayers;

    let rightAreaData = null;
    if (myIndex !== -1) {
        if (numberOfPlayers === 4) {
            const rightIndex = (myIndex + numberOfPlayers - 1) % numberOfPlayers;
            rightAreaData = players && players[rightIndex];
        }
    }

    return rightAreaData;
};
