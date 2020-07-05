import get from "lodash/get"
import { RootState } from "MyTypes"

export const getChoiceCardsVisible = (state: RootState) => {
    return get(state, "card.choiceCardsVisible");
};

export const getSelectedChoiceCard = (state: RootState) => {
    return get(state, "card.selectedChoiceCard");
};

export const getSelectedPlayCard = (state: RootState) => {
    return get(state, "card.selectedPlayCard");
};
