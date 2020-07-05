import { produce } from "immer"
import actionTypes from "../action-types"

const initialState = {
    choiceCardsVisible: false,
    selectedChoiceCard: undefined,
    selectedPlayCard: undefined,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SHOW_CHOICE_CARDS:
            return produce(state, draft => {
                draft.choiceCardsVisible = action.payload.flag;
            });

        case actionTypes.SET_SELECTED_CHOICE_CARD:
            return produce(state, draft => {
                draft.selectedChoiceCard = action.payload.flag;
            });

        case actionTypes.SET_SELECTED_PLAY_CARD:
            return produce(state, draft => {
                draft.selectedPlayCard = action.payload.cardId;
            });

        default:
            return state
    }
}
