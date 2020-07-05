import get from "lodash/get"
import { RootState } from "MyTypes"

export const getMyName = (state: RootState) => {
    const myName = get(state, "home.myName");
    return myName;
};

export const getRooms = (state: RootState) => {
    const rooms = get(state, "home.rooms");
    return rooms;
};
