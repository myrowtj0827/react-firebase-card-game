import actionTypes from "../action-types"
/* roomId, flag: indicates push to room or not */
export const loadRoom = (roomId, flag) => {
    return {
        type: actionTypes.LOAD_ROOM,
        payload: {
            roomId,
            flag,
        },
    }
};

/* when snapshot noticed */
export const updateRoom = (updatedRoom) => {
    return {
        type: actionTypes.UPDATE_ROOM,
        payload: {
            updatedRoom
        },
    }
};

export const shuffleAction = () => {
    return {
        type: actionTypes.SHUFFLE,
        payload: {

        },
    }
};

export const cardReplaceClickAction = (cardId) => {
    return {
        type: actionTypes.CARD_REPLACE_CLICKED,
        payload: {
            cardId,
        },
    }
};

export const replaceAction = () => {
    return {
        type: actionTypes.REPLACE,
        payload: {

        },
    }
};

export const keepAction = () => {
    return {
        type: actionTypes.KEEP,
        payload: {

        },
    }
};

export const leaveAction = () => {
    return {
        type: actionTypes.LEAVE,
        payload: {

        },
    }
};

export const playAction = (cardId) => {
    return {
        type: actionTypes.PLAY,
        payload: {
            cardId,
        },
    }
};

export const trickAction = () => {
    return {
        type: actionTypes.TRICK,
        payload: {

        },
    }
};

export const supposeReplaceAction = () => {
    return {
        type: actionTypes.SUPPOSE_REPLACE,
        payload: {

        },
    }
};

export const supposePlayAction = () => {
    return {
        type: actionTypes.SUPPOSE_PLAY,
        payload: {

        },
    }
};

export const updateRoomScore = (newScoreData) => {
    return {
        type: actionTypes.UPDATE_ROOM_SCORE,
        payload: {
            newScoreData,
        },
    }
};

export const initializeJoinedPlayer = () => {
    return {
        type: actionTypes.INITIALIZE_JOINED_PLAYER,
        payload: {

        },
    }
};

export const initializeSingleReplaceCardResult = () => {
    return {
        type: actionTypes.INITIALIZE_SINGLE_REPLACE_CARD_RESULT,
        payload: {

        },
    }
};

export const showAllCards = () => {
    return {
        type: actionTypes.SHOW_ALL_CARDS,
        payload: {

        },
    }
};
