import {
    takeEvery,
    takeLatest,
    take,
    put,
    select,
    call,
} from "redux-saga/effects"
import {AnyAction} from "redux"
import actionTypes from "../redux/action-types"
import firebase from 'utils/firebase'
import {RECRUITING, WAITING} from "../../room/constants";
import roomActionTypes from 'domains/room/redux/action-types'
import {push} from "connected-react-router";

function* actionWatcher() {
    yield takeLatest(actionTypes.LOAD_ROOMS, fetchRooms);
    yield takeLatest(actionTypes.UPDATE_ROOMS, updateRooms);
    yield takeLatest(actionTypes.CREATE_ROOM, createRoom);
    yield takeLatest(actionTypes.DELETE_ROOM, deleteRoom);
    yield takeLatest(actionTypes.JOIN_ROOM, joinRoom);
}

const createRequest = (newRoom) => {
    return firebase.firestore().collection('rooms').add(newRoom);
};

export const updateRoomRequest = (roomId, updatedRoom) => {
    return firebase.firestore().collection('rooms').doc(roomId).update(updatedRoom);
};

export const deleteRoomRequest = (roomId) => {
    return firebase.firestore().collection('rooms').doc(roomId).delete();
};

const fetchRequest = () => {
    return firebase.firestore().collection('rooms').where('active', '==', true).get();
};

function* fetchRooms() {
    try {
        const {docs} = yield call(fetchRequest);
        const rooms = docs && docs.map(doc => {
            const id = doc.id;
            const data = doc.data();

            return {id, ...data};
        });

        yield put({
            payload: {
                rooms,
            },
            type: actionTypes.ROOMS_RESULT,
        })
    } catch (e) {
        console.log("fetching rooms error");
        console.log(e);
    }
}

function* updateRooms({payload: {updatedRooms}}: AnyAction) {
    /*const lastIndex = updatedRooms.length - 1;
    const lastRoom = updatedRooms && updatedRooms[lastIndex];
    const state = yield select();
    const myName = getMyName(state);

    const lastRoomPlayers = lastRoom && lastRoom.players;
    if ((lastRoomPlayers &&
        lastRoomPlayers[0] &&
        lastRoomPlayers[0].name) === myName) { // to sync with snapshot and createRoom
        updatedRooms &&
        updatedRooms.splice(lastIndex, 1);
    } else { // to sync with snapshot and joinRoom
        const index = lastRoomPlayers&& lastRoomPlayers.findIndex(player => player.name === myName);
        if (index !== -1)
            updatedRooms &&
            updatedRooms.players &&
            updatedRooms.players.splice(index, 1);
    }*/
    yield put({
        payload: {
            rooms: updatedRooms,
        },
        type: actionTypes.ROOMS_RESULT,
    });
}

function* deleteRoom({payload: {roomId}}: AnyAction) {
    try {
        yield call(deleteRoomRequest, roomId);
    } catch (e) {
        console.log("deleting room error");
        console.log(e);
    }
}

function* createRoom({payload: {name, numberOfPlayers}}: AnyAction) {
    try {
        /* set my name */
        yield put({
            type: actionTypes.SET_MY_NAME,
            payload: {
                name,
            }
        });

        const title = new Date().getTime();
        const active = true; // indicates that the room is alive
        const player = { // player who creates the room
            name,
        };
        const players = [player];
        const newRoom = { // room info
            title,
            status: RECRUITING,
            active: active,
            numberOfPlayers,
            players,
        };

        const room = yield call(createRequest, newRoom);
        if (room) {
            // set room id
            yield put({
                type: roomActionTypes.SET_ROOM_ID,
                payload: {roomId: room.id},
            });
            // push to room page
            yield put(push(`/room/${room.id}/${name}`));
            /*yield put(loadRoom(room.id, true));*/
        }
    } catch (e) {
        console.log("creating room error");
        console.log(e);
    }
}

function* joinRoom({payload: {room, name}}: AnyAction) {
    try {
        /* set my name */
        yield put({
            type: actionTypes.SET_MY_NAME,
            payload: {
                name,
            }
        });
        const numberOfPlayers = room.numberOfPlayers;
        const players = JSON.parse(JSON.stringify(room.players));
        const player = { // player who join to the room
            name,
        };

        players.push(player);
        let status = room.status;
        if (players && players.length === numberOfPlayers) { // all entered
            status = WAITING;
        }
        const updatedRoom = { // room info
            title: room.title,
            justJoinedPlayer: name,
            status,
            active: room.active,
            players,
        };

        yield call(updateRoomRequest, room.id, updatedRoom);
        // set room id
        yield put({
            type: roomActionTypes.SET_ROOM_ID,
            payload: {roomId: room.id}
        });
        // push to room page
        yield put(push(`/room/${room.id}/${name}`));
        /*yield put(loadRoom(room.id, true)); // push to room page*/
    } catch (e) {
        console.log("joining room error");
        console.log(e);
    }
}

export default actionWatcher
