import { produce } from "immer"
import actionTypes from "../action-types"

const initialState = {
    myName: null,
    rooms: [],
};

export default (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ROOMS_RESULT:
            return produce(state, draft => {
                draft.rooms = action.payload.rooms
            });

        case actionTypes.SET_MY_NAME:
            return produce(state, draft => {
                draft.myName = action.payload.name
            });

        default:
            return state
    }
}
