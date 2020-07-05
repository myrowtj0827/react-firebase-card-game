import actionTypes from "../action-types"

export const loadRooms = () => {
    return {
        type: actionTypes.LOAD_ROOMS,
        payload: {

        },
    }
};

export const updateRooms = (updatedRooms) => {
    return {
        type: actionTypes.UPDATE_ROOMS,
        payload: {
            updatedRooms,
        },
    }
};

export const createRoom = (name: string, numberOfPlayers: number) => {
    return {
        type: actionTypes.CREATE_ROOM,
        payload: {
            name,
            numberOfPlayers,
        },
    }
};

export const deleteRoom = (roomId) => {
    return {
        type: actionTypes.DELETE_ROOM,
        payload: {
            roomId,
        },
    }
};

export const joinRoom = (room: any, name: string) => {
    return {
        type: actionTypes.JOIN_ROOM,
        payload: {
            room,
            name,
        },
    }
};

export const setMyName = (name) => {
    return {
        type: actionTypes.SET_MY_NAME,
        payload: {
            name,
        },
    }
};
