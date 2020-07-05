import actionTypes from "../action-types"

export const showChoiceCards = (flag) => {
    return {
        type: actionTypes.SHOW_CHOICE_CARDS,
        payload: {
            flag
        },
    }
};

export const setSelectedChoiceCard = (flag) => {
    return {
        type: actionTypes.SET_SELECTED_CHOICE_CARD,
        payload: {
            flag,
        },
    }
};

export const cardPlayClickAction = (cardId) => {
    return {
        type: actionTypes.SET_SELECTED_PLAY_CARD,
        payload: {
            cardId,
        },
    }
};

