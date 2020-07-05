import { produce } from "immer"
import actionTypes from "../action-types"
import {Room} from "../../models/Room";

const initialState: Room = {
    id: null,
    title: null,
    justJoinedPlayer: null,
    numberOfPlayers: null,
    status: null,
    active: false,
    decks: null,
    replacedCount: null,
    playedCount: null,
    singleReplaceCardResult: null,
    singleReplaceCardVisible: false,
    victoryCards: null,
    players: null,
    scoreData: null,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ROOM_SESSION:
            return produce(state, draft => {
                const room = action.payload.room;
                draft.id = room.id;
                draft.title = room.title;
                draft.justJoinedPlayer = room.justJoinedPlayer;
                draft.numberOfPlayers = room.numberOfPlayers;
                draft.status = room.status;
                draft.active = room.active;
                draft.decks = room.decks;
                draft.victoryCards = room.victoryCards;
                draft.replacedCount = room.replacedCount;
                draft.singleReplaceCardResult = room.singleReplaceCardResult;
                draft.playedCount = room.playedCount;
                draft.singleReplaceCardVisible = room.singleReplaceCardVisible;
                draft.players = room.players;
                draft.scoreData = room.scoreData;
            });

        case actionTypes.UPDATE_ROOM:
            return produce(state, draft => {
                const updatedRoom = action.payload.updatedRoom;
                draft.id = updatedRoom.id;
                draft.title = updatedRoom.title;
                draft.singleReplaceCardResult = updatedRoom.singleReplaceCardResult;
                draft.justJoinedPlayer = updatedRoom.justJoinedPlayer;
                draft.numberOfPlayers = updatedRoom.numberOfPlayers;
                draft.status = updatedRoom.status;
                draft.active = updatedRoom.active;
                draft.decks = updatedRoom.decks;
                draft.victoryCards = updatedRoom.victoryCards;
                draft.replacedCount = updatedRoom.replacedCount;
                draft.playedCount = updatedRoom.playedCount;
                draft.singleReplaceCardVisible = updatedRoom.singleReplaceCardVisible;
                draft.players = updatedRoom.players;
                draft.scoreData = updatedRoom.scoreData;
            });

        case actionTypes.SET_ROOM_ID:
            return produce(state, draft => {
                draft.id = action.payload.roomId;
            });

        case actionTypes.INITIALIZE_JOINED_PLAYER:
            return produce(state, draft => {
                draft.justJoinedPlayer = null;
            });

        case actionTypes.INITIALIZE_SINGLE_REPLACE_CARD_RESULT:
            return produce(state, draft => {
                draft.singleReplaceCardResult = null;
            });

        default:
            return state
    }
}
